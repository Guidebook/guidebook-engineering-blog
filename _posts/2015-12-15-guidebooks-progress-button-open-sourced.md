---
layout: post
title:  "Guidebook's Progress Button Open Sourced"
date:   2015-12-15
has_excerpt: true
authors:
  - slug: plada
    name: Pete Lada
    title: Creative Director
    twitter: pklada
  - slug: msprague
    name: Mike Sprague
    title: Developer
    twitter: miketsprague

custom_buttons:
  - title: "View on Github"
    url: "https://github.com/Guidebook/gbkui-button-progress-view"
    class: "btn-secondary"
    fa: 'github'

tags:
  - open-source
  - button
  - ios
  - objective-c
---

The recent release of Guidebook 4.0 included a new version of our download progress button which was heavily inspired by the progress button employed in the iOS app store. We received a number of requests to demonstrate how we created the progress button, and we decided to take it even further: [we open-sourced it](https://github.com/Guidebook/gbkui-button-progress-view).

<div class="tac">
  <div class="post_image">
    <img
    class="img-responsive" src="https://camo.githubusercontent.com/c21307792a960e90d630440e09d308d7c854dac3/687474703a2f2f706574656c6164612e636f6d2f696d616765732f706c6164612d6c6f6164696e672d627574746f6e2e676966" />
  </div>
  <div class="post_caption">
    <p>Guidebook's progress button</p>
  </div>
</div>

<!--end-->

**Usage is simple:**

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

You can also adjust the tint color of the entire view (which colors the button stroke, text, and icon):

{% highlight objective-c %}
self.downloadButton.tintColor = [UIColor redColor];
{% endhighlight %}

Let us know if you use it within your app or if you have any questions on implementation.

[View the project on Github](https://github.com/Guidebook/gbkui-button-progress-view).
