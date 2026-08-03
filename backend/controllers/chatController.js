import { GoogleGenerativeAI } from "@google/generative-ai";

import Department from "../models/Department.js";
import Faculty from "../models/Faculty.js";
import Event from "../models/Event.js";
import Announcement from "../models/Announcement.js";
import Placement from "../models/Placement.js";

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

export const chatWithBot = async (req, res) => {
    try {
        const { question } = req.body;

        const departments = await Department.find({})
            .select("name hod");

        const faculty = await Faculty.find({})
            .select("name designation department");

        const events = await Event.find({})
            .select("title date")
            .limit(10);

        const announcements = await Announcement.find({})
            .select("title")
            .limit(10);

        const placements = await Placement.find({})
            .select("studentName company department")
            .limit(20);

        const context = `
Departments:
${JSON.stringify(departments)}

Faculty:
${JSON.stringify(faculty)}

Events:
${JSON.stringify(events)}

Announcements:
${JSON.stringify(announcements)}

Placements:
${JSON.stringify(placements)}
`;

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });
        const result = await model.generateContent(`
            You are the JNC PG Portal Assistant.

            Answer briefly and only from the provided data.

            If the information is not available, reply:
            "Sorry, I could not find that information."

            ${context}

            Question: ${question}
            `);

        res.json({
            success: true,
            answer: result.response.text(),
        });

    } catch (error) {
        console.error(error);

            if (error.status === 429) {
    return res.status(429).json({
        success: false,
        message:
        "AI assistant is busy. Please try again after a minute.",
    });
    }

        res.status(500).json({
            success: false,
            message: "Chatbot error",
        });
    }
};