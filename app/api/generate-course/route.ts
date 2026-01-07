import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { db } from "@/config";
import { coursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  const { formData, courseId } = await req.json();
  const PROMPT = `
Genrate Learning Course depends on following details. In which Make sure to add Course Name, Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format Chapter Name,, Topic under each chapters, Duration for each chapters etc, in JSON format only Schema:
Generate a complete learning course using the following user input.
Output JSON ONLY, do not include explanations, notes, or markdown.

User Input:
${JSON.stringify(formData, null, 2)}

JSON SCHEMA:
{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "Beginner | Intermediate | Advanced",
    "includeVideo": "boolean",
    "noOfChapters": "number",
    "bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterNumber": "number",
        "chapterName": "string",
        "chapterDescription": "string",
        "duration": "number",
        "topics": ["string"]
      }
    ]
  }
}

Generate the course using the following user input:
`;
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
  });
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: PROMPT,
      },
    ],
  });

  const Response = response.choices[0].message.content;
  console.log(Response);
  const RawResponse = Response?.replace("```json", "").replace("```", "");
  const JsonResponse = JSON.parse(RawResponse!);
  console.log(JsonResponse);

  const imagePrompt = JsonResponse.course?.bannerImagePrompt;
  const imageUrl = await GenerateImage(imagePrompt);

  const result = await db.insert(coursesTable).values({
    ...formData,
    courseJson: JsonResponse,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    bannerImage: imageUrl,
    cid: courseId,
  });
  return NextResponse.json({ courseId: courseId });
}

const GenerateImage = async (imagePrompt: string) => {
  const BASE_URL = "https://aigurulab.tech";
  const result = await axios.post(
    BASE_URL + "/api/generate-image",
    {
      width: 1024,
      height: 1024,
      input: imagePrompt,
      model: "flux",
      aspectRatio: "16:9",
    },
    {
      headers: {
        "x-api-key": process?.env?.IMAGE_GENERATE_API,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(process.env.IMAGE_GENERATE_API, result);
  return result.data.image;
};
