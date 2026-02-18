import { normalizeGitHubEvent } from "../services/githubNormalizer.service.js";


export const webhook_github = async (req,res)=>{
    try {
        const data = req.body;
        // console.log("Received GitHub Webhook:", data);
        const normalizedEvent = normalizeGitHubEvent(req);
        console.log("Normalized GitHub Event:", normalizedEvent);
        
        res.status(200).json({ message: "GitHub Webhook received successfully", normalizedEvent });
    } catch (error) {
        console.error("Error processing GitHub Webhook:", error);
        res.status(500).json({ message: "Error processing GitHub Webhook" });    
    }
}