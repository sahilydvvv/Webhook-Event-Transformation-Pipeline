export const sendSlackNotification = async (message) => {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!webhookUrl) {
        console.error("Slack Webhook URL is not defined in environment variables.");
        return;
    }

    try {
        await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: message })
        });

        console.log("Slack notification sent successfully");

    } catch (error) {
        console.error("Error sending Slack notification:", error);
    }
};