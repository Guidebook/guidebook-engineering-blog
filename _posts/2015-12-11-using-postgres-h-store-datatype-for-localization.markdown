---
layout: post
title:  "Using Postgres H-Store DataType For Localization"
date:   2014-11-19
has_excerpt: true
authors:
  - slug: dmuller
    name: David Muller
    title: Developer
    twitter: dma
  - slug: plada
    name: Peter Lada
    title: Creative Director
    twitter: pklada



tags:
  - postgres
  - h-store
  - l18n
---
### The Challenge

An increasing number of guides created through the [Guidebook Content Management System](https://gears.guidebook.com) have been targeted at an international client base and multi-language support is a must. Previously, support for multiple languages was added by ducplicating a guide and updating the clones with translated content. Needless to say, this was not a scalalble solution--we needed to elevate localization to a "first level feature" to support an evergrowing international client base.


### Proposed Solutions

Several well-supported Django packages exist for maintaing translations on specific Django model fields: see [django-Modeltranslation](https://github.com/deschler/django-modeltranslation) and [django-hvad](https://github.com/kristianoellegaard/django-hvad) for examples. These solutions are great, but they require maintaining extra columns (one for each language) in your tables, or extra translation tables entirely. While this approach is fine for some applications, it can be cumbersome (both in terms of time-costs and code complexity) to adjust or migrate your db schema.

<!--end-->

### Using Postgres HStore To Maintain Translated Strings

Maintaining translations boils down to maintaining key/value pairs: `{'language1': 'This string', 'language2': 'That string'}`. Fortunately, PostgreSQL has a data type, HStore, which serves that exact purpose. Hstore maintains sets of key/value pairs within a single PostgreSQL column; as described in the [PostgreSQL documention](http://www.postgresql.org/docs/9.0/static/hstore.html) can be useful in various scenarios, such as rows with many attributes that are rarely examined, or semi-structured data. Keys and values are simply text strings.

#### Implementation

Django 1.7 does not include native support for PstgreSQL's HStore extension.  [`django-hstore`](https://github.com/djangonauts/django-hstore), however, adds support for the extension via a custom Django field: `DictionaryField()`.
Using `django_hstore`'s `DictionaryField()` to store key-value pairs, your Django models would now look like:

{% highlight python %}
from django.db import models
from django_hstore import hstore

class MyModel(models.Model):
    translatable_field = hstore.DictionaryField()
    created_at = models.DateTimeField(auto_now_add=True)

    # HStoreManager() adds support for basic queries over DictionaryField()
    objects = hstore.HStoreManager()
{% endhighlight %}

Within `translatable_field`, translations would be stored like:
{% highlight python %}
{
    "en-US": "Hello, I'm a string.",
    "gr": "Hallo, ich bin ein string.",
    "es": "Hola, soy una cadena.",
    "fr": "Bonjour, je suis une chaîne."
}
{% endhighlight %}

### Additional Functionality

While [`django-hstore`](https://github.com/djangonauts/django-hstore) supports a number of different queries over `DictionaryField()`s, we wanted to make queries of the following nature: considering the translated values for one *specific* language key, find database rows that have the translated string `LIKE %string I am looking for%`.

If we were to brutally, and *incorrectly*, try to make that query in Django, it might look like:

{% highlight python %}
# invalid syntax
MyModel.objects.filter(translatable_field['en-US']__contains('string I am looking for'))
{% endhighlight %}

With that in mind, we created a [fork of django-hstore](https://github.com/DavidMuller/django-hstore) which adds custom lookups to perform the aforementioned queries:
- The `valuelike` lookup, e.g. `__valuelike={'my_key': 'my_value'}`, will retrieve a QuerySet containing rows where `'my_key'` has a value `LIKE %my_value%`.  In other words, specify the language key you'd like to limit your search to, and, as the value, specify the string that will be pased to `LIKE %my_value%`.

#### Queryset Example

{% highlight python %}
MyModel.objects.filter(translatable_field__valuelike={'en-US': 'string I am looking for'})
# or
MyModel.objects.filter(translatable_field__valuelike={'fr': 'Bonjour'})
{% endhighlight %}

#### Case Sensitivity

Also available: `ivaluelike` lookup which is identical to `valuelike` except that is case insensitive.

*Note that our fork is only compatible with Django >= 1.7 beause it uses [custom lookups in django](https://docs.djangoproject.com/en/1.7/howto/custom-lookups/) which are new in Django 1.7*

### Performance

We ran some *very crude* performance tests:

We defined two models: one with only an indexed `CharField()`, and the other with only an indexed `DictionaryField()`.  We then added 100,000 random entries to each model:
{% highlight python %}
# insert a bunch of enrtries with random strings (the haystack)
for i in range(0, 100000):
    random_string = str(datetime.now())
    random_dict = {"en-US": random_string, "fr": random_string}

    ModelWithCharFieldOnly.objects.create(name=random_string)
    ModelWithDictFieldOnly.objects.create(name=random_dict)

# insert an entry we'll want to find/lookup (the needle)
ModelWithCharFieldOnly.objects.create(name="find me")
ModelWithDictFieldOnly.objects.create(data={"en-US": "find me", "french": "find me"})
{% endhighlight %}

{% highlight python %}
# perform some lookups against both models and check performance
ModelWithCharFieldOnly.filter(name__contains('find'))
100,001 objects to look through...
lookup time: 0.000868082046509 seconds

ModelWithDictFieldOnly.fitler(name__valuelike({'en-US': 'find'}))
(looking for 'en_us' key with value LIKE '%find%')
100,001 objects to look through...
lookup time: 0.00113487243652 seconds
{% endhighlight %}

### Summary

We strongly recommend checking out the [existing](https://github.com/deschler/django-modeltranslation) [translation](https://github.com/kristianoellegaard/django-hvad) packages before getting started. If you find they don't quite solve your localization needs, you should give [Django Hstore](https://github.com/DavidMuller/django-hstore) a shot to see if they can ease the pain of handling model level translations in Django.
