import Webhook from '../model/Webhook.js';

export const createManualEvent = async (req, res) => {
    try {
        const { source, type, summary, raw } = req.body;
        
        const newEvent = await Webhook.create({
            source: source || 'MANUAL',
            type: type || 'test.event',
            summary: summary || 'Manual Test Event',
            raw: raw || {},
            processed: true
        });

        res.status(201).json({
            message: "Event created successfully",
            event: newEvent
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating manual event"
        });
    }
};
