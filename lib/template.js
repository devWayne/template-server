var jade = require('jade');
var fs = require('fs');

exports.jade2html = function(req, res) {
  var fn=jade.compileFile(__dirname+'/template/index.jade');
  var html=fn(req.body);
  res.json({html:html});
};

exports.writehtml=function(req,res){
fs.writeFile(__dirname+'/dist/index.html',req.body.html, function (err) {
  if (err) throw err;
   res.json({code:200});
});
}


exports.downloadtpl=function(req,res){
res.download(__dirname+'/dist/index.html');
}
