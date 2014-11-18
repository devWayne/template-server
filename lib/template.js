var jade = require('jade');
var fs = require('fs');
var JSFtp = require("jsftp");

exports.jade2html = function(req, res) {
    var fn = jade.compileFile(__dirname + '/template/index.jade');
    var html = fn(req.body);
    res.json({
        html: html
    });
};

exports.writehtml = function(req, res) {
    fs.writeFile(__dirname + '/dist/index.html', req.body.html, function(err) {
        if (err) throw err;
        res.json({
            code: 200
        });
    });
};


exports.downloadtpl = function(req, res) {
    res.download(__dirname + '/dist/index.html');
};

exports.uploadhtml = function(req, res) {
    var ftp = new JSFtp({
        host: "myserver.com",
        port: 3331, // defaults to 21
        user: "user", // defaults to "anonymous"
        pass: "1234" // defaults to "@anonymous"
    });
    ftp.put(buffer, 'path/to/remote/file.txt', function(hadError) {
        if (!hadError)
            console.log("File transferred successfully!");
    });
};
