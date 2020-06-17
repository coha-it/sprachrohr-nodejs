// Defaults
var express = require('express');
var router = express.Router();

// Models
var Podcast = require('../models/Podcast');
var Source = require('../models/Source');

// Create Todo
router.post('/create', (req, res) => {
  if (req.body.password !== 'tmppass4215') {
    res.status(404).json('no');
  } else {
    var podcast = new Podcast(req.body);
    podcast
      .save()
      .then( () => {
        res.status(200).json({'message': 'Podcast successfully added '});
      })
      .catch((err) => {
        res.status(400).json({
          'message': 'Error when saving to database',
          'details': err
        });
      });
  }
});

router.get('/list', (req, res) => {
  Podcast.find((err, podcasts) => {
    if (err) {
      console.log('Error fetching Podcasts', err)
    } else {
      res.json(podcasts)
    }
  })
})

module.exports = router;
