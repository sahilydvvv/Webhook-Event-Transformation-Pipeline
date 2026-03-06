import { sendSlackNotification } from "./slack.service.js";

export const routeEvent = async (event) => {

    if (!event) {
        console.log("No event provided for routing");
        return;
    }

    switch (event.source) {

        case "github":
            if (event.type === "push") {
                await sendSlackNotification(
                    `GitHub Push: ${event.summary}`
                );
            }
            break;

        case "razorpay":
            if (event.type === "payment.captured") {
                
                await sendSlackNotification(
                    `Payment Captured: ₹${event.amount} ${event.currency}`
                );
            }

            else if (event.type === "payment.failed") {
                await sendSlackNotification(
                    `Payment Failed: ₹${event.amount} ${event.currency}`
                );
            }

            else if (event.type === "refund.processed") {
                await sendSlackNotification(
                    `Refund Processed: ₹${event.amount} ${event.currency}`
                );
            }
             else if(event.type === "order.paid"){
                await sendSlackNotification(`Order Paid: Order ${event.id} paid successfully`);
            }
            else{
                console.log(`Unhandled Razorpay event: ${event.type}`);
            }
            break;

        default:
            console.log(`No routing rules defined for source: ${event.source}`);
    }
};