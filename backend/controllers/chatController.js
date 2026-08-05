import { GoogleGenerativeAI } from "@google/generative-ai";

import Department from "../models/Department.js";
import Faculty from "../models/Faculty.js";
import Event from "../models/Event.js";
import Announcement from "../models/Announcement.js";
import Placement from "../models/Placement.js";
import Program from "../models/Program.js";
import ProgramDetails from "../models/programDetailsModel.js";
import Fee from "../models/Fee.js";
import Management from "../models/Management.js";
import Dean from "../models/Dean.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithBot = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Question is required.",
      });
    }

    // ==========================
    // Fetch Database
    // ==========================

    const [
      departments,
      faculty,
      programs,
      programDetails,
      fees,
      events,
      announcements,
      placements,
      management,
      deans,
    ] = await Promise.all([
      Department.find({ isActive: true })
        .populate("hod", "fullName designation")
        .lean(),

      Faculty.find({})
        .populate("departments", "name")
        .lean(),

      Program.find({ isActive: true }).lean(),

      ProgramDetails.find({ isActive: true })
        .populate("program", "programName category")
        .lean(),

      Fee.find({ isActive: true })
        .populate("program", "programName")
        .lean(),

      Event.find({ isPublished: true })
        .populate("department", "name")
        .sort({ startDate: -1 })
        .limit(20)
        .lean(),

      Announcement.find({ isPublished: true })
        .populate("department", "name")
        .sort({ publishDate: -1 })
        .limit(20)
        .lean(),

      Placement.find({ isPublished: true })
        .populate("department", "name")
        .sort({ year: -1 })
        .limit(50)
        .lean(),

      Management.find({})
        .sort({ order: 1 })
        .lean(),

      Dean.find({})
        .sort({ order: 1 })
        .lean(),
    ]);

    // ==========================
    // College Information
    // ==========================

    const collegeInformation = `
Jyoti Nivas College Autonomous Postgraduate Centre is dedicated to academic excellence, advanced research, professional development and value-based education.

The Postgraduate Centre offers a wide spectrum of postgraduate programmes that equip students with in-depth knowledge, critical thinking, research skills and industry exposure.

The Centre promotes innovation, interdisciplinary learning, ethical responsibility, leadership and holistic development.

Admission Contacts:

• Ms. Jaya Thomas - 8884982277
• Mr. Bhagayanathan - 8971192474
• Ms. Vijaya - 9880990642
`;

    // ==========================
    // Context
    // ==========================

    const context = `
COLLEGE INFORMATION

${collegeInformation}

==================================================

DEPARTMENTS

${JSON.stringify(departments, null, 2)}

==================================================

FACULTY

${JSON.stringify(faculty, null, 2)}

==================================================

PROGRAMS

${JSON.stringify(programs, null, 2)}

==================================================

PROGRAM DETAILS

${JSON.stringify(programDetails, null, 2)}

==================================================

FEE STRUCTURE

${JSON.stringify(fees, null, 2)}

==================================================

PLACEMENTS

${JSON.stringify(placements, null, 2)}

==================================================

EVENTS

${JSON.stringify(events, null, 2)}

==================================================

ANNOUNCEMENTS

${JSON.stringify(announcements, null, 2)}

==================================================

MANAGEMENT

${JSON.stringify(management, null, 2)}

==================================================

DEANS

${JSON.stringify(deans, null, 2)}
`;

    const prompt = `
You are the official AI Assistant of the Jyoti Nivas College Autonomous Postgraduate Centre.

STRICT RULES

1. Answer ONLY questions related to Jyoti Nivas College.

2. Use ONLY the information available in the provided database.

3. If the answer exists in the database, answer naturally and professionally.

4. If the user asks:
- About Jyoti Nivas College
- About PG Centre
- Admission
- Departments
- Faculty
- HOD
- Programmes
- Fees
- Eligibility
- Programme Details
- Programme Outcomes
- Career Opportunities
- Placements
- Events
- Announcements
- Management
- Deans

answer using the database.

5. If information is unavailable, reply exactly:

"I couldn't find that information in the Jyoti Nivas College database."

6. If the user asks about any OTHER college, university or institution, reply:

"I am the Jyoti Nivas College PG Portal Assistant. I can answer questions only about Jyoti Nivas College and the information available in this portal."

7. Do NOT answer:
- Other colleges
- Politics
- Movies
- Sports
- Programming
- General knowledge
- Mathematics
- Any unrelated topic

8. Never make up information.

9. Keep answers concise.

DATABASE

${context}

QUESTION

${question}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);

    return res.json({
      success: true,
      answer: result.response.text().trim(),
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

    return res.status(500).json({
      success: false,
      message: "Chatbot error",
    });
  }
};