import Webhook from '../model/Webhook.js';
export const getAllEvents = async (req, res) => {
    try {
        const events = await Webhook.find().sort({ createdAt: -1 });

        res.status(200).json({
            count: events.length,
            events
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching events"
        });
    }
};


export const getEventsBySource = async (req, res) => {
    try {
        const {source,type} = req.query;
        const filter = {};
        if(source) filter.source = source;
        if(type) filter.type = type;
        const events = await Webhook.find(filter).sort({ createdAt: -1 });
        res.status(200).json({
            count: events.length,
            events
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching events"
        });
    }
}