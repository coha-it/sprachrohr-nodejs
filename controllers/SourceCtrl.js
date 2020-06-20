// Models
const Podcast = require('../models/PodcastModel');
const Source = require('../models/SourceModel');

module.exports = {
    create : async (req, res) => {
        podcast = req.params;
        id = podcast.id;

        const { type, src } = req.body;

        const source = await Source.create({
            type,
            src,
            podcast:id
        });
        await source.save();

        const podcastById = await Podcast.findById(id);

        podcastById.sources.push(source);
        await podcastById.save();

        return res.send(podcastById);
    },

    podcastBySource : async (req,res)=>{
        const { id } = req.params;
        const podcastBySource = await Source.findById(id).populate('Podcast');
        res.send(podcastBySource);
    },

}
