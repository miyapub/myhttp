# myhttp
一个静态网站，可以配合react.

##install:
```
npm install myhttp
```
##code:
```
var Myhttp=require('myhttp');
Myhttp.router({
    '':'./html/default.html',
    'about':'./html/default.html',
}).ext({
    js:'./static/js',
    css:'./static/css',
}).start(80);
```
##
```
http://localhost
```
