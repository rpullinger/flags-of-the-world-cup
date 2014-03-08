Flags Of The World Cup
======================

Flags of the World Cup 2014 in CSS.

The rules are pretty basic.

* No Images, SVG or data uris
* Ideally only one HTML element

## To contribute

Make sure you have node installed.

### Getting started
* Fork and clone the project
* `npm init` to pull in all the dependencies
* `gulp watch` – this task starts a webserver at `http://localhost:4000`, watches for changes to the Sass files, processes them and then updates the file using livereload.

### To add a new flag

I've set up issues for all the flags please include the issue as part of the commit / pull request.

* Copy the `country` block of html and update with the new country
* Add a new sass partial to `sass/flags`
* Update `main.scss` to bring in your new partial
* Get styling the flag!