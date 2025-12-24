import express from 'express';
import Record from '../models/Record.js';
import { verifyToken } from '../middleware/auth.js';
import { encrypt, decrypt } from '../utils/encryption.js';

const router = express.Router();

// Get all records for logged in user
router.get('/', verifyToken, async (req, res) => {
    try {
        const records = await Record.find({ userId: req.user._id });
        const decryptedRecords = records.map(record => {
            const r = record.toObject();
            r.password = decrypt(r.password);
            return r;
        });
        res.json(decryptedRecords);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new record
router.post('/', verifyToken, async (req, res) => {
    try {
        const { appName, username, password, notes, category } = req.body;
        const encryptedPassword = encrypt(password);

        const record = new Record({
            userId: req.user._id,
            appName,
            username,
            password: encryptedPassword,
            notes,
            category
        });

        await record.save();
        const response = record.toObject();
        response.password = password; // Send back plain password for immediate UI update
        res.status(201).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update record
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { appName, username, password, notes, category } = req.body;
        const record = await Record.findOne({ _id: req.params.id, userId: req.user._id });

        if (!record) return res.status(404).json({ message: 'Record not found' });

        if (appName) record.appName = appName;
        if (username) record.username = username;
        if (password) record.password = encrypt(password);
        if (notes) record.notes = notes;
        if (category) record.category = category;

        await record.save();
        const response = record.toObject();
        response.password = password || decrypt(record.password);
        res.json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete record
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const result = await Record.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!result) return res.status(404).json({ message: 'Record not found' });
        res.json({ message: 'Record deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
