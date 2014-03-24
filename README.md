#Adelaide Festival Centre

Front-End Templates

## Getting Started

We use [Grunt](http://gruntjs.com/) to automate all front-end tasks (local dev and production). Navigate to the root folder of the project.

First we need to download all the projects grunt dependancies using:

    npm install

**Note:** MAC users may need to run this with as SUDO.

Now run the following from your CLI (e.g Terminal):

    grunt

This will:

- Compile HTML pages in the /build folder for production
- Compile SASS to CSS
- Concat Javascript
- Load the website (/build folder) in a browser
- Watch for changes to SASS/JS/HTML, recompile changes and live reload the browser

Running the grunt command should be all you need to start working on the project!


## Font Icons

We use [Fontello](http://fontello.com/) to create a font icon set all our icons.

By default the icon set can be accessed in the /build/fontello directory.

- demo.html - An overview of all the font icons currently in the set
- config.json - Use this to add more icons to this set if required on fontello.com

## Sprite Image Generation

Spriting Images needs to be done to minize the number of HTTP requests on the page. Most icons use Font Icons, but there are some icons need to be images. We can easily generate a sprite image for these icons by [Spriting With Compass](http://compass-style.org/help/tutorials/spriting/).

Save individual icon PNG's into the /build/images/icons. The rest is done by COMPASS using these 2 lines in /sass/styles.scss

    @import "icons/*.png";
    @include all-icons-sprites;

The css for the sprite is automatically generated in /build/css/style.css everytime SASS is compiled.

## Images

All website images need to be saved to /build/images.

## Text Resizing

The text needs to be resized to meet Level AA accesibility guidlines. To achieve this, we need the css font-size property to be in ems (REMs don't give us enough browser support).

There is a simple sass mixin that automatically converts a given pixel size to ems

## Release Options (TODO)

Simply run the followin from your CLI (e.g Terminal):

	grunt build

This will:

- Compile HTML pages in the /build folder for production
- Compile SASS to CSS
- Minify CSS
- Concat & Minify Javascript

## SASS + Compass (WINDOWS ONLY)

If you are on Windows, SASS + Compass can be a pain in the ass to setup. You need to have the following versions setup:

- [sass 3.3.0.alpha.149](https://rubygems.org/gems/sass/versions/3.3.0.alpha.149)
- [compass 0.12.2](http://compass-style.org/install/)

If you have different versions already installed, you may need to remove them before re-installing the above versions.

## DEV: Templating, Pages and Partials

We use the [Grunt Stencil](https://github.com/cambridge-healthcare/grunt-stencil) Grunt plugin for templating that generates static HTML files from given components. Stencil provides the following:

- A way to modularise your HTML source files: each file can include an arbitrary number of partial files, or be wrapped with a template file.
- Built in support for [the doT.js templating language](http://olado.github.io/doT/index.html), which allows passing of arbitrary variables to your HTML files.
- Built in support for markdown
- Meta data headers in the beginning of each file to specify variables that should be used in the file (that are accessible from partials included in the file, and templates the file is injected into).

Checkout the [Stencil WIKI](https://github.com/cambridge-healthcare/grunt-stencil/wiki) for documentation on how to use it, or just look at how it's being used in the pages/partials folders.


## "Grid" layout with foundation (equal height)

Using the matchHeight jQuery plugin you can activate the grid javascript for your columns.

The javascript will figure out the number of children that should be in each "row" at the current screen size and wrap them in a div with the class "grid-row". This script assumes that all children of the row will have equal width.

Example usage below. Will not add the the grid row divs when the specified ignoreClass is present on the container:

    $(".grid-view").matchHeight({
        ignoreClass: 'list-view'
    });
