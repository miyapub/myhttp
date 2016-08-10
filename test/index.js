var Myhttp=require('../');
Myhttp.router({
    '':'./test/html/default.html',
    'about':'./test/html/default.html',
}).ext({
    js:'./test/static/js',
    css:'./test/static/css',
    jpg:'./test/static/img',
    gif:'./test/static/img',
    png:'./test/static/img',
}).start(8085);