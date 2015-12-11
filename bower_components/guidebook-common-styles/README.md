# Guidebook Common Sass

This repo stores common Sass files that are used in multiple projects in Guidebook.

## Installation in another project

Use [bower](http://bower.ico) to install this repository as a dependency. You can use the v1.x.x formatting to lock your project down to a specific version of this repo.

1. `cd your_project`
2. `bower install git@github.guidebook.com:Guidebook/common-styles.git#v1.x.x`.
3. Edit your `gulpfile.js` sass task to include the `bower_components/guidebook-common-styles/` folder.

## Changing common styles while in another project

1. `cd common-styles`
2. `bower link`
3. `cd your_project`
4. `bower link guidebook-common-styles`
5. Edit common styles as needed. The changes will show in your project.

## Pushing up changes to common styles, then pulling them back in.

1. `cd common-styles`
2. Commit your changes as normal.
3. `gulp patch` or `gulp minor` or `gulp major` depending on the change. This will bump the bower version.
4. `cd your_project`
5. `bower update` (this will also remove your bower link). It will update based upon the version declaration in `your_project/bower.json`.

## How an engineer who doesn't work in sass updates their project.

Likely this will be tied to the initial gulp task and not need to ever be run by them.

1. `cd your_project`
2. `bower update`

---

## Suggested Usage

First, add this submodule to your project as `common` in your `styles` directory (or similar). See above.

From your project's CSS build file(s) — your main.css, stylesheet.css, whatever — you should consider using this code as a template:

```sass
// Non-Exporting CSS
// Mixins, functions, placeholders, variables.
// -------------------------------------------

@import "common/library"


// Build & Project Configuration
// -----------------------------

// TODO: Pass through current build environment
$env: development

// Actual, CSS-Outputting Styles
// -----------------------------

// Base, Layouts, Utilities
@import "common/blu"


// Our own layouts:
// @import "layouts/..."


// Modules we want
// in alphabetical order to reduce merge conflicts

// Modules from common:
@import "common/modules/btn"
@import "common/modules/chk"
@import "common/modules/lrt"
@import "common/modules/lta"
@import "common/modules/mnu"
@import "common/modules/prs"
@import "common/modules/pvr"
@import "common/modules/tab"
@import "common/modules/txt"

// Our own modules:
@import "modules/abc"

```

If you do not want the default layouts, base styles and/or utility classes, then do not import `common/blu`. Instead, you may include `common/utilities`, `common/layouts/common`, and/or `common/base` _à la carte_, or not at all.

Remove whichever `common/module/X` imports you don’t want. To encourage you to include only the modules you need,
there is no easy way to include all modules provided in this project. This minimizes compiled CSS output.


## Colors

In your project, you can augment the common colors defined here with SCSS like this:


```scss
$colors-for-this-project: {
  "rebecca": rebeccapurple,
}

// Augment globally-defined $colors variable
$colors: map-merge($colors, $colors-for-this-project);

// Now you can access both global and project-specific colors via `color()`:
.x {
  background-color: color("pebble-gray");
  border-color: color("rebecca");
}
```

---

# Legacy submodule docs

This repo is intended to be used as a **submodule** from within other projects (such as Gears 3 Front-End and new Corpsite).



## Understanding Git Submodules

**[Here is a great introduction to git submodules. Please read it.][intro]**

[intro]: http://git-scm.com/book/en/Git-Tools-Submodules

### Adding This To A Project

In Terminal:

    cd src/styles

or wherever your CSS is, and then

    git submodule add git@github.guidebook.com:Guidebook/common-styles.git common

Note that the last word in that command, "common", will become the name of the new directory that will be created. This directory will contain the styles in this repository.

You aren't done yet:

    cd common
    git submodule init
    git submodule update

And then you'll need to commit the addition of this submodule into your project, of course.

(See also: "Suggested Usage", below.)

### Warnings

You can edit the contents of a submodule and view your changes in your project without publishing a new version. This is an advantage of git submodules over traditional package management. However, that power comes with responsibilities.

1. Have you [read up on git submodules yet][intro]?

2. You *must* commit and push your changes to this project so that others can access them.

3. If you run a submodule command from your outer project (`git submodule update`, say), you can lose your uncommitted and unpushed changes from within the submodule. Please use caution.

Additionally, please be aware that pulling changes to the outer project is no longer good enough; you must also run `git submodule update` (from your project) to get changes to this submodule, if applicable.

### It’s Not So Bad

This document points out things to watch for, but hopefully the advantages of re-using code are obvious already :) Have fun!


## Suggested Usage

First, add this submodule to your project as `common` in your `styles` directory (or similar). See above.

From your project's CSS build file(s) — your main.css, stylesheet.css, whatever — you should consider using this code as a template:

```sass
// Non-Exporting CSS
// Mixins, functions, placeholders, variables.
// -------------------------------------------

@import "common/library"


// Build & Project Configuration
// -----------------------------

// TODO: Pass through current build environment
$env: development




// Actual, CSS-Outputting Styles
// -----------------------------

// Base, Layouts, Utilities
@import "common/blu"


// Our own layouts:
// @import "layouts/..."


// Modules we want
// in alphabetical order to reduce merge conflicts

// Modules from common:
@import "common/modules/btn"
@import "common/modules/chk"
@import "common/modules/lrt"
@import "common/modules/lta"
@import "common/modules/mnu"
@import "common/modules/prs"
@import "common/modules/pvr"
@import "common/modules/tab"
@import "common/modules/txt"

// Our own modules:
@import "modules/abc"

```

If you do not want the default layouts, base styles and/or utility classes, then do not import `common/blu`. Instead, you may include `common/utilities`, `common/layouts/common`, and/or `common/base` _à la carte_, or not at all.

Remove whichever `common/module/X` imports you don’t want. To encourage you to include only the modules you need,
there is no easy way to include all modules provided in this project. This minimizes compiled CSS output.


## Colors

In your project, you can augment the common colors defined here with SCSS like this:


```scss
$colors-for-this-project: {
  "rebecca": rebeccapurple,
}

// Augment globally-defined $colors variable
$colors: map-merge($colors, $colors-for-this-project);

// Now you can access both global and project-specific colors via `color()`:
.x {
  background-color: color("pebble-gray");
  border-color: color("rebecca");
}
```


## Issues

Please feel free to file issues or pull requests! There’s definitely room for improvement!


