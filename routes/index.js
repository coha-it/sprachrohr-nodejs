// Defaults
var express = require('express');
var router = express.Router();

// Controllers
const PodcastCtrl = require('../controllers/PodcastCtrl')
const SourceCtrl = require('../controllers/SourceCtrl')

// user routes
router.post('/podcast/create', PodcastCtrl.httpCreate);
router.post('/podcast/update/:id', PodcastCtrl.httpUpdate);
router.post('/podcast/find', PodcastCtrl.httpFind);
router.post('/podcast/find/source/:id', PodcastCtrl.httpSourcesByPodcast);
router.post('/podcast/list', PodcastCtrl.httpList);

// post routes
router.post('/source/create/:id', SourceCtrl.httpCreate);
router.post('/source/update/:id', SourceCtrl.httpUpdate);
router.post('/source/populate/:id', SourceCtrl.httpPodcastBySource);
router.post('/source/delete/:id', SourceCtrl.httpDelete);

module.exports = router;
