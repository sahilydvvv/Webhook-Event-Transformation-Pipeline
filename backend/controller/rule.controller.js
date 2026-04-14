import Rule from '../model/Rule.js';

export const createRule = async (req, res) => {
    try {
        const rule = await Rule.create(req.body);
        res.status(201).json(rule);
    } catch (error) {
        res.status(500).json({ message: "Error creating rule" });
    }
};

export const getRules = async (req, res) => {
    try {
        const rules = await Rule.find().sort({ createdAt: -1 });
        res.status(200).json(rules);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rules" });
    }
};

export const deleteRule = async (req, res) => {
    try {
        await Rule.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Rule deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting rule" });
    }
};
