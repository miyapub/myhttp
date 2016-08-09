var http = require('http');
var url = require("url");
fs = require('fs');
var getDirFromExtName=function(extDir,extName){
    //通过扩展名获得dir
    var dir='';
    if(extDir.hasOwnProperty(extName)){
        dir=extDir[extName];
    }
    return dir;
}
var getHtmlNameFromRouter=function(router,routerName){
    //通过扩展名获得dir
    var htmlName='';
    if(router.hasOwnProperty(routerName)){
        htmlName=router[routerName];
    }
    return htmlName;
}
var outERR=function(errCode,errMsg,res){
    res.writeHead(errCode,{'Content-Type': 'text/html;charset=utf-8'});
    res.write(errMsg);
    res.end();
}
var render=function(file,header,json,res){
    /* 暂时没有使用 */
    res.writeHead(errCode,{'Content-Type': 'text/html;charset=utf-8'});
    res.end();
}
var print=function(file,header,res){
    fs.readFile(file, function(err, data){
        if(err){
            header.code=500;
            outERR(header.code,'open file err',res);
        }else{
            res.writeHead(header.code,header.text);
            res.write(data);
            res.end();
        }
    });
}
Myhttp={
    router:function(json){
        this.router=json;
        return this;
    },
    ext:function(json){
        //循环出　扩展名　对应的　dir
        for(var k in json) {
            console.log(k);
        }
        this.extDir=json;
        return this;
    },
    start:function(port){
        //
        var _self=this;
        http.createServer(function (req, res) {
        var header={
            "code":200,
            "text":{'Content-Type': 'text/html;charset=utf-8'}
        };
        var get=req.url;
        var pathname = url.parse(req.url).pathname;
        var argsstr = url.parse(req.url).query;
        var actname='';//控制器文件名
        var viewname='';//模板文件名
        var paths=pathname.split('/');
        var root=paths[0];//第0个
        var firstPath=paths[1];//第一个
        var lastPath=paths[paths.length-1];//最后一个
        var fileDir='';//文件ｄｉｒ
        var filePath='';//文件路径
        var type='router';//类型默认作为路由
        var hasExtName=false;//默认为没有扩展名，就是纯　路由
        var extName='';//默认扩展名为空
        var err=false;
        var errMsg='';
        var errCode=200;//default 200
        if(lastPath.split('.').length>1){
            hasExtName=true;//有扩展名，作为资源路径
            extName=lastPath.split('.')[lastPath.split('.').length-1];
            //通过extName获得　ｄｉｒ和路径
            fileDir=getDirFromExtName(_self.extDir,extName);//得到　扩展名的ｄｉｒ
            if(fileDir===''){
                err=true;
                errMsg='资源文件类型未设置'
            }
        }
        if(hasExtName){
            type='resource';//类型作为资源
        }
        //获得文件　path　
        switch(type){
            case 'router' :
            //路由，根据路由输出　html
                var htmlName=getHtmlNameFromRouter(_self.router,firstPath);
                if(htmlName===''){
                    err=true;
                    errMsg='没有这个路由';
                    errCode=404;
                }
                filePath=fileDir+htmlName;
                header.text={'Content-Type': 'text/html;charset=utf-8'};
            break;
            case 'resource' :
                //资源，根据资源的扩展名，输出资源
                filePath=fileDir+pathname;
                switch(extName){
                    case 'png':
                        header.text={'Content-Type': 'image/x-png;charset=utf-8'};
                    break;
                    case 'jpg':
                        header.text={'Content-Type': 'image/jpeg;charset=utf-8'};
                    break;
                    case 'gif':
                        header.text={'Content-Type': 'image/gif;charset=utf-8'};
                    break;
                    case 'js':
                        header.text={'Content-Type': 'text/javascript;charset=utf-8'};
                    break;
                    case 'pdf':
                        header.text={'Content-Type': 'application/pdf;charset=utf-8'};
                    break;
                    case 'pdf':
                        header.text={'Content-Type': 'application/pdf;charset=utf-8'};
                    break;
                    case 'zip':
                        header.text={'Content-Type': 'application/zip;charset=utf-8'};
                    break;
                    case 'ppt':
                        header.text={'Content-Type': 'application/x-ppt;charset=utf-8'};
                    break;
                }
            break;
        }
        if(err){
            //输出　errMsg
            outERR(errCode,errMsg,res);
            return false;
        }   
        //filePath
        print(filePath,header,res);
    }).listen(process.env.PORT || port, null);
        return this;
    }
}
module.exports = Myhttp;