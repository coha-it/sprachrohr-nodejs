const Podcast = require('../models/PodcastModel');
const Source = require('../models/SourceModel');

module.exports = {

    httpUpdate : async (req, res) => {
        await Podcast
                    .findById(req.params.id)
                    .updateOne(req.body.podcast)
        return res.json(200, "Update Podcast Success")
    },

    httpCreate : async (req, res, next) =>{
        const podcast = await Podcast.create(req.body.podcast)
        return res.send(podcast)
    },

    httpFind : async (req, res) => {
        const podcast = await Podcast.find()
        return res.send(podcast)
    },

    httpList : async (req, res) => {
        const podcast = await Podcast.find().populate('sources');
        return res.send(podcast)
    },

    httpSourcesByPodcast : async (req, res) => {
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

    httpDelete : async (req, res) => {
        const { id } = req.params;
        let response = {'messages': []};

        if (await Source.deleteMany({podcast: id})) {
            response.messages.push('Deleted Source');
        }

        if (await Podcast.deleteOne({_id: id})) {
            response.messages.push('Deleted Podcast')
        }

        res.send(200).json(response);
    }

}