import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true, // e.g., GITHUB, RAZORPAY
    },
    eventType: {
        type: String,
        required: true, // e.g., push, payment.captured
    },
    transformations: [
        {
            from: String, // field name in raw data
            to: String,   // field name in transformed data
        }
    ],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Rule = mongoose.model("Rule", ruleSchema);

export default Rule;
