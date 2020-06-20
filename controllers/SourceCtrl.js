// Models
const Podcast = require('../models/PodcastModel');
const Source = require('../models/SourceModel');

module.exports = {

    httpUpdate : async (req, res) => {
        await Source
                    .findById(req.params.id)
                    .updateOne(req.body.source)
        return res.json(200, "Update Source Success")
    },

    httpCreate : async (req, res) => {
        podcast = req.params;
        id = podcast.id;

        const { type, src } = req.body.source;

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

    httpPodcastBySource : async (req,res)=>{
        const { id } = req.params;
        const podcastBySource = await Source.findById(id).populate('Podcast');
        res.send(podcastBySource);
    },

    httpDelete : async (req, res) => {
        // Get Both
        const { id } = req.params
        const source = await Source.findById(id).populate('podcast'); //.sources.pull({ _id: id });
        const podcast = await Podcast.findById(source.podcast._id)

        // Remove from Podcast
        podcast.sources.remove(id);
        podcast.save();

        // Remove Itself
        source.remove();

        return res.status(200).json('Success delete')
    },

}
