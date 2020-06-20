const Podcast = require('../models/PodcastModel');
const Source = require('../models/SourceModel');

module.exports = {

    httpUpdate : async (req, res) => {
        await Podcast
                    .findById(req.params.id)
                    .updateOne(req.body.podcast)
                    .then(podcast => {
                        res.status(200).json("Update Podcast Success")
                    }).catch(error => {
                        res.status(400).json({'message': 'Couldnt find Podcast', 'error': error })
                    })
    },

    httpCreate : async (req, res, next) =>{
        const podcast = await Podcast.create(req.body.podcast)
        return res.send(podcast)
    },

    httpFind : async (req, res) => {
        const podcast = await Podcast.find()
        return res.json(podcast)
    },

    httpList : async (req, res) => {
        const podcast = await Podcast.find().populate('sources');
        return res.json(podcast)
    },

    httpSourcesByPodcast : async (req, res) => {
       const { id } = req.params;
       
       await Podcast
                .findById(id)
                .populate('sources')
                .find(podcast => {
                    res.status(200).json(podcast.sources);
                }).catch(error => {
                    res.status(400).json(error)
                });
    },

    // list : async (req, res) => {
    //   Podcast.find((err, podcasts) => {
    //     if (err) {
    //       console.log('Error fetching Podcasts', err)
    //     } else {
    //       res.json(podcasts)
    //     }
    //   })
    // },

    httpDelete : async (req, res) => {
        const { id } = req.params;

        await Source
                .deleteMany({podcast: id})
                .then(response => {
                    console.log('Deleted Sources');
                }).catch(error => {
                    console.log('Could\'nt find Sources for Podcast');
                });

        await Podcast
                .deleteOne({_id: id})
                .then(response => {
                    res.status(200).json('Deleted Podcast');
                }).catch(error => {
                    res.status(400).json('Could\'nt find Podcast');
                });
    }

}