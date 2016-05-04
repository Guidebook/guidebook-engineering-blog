---
layout: post
title:  "Show/Hide Password Text View--In Swift!"
date:   2016-05-04
has_excerpt: true
img: 'https://camo.githubusercontent.com/e86b3414e77d02a218a19007d47a8d919ce793e1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f662e636c2e6c792f6974656d732f31453359313933383373334a336730623259304d2f70617373776f72645f6769662e6769663f763d6663393761633937'
authors:
  - slug: pandersen
    name: Pete Andersen
    title: Senior Product Manager
    twitter: lookatpete
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
    url: "https://github.com/Guidebook/HideShowPasswordTextField"
    class: "btn-secondary"
    fa: 'github'

particle:
  lineColor: "rgba(0,0,0,.05)"
  dotColor: "rgba(0,0,0,.14)"

tags:
  - open-source
  - password
  - textfield
  - ios
  - swift
---

Getting the UX around user sign up is important.  That's why we built our own password visibility toggle, and we're open sourcing it so you can use it too.

<div class="tac">
  <div class="post_image">
    <img
    class="img-responsive" src="https://camo.githubusercontent.com/e86b3414e77d02a218a19007d47a8d919ce793e1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f662e636c2e6c792f6974656d732f31453359313933383373334a336730623259304d2f70617373776f72645f6769662e6769663f763d6663393761633937" />
  </div>
  <div class="post_caption">
    <p>ShowHidePasswordTextField</p>
  </div>
</div>

<!--end-->

The code is pretty simple.  It's all in Swift (yay!) and boils down to two classes: `PasswordToggleVisibilityView` and `HideShowPasswordTextField`.  

The former, `PasswordToggleVisibilityView`, is a simple `UIView` with a button and an optional checkbox image.  The button toggles it's background image between "open eye" and "closed eye" states, and the checkbox is configurable with a delegate to show the user when the password is "valid".  

`HideShowPasswordTextField` is a `UITextField` subclass that creates the `PasswordToggleVisibilityView` as it's `rightView` and properly configures the view based on the state of `secureTextEntry`.  `secureTextEntry` is a property on `UITextField` that determines whether the text shows up as plaintext, or as "secure" password characters.  Unfortunately, toggling between `secureTextEntry` states causes some weird visual bugs with padding and font changes (if you use a custom font).  `HideShowPasswordTextField` takes care of all of that for you!

Checkout `README.md` in the repo to see how to use it.  It's pretty simple.

Let us know if you use it within your app or if you have any questions on implementation.  Look for this to be out in a new version of the Guidebook app in the coming weeks :)

[View the project on Github](https://github.com/Guidebook/HideShowPasswordTextField).
