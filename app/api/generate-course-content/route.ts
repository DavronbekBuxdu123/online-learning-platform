import Groq from "groq-sdk";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { Chapter } from "@/types/types";

type YouTubeVideo = {
  videoId: string;
  title: string;
};

const PROMPT = `Generate content for each topic in HTML.
Output JSON ONLY.
Do NOT include any explanations, notes, or extra text.
Use this schema exactly:

{
  "chapterName": "string",
  "topics": [
    {
      "topic": "string",
      "content": "string (HTML)"
    }
  ]
}

User Input: <chapter JSON here>
`;
export async function POST(req: NextRequest) {
  const { courseJson, courseTitle, courseId } = await req.json();
  function safeJSON(text: string) {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) throw new Error("No JSON found");
    const jsonString = text.substring(start, end + 1);
    return JSON.parse(jsonString);
  }
  const promises = courseJson?.chapters.map(async (chapter: Chapter) => {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY!,
    });
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: PROMPT + JSON.stringify(chapter),
        },
      ],
    });
    const Response = response.choices[0].message.content;

    const jsonMatch = Response?.match(/\{[\s\S]*\}$/);
    if (!jsonMatch) throw new Error("No JSON found in AI response");

    const JsonResponse = JSON.parse(jsonMatch[0]);
    const youtubeData = await GetYouTubeVideo(chapter.chapterName);

    return {
      youTubeVideo: youtubeData,
      courseData: JsonResponse,
    };
  });

  const CourseContent = await Promise.all(promises);
  const dbRes = await db
    .update(coursesTable)
    .set({ courseContent: CourseContent })
    .where(eq(coursesTable.cid, courseId));
  return NextResponse.json({
    courseName: courseTitle,
    CourseContent: CourseContent,
  });
}
const YOU_TUBE_URL = "https://www.googleapis.com/youtube/v3/search";
const GetYouTubeVideo = async (topic: string): Promise<YouTubeVideo[]> => {
  const params = {
    part: "snippet",
    q: topic,
    maxResults: 4,
    type: "video",
    key: process.env.YOU_TUBE_API_KEY,
  };
  const res = await axios.get(YOU_TUBE_URL, { params });
  const videoList = res.data.items;
  const videoListArray: YouTubeVideo[] = [];
  videoList.forEach((item: any) => {
    const data = {
      videoId: item.id?.videoId,
      title: item?.snippet?.title,
    };
    videoListArray.push(data);
  });
  return videoListArray;
};
