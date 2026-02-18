export const webhook_github = async (req,res)=>{
    try {
        const data = req.body;
        console.log("Received GitHub Webhook:", data);
        
        res.status(200).json({ message: "GitHub Webhook received successfully" });
    } catch (error) {
        console.error("Error processing GitHub Webhook:", error);
        res.status(500).json({ message: "Error processing GitHub Webhook" });    
    }
}