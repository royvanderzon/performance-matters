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
18 request | 1.3 MB transferred | Finish: 524 ms | DOMContentLoaded: 288 ms | Load: 560 ms
### Second run
18 request | 1.3 MB transferred | Finish: 442 ms | DOMContentLoaded: 227 ms | Load: 467 ms


## After optimalisation
### First run
20 request | 617 KB transferred | Finish: 538 ms | DOMContentLoaded: 271 ms | Load: 532 ms
### Second run
18 request | 0 KB transferred | Finish: 351 ms | DOMContentLoaded: 204 ms | Load: 353 ms