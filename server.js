const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const routeStatic = require('./lib/route-static');
const redirectIndices = require('./lib/redirect-indices');
var cookieParser = require('cookie-parser');

const app = express();
const baseDir = 'src';
const port = process.env.PORT || 3004;

var manifest = ''

manifest += 'CACHE MANIFEST \n'
manifest += '# version 0.1 \n'
manifest += 'dist/css/bootstrap.css \n'
manifest += 'assets/css/src/docs.css \n'
manifest += 'assets/js/vendor/jquery.min.js \n'
manifest += 'dist/js/bootstrap.js \n'
manifest += 'dist/css/fonts.css \n'
manifest += 'assets/css/src/docs.css \n'
manifest += 'assets/js/fontObserver.js \n'
manifest += 'assets/js/main.js \n'

manifest += 'assets/js/ie10-viewport-bug-workaround.js \n'
manifest += 'assets/js/docs.min.js \n'
manifest += 'assets/img/sass-less.png \n'
manifest += 'assets/img/devices.png \n'
manifest += 'assets/img/components.png \n'
manifest += 'assets/img/expo-lyft.jpg \n'
manifest += 'assets/img/expo-vogue.jpg \n'
manifest += 'assets/img/expo-riot.jpg \n'
manifest += 'assets/img/expo-newsweek.jpg \n'

manifest += 'dist/fonts/sourcesanspro-regular.woff2 \n'
manifest += 'dist/fonts/sourcesanspro-light.woff2 \n'
manifest += 'dist/fonts/sourcesanspro-regular.woff \n'
manifest += 'dist/fonts/sourcesanspro-light.woff \n'

app.get('/cache.manifest', (req, res) => {
    res.header("Content-Type", "text/cache-manifest");
    res.end(manifest);
})

app.use(cookieParser())

app.set('etag', false);
app.use((req, res, next) => { res.removeHeader('X-Powered-By');
    next(); });

// static routes
app.use(routeStatic);
app.use('/static', express.static(path.join(__dirname, baseDir), { etag: false, lastModified: false }));

// dynamic pages
app.use(redirectIndices);
nunjucks.configure(baseDir, {
    autoescape: true,
    express: app,
    watch: true
});

function checkCookie(cookie) {
    if (typeof cookie === 'undefined') {
        return false
    }
    return true
}


app.get('*', (req, res, next) => {
    res.render(path.join('./', req.url, 'index.html'), {
    	fontLoaded : checkCookie(req.cookies.fontLoaded)
    });
});

app.listen(port, (err) => {
    err ? console.error(err) : console.log(`app running on http://localhost:${port}`);
});
