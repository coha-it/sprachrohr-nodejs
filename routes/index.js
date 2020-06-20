// Defaults
var express = require('express');
var router = express.Router();

// Controllers
const PodcastCtrl = require('../controllers/PodcastCtrl')
const SourceCtrl = require('../controllers/SourceCtrl')

// user routes
router.post('/podcast/create', PodcastCtrl.create);
router.post('/podcast/update/:id', PodcastCtrl.update);
router.post('/podcast/find', PodcastCtrl.find);
router.post('/podcast/find/source/:id', PodcastCtrl.sourcesByPodcast);

// post routes
router.post('/source/create/:id', SourceCtrl.create);
router.post('/source/populate/:id', SourceCtrl.podcastBySource);

module.exports = router;
