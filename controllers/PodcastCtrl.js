const Podcast = require('../models/PodcastModel');

module.exports = {
    create : async (req, res) =>{
        const podcast = await Podcast.create(req.body.podcast)
        return res.send(podcast)
    },

    update : async (req, res) => {
        await Podcast
                    .findById(req.params.id)
                    .updateOne(req.body.podcast)
        return res.json(200, "Update Success")
    },

    find : async (req, res) => {
        const podcast = await Podcast.find()
        return res.send(podcast)
    },

    sourcesByPodcast : async (req, res) => {
       const { id } = req.params;
       const podcast = await Podcast.findById(id).populate('sources');

       res.send(podcast.sources);
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
}