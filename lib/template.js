var jade = require('jade');
var fs = require('fs');
var JSFtp = require("jsftp");

exports.listtpl = function(req, res) {
    fs.readdir(__dirname + '/template', function(err, list) {
        var nameList = [];
        if (err) throw err;
        list.forEach(function(filename, v) {
            if (!/^\./.test(filename)) {
                fs.readFile(__dirname + '/template/' + filename + '/config.json', {
                    encoding: 'utf8'
                }, function(err, data) {
                    if (err) throw err;
                    var dataObj = JSON.parse(data);
                    dataObj.fileName = filename;
                    nameList.push(dataObj);
                    if ((v + 1) === list.length) {
                        res.json({
                            nameList: nameList
                        });
                    }
                })
            }
        });
    });
};

exports.jade2html = function(req, res) {
    var dir = '/template/' + req.name + '/index.jade'
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

exports.uploadtpl = function(req, res) {
    var dir = 'lib/template/' + req.body.name;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFileSync(dir + '/index.jade', req.body.jade);
    fs.writeFileSync(dir + '/config.js', req.body.config);

}
