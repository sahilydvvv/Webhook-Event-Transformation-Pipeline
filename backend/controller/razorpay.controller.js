import { normalizeRazorpayEvent } from "../services/normalizers/razorpayNormalizer.service.js";
import { routeEvent } from "../services/router.service.js";
import { transformRazorpayEvent } from "../services/transformers/razorpay.transformer.js";
import Webhook from "../model/Webhook.js";

export const razorpay_webhook = async (req, res) => {
    try {
        console.log("Received Razorpay Webhook:", req.body);
        const normalizedEvent = normalizeRazorpayEvent(req);
        const transformedEvent = transformRazorpayEvent(normalizedEvent);
        console.log("Transformed Razorpay Event:", transformedEvent);
        if (!transformedEvent) {
            return res.status(200).json({
                message: "Razorpay Webhook received but event was ignored",
                normalizedEvent
            });
        }
        await Webhook.create({
            eventId: normalizedEvent.id,
            source: transformedEvent.source,
            type: transformedEvent.type,
            summary: transformedEvent.summary,
            amount: transformedEvent.amount,
            currency: transformedEvent.currency,
            status: transformedEvent.status,
            raw: req.body
        });
        await routeEvent(transformedEvent);
        res.status(200).json({
            message: "Razorpay Webhook processed successfully",
            transformedEvent
        });

    } catch (error) {
        console.error("Error processing Razorpay Webhook:", error);
        res.status(500).json({
            message: "Error processing Razorpay Webhook"
        });
    }
};