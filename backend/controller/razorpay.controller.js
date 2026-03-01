import { normalizeRazorpayEvent } from "../services/normalizers/razorpayNormalizer.service.js";
import { transformRazorpayEvent } from "../services/transformers/razorpay.transformer.js";
export const razorpay_webhook = (req, res) => {
    try {
        const data = req.body;
        console.log("Received Razorpay Webhook:", data);
        const normalizedEvent = normalizeRazorpayEvent(req);
        const transformedEvent = transformRazorpayEvent(normalizedEvent);
        console.log("Transformed Razorpay Event:", transformedEvent);
        if(!transformedEvent){
            return res.status(200).json({ message: "Razorpay Webhook received but event was ignored based on transformation rules", normalizedEvent });
        }
        
        res.status(200).json({ message: "Razorpay Webhook received successfully", transformedEvent });
    } catch (error) {
        console.error("Error processing Razorpay Webhook:", error);
        res.status(500).json({ message: "Error processing Razorpay Webhook" });
    }
}