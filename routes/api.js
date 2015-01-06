var express = require('express');
var router = express.Router();

var template = require('../lib/template');

/* GET api listing. */
router.post('/configtpl',template.jade2html);
router.post('/maketpl',template.writehtml);
router.get('/downloadtpl',template.downloadtpl);
router.post('/uploadhtml',template.uploadhtml);
router.post('/uploadtpl',template.uploadtpl);
router.get('/listtpl',template.listtpl);

module.exports = router;
