const extType=require('./config/extType');
const getHeaderByExtName=function(extName){
    var text={'Content-Type': 'text/html;charset=utf-8'};
    if(extType.hasOwnProperty(extName)){
        text=extType.extName;
    }
    return text;
}
module.exports = getHeaderByExtName;