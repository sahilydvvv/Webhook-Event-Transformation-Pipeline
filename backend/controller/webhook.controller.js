import Webhook from "../model/Webhook.js";
import { normalizeGitHubEvent } from "../services/normalizers/githubNormalizer.service.js";
import { routeEvent } from "../services/router.service.js";
import { transformGitHubEvent } from "../services/transformers/github.transformer.js";

export const webhook_github = async (req, res) => {
    try {
        const normalizedEvent = normalizeGitHubEvent(req);
        console.log("Normalized GitHub Event:", normalizedEvent);

        const transformedEvent = transformGitHubEvent(normalizedEvent);
        console.log("Transformed GitHub Event:", transformedEvent);

        if (!transformedEvent) {
            console.log("GitHub Webhook received but event was ignored - not a push to main branch");
            return res.status(200).json({
                message: "GitHub Webhook received but event was ignored",
                normalizedEvent
            });
        }
        await Webhook.create({
            eventId: normalizedEvent.id,
            source: transformedEvent.source,
            type: transformedEvent.type,
            summary: transformedEvent.summary,
            actor: transformedEvent.actor,
            repository: transformedEvent.repository,
            branch: transformedEvent.branch,
            status: transformedEvent.status,
            raw: req.body
        });
        await routeEvent(transformedEvent);

        res.status(200).json({
            message: "GitHub Webhook processed successfully",
            transformedEvent
        });

    } catch (error) {
        console.error("Error processing GitHub Webhook:", error);
        res.status(500).json({
            message: "Error processing GitHub Webhook"
        });
    }
};