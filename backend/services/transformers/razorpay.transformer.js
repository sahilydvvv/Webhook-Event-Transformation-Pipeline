export const transformRazorpayEvent = (event) => {

    if (!event || !event.type) {
        console.log("Invalid Razorpay event");
        return null;
    }

    switch (event.type) {

        case "payment.captured":
            return {
                ...event,
                amountInRupees: event.amount / 100,
                summary: `Payment of ₹${event.amount / 100} captured successfully`,
                success: true,
                processedAt: Date.now()
            };

        case "payment.failed":
            return {
                ...event,
                summary: `Payment failed`,
                success: false,
                processedAt: Date.now()
            };

        case "refund.processed":
            return {
                ...event,
                amountInRupees: event.amount / 100,
                summary: `Refund of ₹${event.amount / 100} processed`,
                refund: true,
                processedAt: Date.now()
            };

        case "order.paid":
            return {
                ...event,
                summary: `Order ${event.orderId} has been paid`,
                orderCompleted: true,
                processedAt: Date.now()
            };

        default:
            console.log("Unhandled Razorpay event type:", event.type);
            return null;
    }
};