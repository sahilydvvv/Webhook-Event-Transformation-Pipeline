export const normalizeGitHubEvent = (req) => {
    return {
        id: req.headers["x-github-delivery"],
        source: "github",
        type: req.headers["x-github-event"],
        repository: req.body.repository?.full_name,
        branch: req.body.ref || null,
        actor: req.body.sender?.login,
        action: req.body.action || null,
        commitId: req.body.head_commit?.id || null,
        message: req.body.head_commit?.message || null,
        timestamp: Date.now()
    };
};
