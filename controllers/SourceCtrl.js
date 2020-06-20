// Models
const Podcast = require('../models/PodcastModel');
const Source = require('../models/SourceModel');

module.exports = {

    httpUpdate : async (req, res) => {
        await Source
                    .findById(req.params.id)
                    .updateOne(req.body.source)
                    .then(success => {
                        res.json(200, "Update Source Success")
                    }).catch(error => {
                        res.json(400, "Update Source Error")
                    })
    },

    httpCreate : async (req, res) => {
        const { type, src } = req.body.source;
        const podcast = req.params;
        const id = podcast.id;

        // Create Source
        const source = await Source.create({
            type,
            src,
            podcast:id
        }).then(source => {
            return source;
        }).catch(() => {
            console.log('error ');
        });

        // Connect with Podcast
        const podcastById = await Podcast
            .findById(id)
            .then(podcast => {
                podcast.sources.push(source);
                podcast.save();
                return podcast;
            }).catch(() => {
                return false;
            });

        if (podcastById) {
            res.status(200).json(podcastById);
        } else {
            res.status(400).json('error - couldnt create');
        }
    },

    httpPodcastBySource : async (req,res)=>{
        await Source
            .findById(req.params.id)
            .populate('podcast')
            .then(podcast => {
                res.json(200, podcast);
            })
            .catch(err => {
                res.json(400, err);
            });
    },

    httpDelete : async (req, res) => {
        // Get Both
        const { id } = req.params
        const source = await Source.findById(id).populate('podcast'); //.sources.pull({ _id: id });

        // Response
        let response = { 'status': '', 'messages': [] }

        if(source) {
            const podcast = await Podcast.findById(source.podcast._id)

            // // Remove from Podcast
            if(podcast) {
                podcast.sources.remove(id);
                podcast.save();
                response.messages.push('Removed Source from Podcast') 
            }

            // // Remove Itself
            if (source.deleteOne()) {
                response.messages.push('Removed Source from Sources') 
            }

            response.status = 'success'
            res.status(200).json(response)
        }

        response.status = 'error'
        response.messages.push('Nothing to Delete')
        res.status(404).json(response)
    },

}
