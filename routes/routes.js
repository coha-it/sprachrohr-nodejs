// Defaults
var express = require('express');
var router = express.Router();

// Controllers
const PodcastCtrl = require('../controllers/PodcastCtrl')
const SourceCtrl = require('../controllers/SourceCtrl')

// Podcast routes
router.post('/podcast/create', PodcastCtrl.httpCreate);
router.patch('/podcast/update/:id', PodcastCtrl.httpUpdate);
router.get('/podcast/find', PodcastCtrl.httpFind);
router.get('/podcast/find/source/:id', PodcastCtrl.httpSourcesByPodcast);
router.get('/podcast/list', PodcastCtrl.httpList);
router.delete('/podcast/delete/:id', PodcastCtrl.httpDelete);

// Source routes
router.post('/source/create/:id', SourceCtrl.httpCreate);
router.patch('/source/update/:id', SourceCtrl.httpUpdate);
router.get('/source/populate/:id', SourceCtrl.httpPodcastBySource);
router.delete('/source/delete/:id', SourceCtrl.httpDelete);

module.exports = router;
