---
layout: post
title:  "Guidebook's Progress Button Open Sourced"
date:   2015-12-15
has_excerpt: true
authors:
  - slug: plada
    name: Pete Lada
    title: Creative Director
  - slug: msprague
    name: Mike Sprague
    title: Developer

tags:
  - open-source
  - button
  - ios
  - objective-c
---

The recent release of Guidebook 4.0 included a new version of our download progress button which was heavily inspired by the progress button employed in the iOS app store. We received a number of requests to demonstrate how we created the progress button, and we decided to take it even further: we open-sourced it.

<div class="img-responsive">
  <img
  class="img-responsive" src="https://camo.githubusercontent.com/c21307792a960e90d630440e09d308d7c854dac3/687474703a2f2f706574656c6164612e636f6d2f696d616765732f706c6164612d6c6f6164696e672d627574746f6e2e676966" />
</div>

<!--end-->

**Usage is simple. Simply:**

* Create the button as a custom view in your xib, or create it programatically.
* Make sure that you don't have a constraint for it's width (it shrinks)--you might need to set the Intrinsic Content Size to "Placeholder" in your xib to avoid errors.

**A simple example might look like:**

{% highlight objective-c %}
[self.downloadButton setInitialTitle:@"Download"];
[self.downloadButton setCompleteTitle:@"Open"];

// Add a target (like a regular button)
[self.downloadButton addTarget:self action:@selector(downloadButtonPressed:) forControlEvents:UIControlEventTouchUpInside];

-(void)downloadButtonPressed:(id)sender {
    // Update the button's state based on your downloading item's state
    if(!self.isDownloading && !self.isDownloaded) {
        [self.downloadButton startProgressing];
        [self downloadItem];
    } else if(self.isDownloaded) {
        [self openItem];
    } else {
        [self cancelDownloadingItem];
        [self.downloadButton setProgress:0 animated:YES withCompletion:^{
            [self.downloadButton reset];
        }];
    }
}

-(void)downloadProgressed:(CGFloat)progress {
  // Update the download button's progress when you get a progress update from your item
  [self.downloadButton setProgress:progress animated:YES];
}
{% endhighlight %}
