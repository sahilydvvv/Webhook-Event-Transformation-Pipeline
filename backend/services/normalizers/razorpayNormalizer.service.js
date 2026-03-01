export const normalizeRazorpayEvent = (req) => {

    const eventType = req.body.event;
    const entity =
        req.body.payload?.payment?.entity ||
        req.body.payload?.refund?.entity ||
        req.body.payload?.order?.entity ||
        null;

    return {
        id: entity?.id || null,
        source: "razorpay",
        type: eventType,

        amount: entity?.amount || null,
        currency: entity?.currency || "INR",
        status: entity?.status || null,

        orderId: entity?.order_id || entity?.id || null,
        method: entity?.method || null,
        email: entity?.email || null,

        timestamp: Date.now(),

        // raw: req.body
    };
};