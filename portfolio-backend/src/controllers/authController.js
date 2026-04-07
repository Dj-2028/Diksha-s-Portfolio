import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const admin = await Admin.findOne({ email });

        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({
            success: true,
            token,
            admin: { id: admin._id, email: admin.email },
        });
    } catch (err) {
        next(err);
    }
};

export const getMe = async (req, res) => {
    res.json({ success: true, data: req.admin });
};
