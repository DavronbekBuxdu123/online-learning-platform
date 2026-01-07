"use client";

import { SelectedChapterContext } from "@/app/context/SelectedChapterIndex";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CheckCircle, Loader, Video } from "lucide-react";
import { useContext, useState } from "react";
import YouTube from "react-youtube";
import { toast } from "sonner";

export type TopicType = {
  topic: string;
  content: string;
};
export type ChapterDataType = {
  chapterName: string;
  topics: TopicType[];
};
export type CourseInfoType = {
  bannerImage: string;
  category: string;
  chapters: number;
  cid: string;
  courseContent: CourseContentItem[];
  courseJson: {
    course: {};
  };
  description: string;
  name: string;
};
export type EnrollInfoType = {
  completedChapters: number[];
};
export type YouTubeVideo = {
  videoId: string;
  title: string;
};
export type CourseContentItem = {
  courseData: ChapterDataType;
  youTubeVideo: YouTubeVideo[];
};

export type ChapterContentProps = {
  courseInfo: {
    courses: CourseInfoType;
    enrolls: EnrollInfoType;
  };
  refreshData: () => void;
};

type courseDataType = {
  chapterName: string;
};
function ChapterContent({ courseInfo, refreshData }: ChapterContentProps) {
  const { selectedIndex, setSelectedIndex } = useContext(
    SelectedChapterContext
  );
  const [loading, setLoading] = useState(false);
  const CourseMap = courseInfo?.courses?.courseContent;
  const videoData = CourseMap?.[selectedIndex]?.youTubeVideo;
  const topics = CourseMap?.[selectedIndex]?.courseData.topics;
  const couruseCid = courseInfo?.courses?.cid;
  let completedChapter = courseInfo?.enrolls?.completedChapters ?? [];
  const chapterMark = async () => {
    completedChapter.push(selectedIndex);
    setLoading(true);
    try {
      const res = await axios.put("/api/enroll-course", {
        courseId: couruseCid,
        completedChapters: completedChapter,
      });

      refreshData();
      setLoading(false);
      toast.success("Bo'lim muvaffaqiyatli yakunlandi");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const EndChapter = async () => {
    const updatedChapter = completedChapter.filter(
      (item) => item != selectedIndex
    );
    setLoading(true);
    
    try {
      const res = await axios.put("/api/enroll-course", {
        courseId: couruseCid,
        completedChapters: updatedChapter,
      });

      refreshData();
      setLoading(false);
      toast.success("Qaytadan davom ettirishingiz mumkin!");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="p-4 md:p-10">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-purple-500">
          {selectedIndex + 1}.{" "}
          {CourseMap?.[selectedIndex]?.courseData?.chapterName}
        </h2>
        {courseInfo?.enrolls?.completedChapters?.includes(selectedIndex) ? (
          <Button
            disabled={loading}
            onClick={EndChapter}
            variant="outline"
            className="bg-linear-to-r cursor-pointer "
          >
            {loading ? <Loader className="animate-spin" /> : <CheckCircle />}
            Qayta boshlash
          </Button>
        ) : (
          <Button
            disabled={loading}
            onClick={() => chapterMark()}
            className="bg-linear-to-r cursor-pointer from-[#7C5CFF] to-[#FF4FD8]  text-white"
          >
            {" "}
            {loading ? <Loader className="animate-spin" /> : <CheckCircle />}
            Bo'limni tugatish
          </Button>
        )}
      </div>

      <h2 className="text-md font-medium flex items-center gap-1 mt-2">
        Mavzu videolari <Video />
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5 container ">
        {videoData?.map(
          (video, index) =>
            index < 2 && (
              <div className="w-full h-[220px] md:w-[400px] md:h-[225px] rounded-2xl overflow-hidden">
                <YouTube
                  videoId={video.videoId}
                  opts={{
                    width: "100%",
                    height: "220px",
                  }}
                />
              </div>
            )
        )}
      </div>
      <div className="mt-7  ">
        {topics?.map((topic, index) => (
          <div className="mt-10 p-5 bg-purple-50 dark:bg-[#091544] dark:shadow-[#992edb] rounded-lg">
            <h2 className="font-bold text-lg text-purple-500">
              {index + 1}. {topic?.topic}
            </h2>

            <div
              style={{ lineHeight: "2" }}
              dangerouslySetInnerHTML={{ __html: topic?.content }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
