export const transformGitHubEvent = (event) => {
    if (!event || !event.type) {
        console.log("Invalid event received in transformer");
        return null;
    }
    if (event.type !== "push") {
        console.log(`Ignored event type: ${event.type}`);
        return null;
    }
    const cleanBranch = event.branch?.replace("refs/heads/", "");
    if (cleanBranch !== "main") {
        console.log(`Ignored branch: ${cleanBranch}`);
        return null;
    }
    const transformedEvent = {
        ...event,
        branch: cleanBranch,
        isMainBranch: true,
        processedAt: Date.now(),
        summary: `${event.actor} pushed to ${cleanBranch}`
    };

    return transformedEvent;
};
