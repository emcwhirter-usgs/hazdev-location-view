Location View Library
=====================

[![Build Status](https://travis-ci.org/usgs/hazdev-location-view.png)](https://travis-ci.org/usgs/hazdev-location-view)

Web library for getting location information from a user.

## Getting Started
1. [Use git to clone hazdev-location-view from git repository](readme_git_install.md)

1. Make sure you are in your `hazdev-location-view` project directory.

1. Install NPM dependencies

		`npm install`

1. Install Bower dependencies

		`bower install`

1. Preview in a browser

		`grunt`

		On windows, `gateway` has trouble resolving default documents and you need
		to change the opened url to `http://localhost:8000/index.html` in order to
		view the Test Suite.
		To view the application go to 'http://localhost:8080/index.html'

### Having trouble getting started?

1. If this is your first time using **grunt**, you need to install the grunt
command line interface globally

		`npm install -g grunt-cli`

1. If this is your first time using **bower**, you need to install bower globally

		`npm install -g bower`

## License

Unless otherwise noted, This software is in the public domain because it
contains materials that originally came from the United States Geological
Survey, an agency of the United States Department of Interior. For more
information, see the official USGS copyright policy at
http://www.usgs.gov/visual-id/credit_usgs.html#copyright

Dependent libraries found are distributed under the open source (or open
source-like) licenses/agreements. Appropriate license aggrements for each
library can be found with the library content.

### Libraries used at runtime
 - Requirejs (http://requirejs.org/)
