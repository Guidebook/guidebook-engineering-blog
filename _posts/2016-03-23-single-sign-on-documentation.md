---
layout: post
title:  "Single Sign-On Using Guidebook"
date:   2016-03-23
has_excerpt: true
authors:
  - slug: scoonce
    name: Sean Coonce
    title: Director, Web Services
    twitter: cooncesean

particle:
  lineColor: "rgba(0,0,0,.05)"
  dotColor: "rgba(0,0,0,.14)"

tags:
  - sso
  - saml
  - documentation
---



Guidebook supports a form of single-sign on (SSO) called [SAML](https://en.wikipedia.org/wiki/SAML_2.0). SAML is a process that allows users to authenticate themselves against an external Identity Provider (IdP) rather than obtaining and using a separate username and password stored by Guidebook.

Using SAML, Guidebook can serve as a SAML Service Provider (SP) allowing you to provide SSO services for your domain.

This document outlines the steps required to add a new SAML Identity Provider (IdP) to Guidebook.

<!--end-->

{% include image-container.html image='https://s3.amazonaws.com/media.guidebook.com/sso-docs/sso-control-flow.png' caption='SSO Control Flow' %}


## Guidebook's Service Provider Details

* **Assertion Consumer Service:** `https://builder.guidebook.com/api/auth/saml/assertion-consumer-service/?format=json`
* **Entity ID:** `https://builder.guidebook.com`
* **Service Provider MetaData:** `https://builder.guidebook.com/api/auth/saml/metadata/`


## Requirements
To configure SSO with Guidebook, you will need a SAML 2.0 compliant Identity Provider (IdP). Your identity provider will handle the user sign-in process and will eventually provide the authentication credentials of your users to Guidebook. Guidebook requires that your Identity Provider return a unique identifier for each user, the user's email, the user's first name, the user's last name.

Guidebook *does not store your user's passwords*.

* Guidebook only supports the [HTTP-POST binding](https://en.wikipedia.org/wiki/SAML_2.0#HTTP_POST_Binding) (see also base bindings [specification](https://docs.oasis-open.org/security/saml/v2.0/saml-bindings-2.0-os.pdf)).
* Guidebook only supports SAML 2.0 compliant Identity Providers.


## Implementing SSO With Guidebook
This example uses [Google Apps For Work](https://apps.google.com/) as the Identity Provider (IdP) and Guidebook as the Service Provider (SP). These instructions will apply if you are implementing a different IdP.

### Step 1 - Log Into Google Admin
Log into your [Google Apps For Work admin](https://apps.google.com/).

{% include image-container.html image='https://s3.amazonaws.com/media.guidebook.com/sso-docs/01-google-admin-login.png' caption='Your Google Admin Console' %}

### Step 2 - Navigate to 'Apps'
Click on the 'Apps' button to add a new SAML application.

{% include image-container.html image='https://s3.amazonaws.com/media.guidebook.com/sso-docs/02-google-admin-apps.png' caption='Click On The Apps button' %}

### Step 3 - Navigate to 'SAML Apps'
Click on the 'SAML apps' button to manage your SAML applications (in which Google is the Identity Provider).

{% include image-container.html image='https://s3.amazonaws.com/media.guidebook.com/sso-docs/03-google-admin-app-settings.png' caption='Manage Your SAML Applications' %}


### Step 4 - Add New SSO Application
Click on the 'Enable SSO for a SAML Application' button to add Guidebook as a new application that you want to use to implement SSO.

{% include image-container.html image='https://s3.amazonaws.com/media.guidebook.com/sso-docs/04-add-new-button.png' caption='Click The + Button' %}

{% include image-container.html image='https://s3.amazonaws.com/media.guidebook.com/sso-docs/05-set-up-custom-app.png' caption='Set Up Custom App' %}


### Step 5 - Download IdP Information
Copy your `SSO URL` and `Entity ID` values and download your SSO certificate (essentially your public key). You will need to send all three items to your Account Executive or email them to `support@guidebook.com@guidebook.com` with the subject, "Your Company Name: SSO IdP Information".

{% include image-container.html image='https://s3.amazonaws.com/media.guidebook.com/sso-docs/07-idp-info.png' caption='Grab Your IdP Information' %}

It will take ~24 hours for us to get that information into our system and deployed. Once your IdP information has been deployed, we will contact you with next steps.


## Post-Deployment Next Steps
After we have your IdP information and its running on our production servers, you will need to add the following data to your Google Admin.

### Step 6 - Continue The SSO Application Wizard
Add the application name, description (optional) and icon (optional). You can use whatever you'd like here; this is to keep all of your SSO applications organized and manageable.

{% include image-container.html image='https://s3.amazonaws.com/media.guidebook.com/sso-docs/08-sp-data.png' caption='Set Guidebook SSO Basic Info' %}


### Step 7 - Complete The SSO Application Wizard
Add the Service Provider (Guidebook) details as specified by the "Guidebook's Service Provider Details" section above. Add the `Start URL` value as specified by the return email you receive from us. Be sure to enable `Signed Responses`.

{% include image-container.html image='https://s3.amazonaws.com/media.guidebook.com/sso-docs/09-sp-details.png' caption='Set Guidebook SSO Details' %}


### Step 8 - Attribute Mappings
Once you have Guidebook's Service Provider details submitted, be sure to expose the following fields. Guidebook requires user's `First Name`, `Last Name` and `Primary Email` in order to create a user.

* **Primary Email:** `urn:oid:0.9.2342.19200300.100.1.1`
* **First Name:** `urn:oid:2.5.4.42`
* **Last Name:** `urn:oid:2.5.4.4`

{% include image-container.html image='https://s3.amazonaws.com/media.guidebook.com/sso-docs/10-attribute-mapping.png' caption='Attribute Mapping' %}

### Step 9 - Finish
Click the 'Finish' button to finalize the process and add the SSO application.

{% include image-container.html image='https://s3.amazonaws.com/media.guidebook.com/sso-docs/11-finish.png' caption='Finish' %}


### Step 10 - View All Enabled SAML Apps
Click on the "SAML Apps" navigation link in the header to view the list of all of your enabled SSO applications. You should see the newly created `Guidebook` application. It will be turned 'Off' by default.

{% include image-container.html image='https://s3.amazonaws.com/media.guidebook.com/sso-docs/12-view-all.png' caption='View All SSO Applications' %}

In order to enable SSO for everyone in your company or a subset of employees, click the toggle on the far right and wait up to 24 hours for this change to propagate across Google.

{% include image-container.html image='https://s3.amazonaws.com/media.guidebook.com/sso-docs/13-enable.png' caption='Enable The Guidebook Integration For Your Employees' %}


## Testing
Once everything is configured and you should test it out. In order to do this, you'll need to hit `https://builder.guidebook.com/api/auth/saml/login/?idp={your-ipd-key-which-is-emailed-to-you}` in your browser.

That should redirect you to your Google Apps For Work installation, which will allow you to login using your Google Apps email and password. Once you have been authenticated by Google, your (limited) user information is signed and sent from Google to Guidebook and a Guidebook user account is created on your behalf.

You should also receive a response with [a `200` status code](https://httpstatuses.com/200) indicating that the handshake was successfully processed.

## Real World Deployment
Once you have verified that everything is working in the browser you will need to coordinate with your Account Executive to enable SSO within the Guidebook Mobile Application.

The Mobile Application will gate user access to both the application itself as well as guides within the application based on successful user authentication using the SSO handshake you created above.

## Help
If you need help configuring your SAML IdP to work with Guidebook, feel free to reach out to your Account Executive or `support@guidebook.com` for assistance.

Here is more information around [using Google as an SSO IdP](https://support.google.com/a/answer/6087519?hl=en).
