import Contact from "../models/Contact.js";
import { sendContactEmail } from "../config/mailer.js";

export const submitContact = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Save to DB
        const contact = await Contact.create({
            name,
            email,
            subject,
            message,
            ip: req.ip,
        });

        // Send notification email (gracefully handles unconfigured email)
        try {
            await sendContactEmail({ name, email, subject, message });
        } catch (emailErr) {
            console.error("Email send failed (non-fatal):", emailErr.message);
        }

        res.status(201).json({
            success: true,
            message: "Message sent successfully! I will get back to you soon.",
        });
    } catch (err) {
        next(err);
    }
};

export const getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, count: contacts.length, data: contacts });
    } catch (err) {
        next(err);
    }
};

export const markRead = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        if (!contact) {
            return res.status(404).json({ success: false, message: "Contact not found" });
        }
        res.json({ success: true, data: contact });
    } catch (err) {
        next(err);
    }
};
