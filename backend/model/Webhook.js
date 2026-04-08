import mongoose from "mongoose";

const webhookSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: false
    },
    source: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
    },
    actor: {
        type: String,
    },

    repository: {
        type: String,
    },
    branch: {
        type: String,
    },
    amount: {
        type: Number,
    },
    currency: {
        type: String,
    },
    status: {
        type: String,
    },
    processed: {
        type: Boolean,
        default: true
    },
    raw: {
        type: Object,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Webhook = mongoose.model("Webhook", webhookSchema);

export default Webhook;