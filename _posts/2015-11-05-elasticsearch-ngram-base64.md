---
layout: post
title:  "Indexing HTML Documents In Elasticsearch"
date:   2015-11-05
has_excerpt: true
authors:
  - slug: dmuller
    name: David Muller
    title: Developer

tags:
  - Elasticsearch
  - ngram
  - html
  - base64
---

In preparation for a new "quick search" feature in our [CMS](https://builder.guidebook.com), we recently indexed about 6 million documents with user-inputted text into Elasticsearch.  We indexed about a million documents into our cluster via Elasticsearch's [bulk api](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html) before batches of documents failed indexing with `ReadTimeOut` errors.

We noticed huge CPU spikes accompanying the `ReadTimeouts` from Elasticsearch.  The culprit, as it turned out, was a combination of our user-inputted text and our currently configured [text analyzers](https://www.elastic.co/guide/en/elasticsearch/reference/1.4/analysis-analyzers.html):

<!--end-->

{% highlight json %}
"ngram_analyzer" : {
  "type" : "custom",
  "filter" : [ "lowercase", "gears_ngram_token_filter" ],
  "tokenizer" : "standard"
},

"filter" : {
"gears_ngram_token_filter" : {
  "min_gram" : "3",
  "type" : "nGram",
  "max_gram" : "15"
}
{% endhighlight %}


Briefly, ^ we were running our strings through the standard tokenizer, lower casing them, and then ngram tokenizing the strings (e.g. "guidebook" becomes "gui", "guid", "guide", "guideb" etc.).  This ngram strategy allows for nice partial matching (for example, a user searching for "guidebook" could just enter "gui" and see results). Unfortunately, the ngram tokenizing became troublesome when users submitted Base64 encoded image files as part of an html document:

{% highlight html %}
<img alt="Embedded Image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIA..." />
{% endhighlight %}

The base64 strings became prohibitively long and Elasticsearch predictably failed trying to ngram tokenize giant files-as-strings.

Never fear, we thought; Elasticsearch's [`html_strip` character filter](https://www.elastic.co/guide/en/elasticsearch/reference/1.4/analysis-htmlstrip-charfilter.html) would allow us to ignore the nasty `img` tags:

{% highlight json %}
"ngram_analyzer" : {
  "type" : "custom",

  # no more base64 encoded files!
  "char_filter" : [ "html_strip" ],

  "filter" : [ "lowercase", "gears_ngram_token_filter" ],
  "tokenizer" : "standard"
},
{% endhighlight %}

Unfortunately, we continued to receive timeout errors on batches of documents. Closer inspection of those documents revealed bad markup. For example, sometimes documents were missing the opening `<` at the beginning of their `img` tag thereby "breaking" the `html_strip` filter -- Elasticsearch was still trying to ngram tokenize base64 encoded image files.

At this point, we decided that ngram tokenizing _all_ of our text was not necessarily what our "quick search" feature needed to succeed. We were more selective about which Elasticsearch fields we applied ngram tokenizing to.  Disk use and, perhaps, more importantly `ReadTimeOuts` both decreased in frequency.
