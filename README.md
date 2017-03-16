# Performance matters

## Project setup

This project serves an adapted version of the [Bootstrap documentation website](http://getbootstrap.com/). It is based on the [github pages branche of Bootstrap](https://github.com/twbs/bootstrap/tree/gh-pages). 

Differences from actual Bootstrap documentation:

- Added custom webfont
- Removed third party scripts
- The src directory is served with [Express](https://expressjs.com/).
- Templating is done with [Nunjucks](https://mozilla.github.io/nunjucks/)

## Getting started

- Install dependencies: `npm install`
- Serve: `npm start`
- Expose localhost: `npm run expose`

## Used techs to improve page speed

- Minify CSS
- Gzip CSS
- Minify JS
- Gzip JS
- Compress images
- Load font with font-observer (saved in cookie and class .font-load is rendered serverside)
- Offline browsing with manifest (only works for homepage)

## Before optimalisation
### First run
18 request | 1.3 MB transferred | Finish: 524 ms | DOMContentLoaded: 288ms | Load: 560ms
### Second run
18 request | 1.3 MB transferred | Finish: 442 ms | DOMContentLoaded: 227ms | Load: 467ms


## After optimalisation
### First run
18 request | 1.3 MB transferred | Finish: 524 ms | DOMContentLoaded: 288ms | Load: 560ms
### Second run
18 request | 1.3 MB transferred | Finish: 442 ms | DOMContentLoaded: 227ms | Load: 467ms