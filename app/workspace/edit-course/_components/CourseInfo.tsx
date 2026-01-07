import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Clock,
  Layers,
  Loader,
  PlaySquare,
  Settings,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export type ChapterType = {
  chapterDescription: string;
  chapterName: string;
  chapterNumber: number;
  duration: number;
  topics: string[];
};

export type Course = {
  bannerImage: string;
  category: string;
  chapters: number;
  cid: string;
  courseJson: {
    course: {
      bannerImagePrompt: string;
      category: string;
      chapters: ChapterType[];
      description: string;
      includeVideo: boolean;
      level: string;
      name: string;
      noOfChapters: number;
    };
  };
  description: string;
  id: number;
  level: string;
  name: string;
  userEmail: string;
  video: boolean;
};
type CourseInfoProps = {
  course: Course;
  CourseView?: boolean;
};
function CourseInfo({ course, CourseView }: CourseInfoProps) {
  const [loading, setLoading] = useState(false);
  const courseMap = course?.courseJson?.course;
  const router = useRouter();
  const GenerateCourse = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/generate-course-content", {
        courseJson: courseMap,
        courseTitle: course?.name,
        courseId: course.cid,
      });
      
      router.replace("/workspace");
      toast.success("Kurs yaratildi");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Xatolik yuz berdi");
    }
  };
  const duration = () => {
    let s = 0;
    courseMap?.chapters?.map((chapter) => {
      s = s + chapter.duration;
    });
    return s;
  };

  return (
    <div className="shadow-md p-5 rounded-2xl  md:flex  items-center gap-5 dark:bg-[#091544] dark:shadow-[#992edb] ">
      <div className="space-y-5">
        <h2 className="text-3xl font-bold">{courseMap?.name}</h2>
        <p className="text-gray-500 line-clamp-6 md:line-clamp-2">
          {courseMap?.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex items-center gap-5 shadow-md rounded-xl p-5 w-[97%] dark:bg-[#091544] dark:shadow-[#992edb] ">
            <div>
              <Clock className="text-blue-500" />
            </div>
            <div className="">
              <h2 className="font-bold">Davomiyligi</h2>
              <p>{duration()} daqiqa</p>
            </div>
          </div>
          <div className="flex items-center gap-5 shadow-md rounded-xl p-5 w-[97%] dark:bg-[#091544] dark:shadow-[#992edb] ">
            <div>
              <Layers className="text-green-500" />
            </div>
            <div className="">
              <h2 className="font-bold">Bo'limlar</h2>
              <p>{courseMap?.chapters?.length} ta</p>
            </div>
          </div>
          <div className="flex items-center gap-5 shadow-md rounded-xl p-5 w-[97%] dark:bg-[#091544] dark:shadow-[#992edb] ">
            <div>
              <TrendingUp className="text-red-500" />
            </div>
            <div className="">
              <h2 className="font-bold">Daraja</h2>
              <p>{courseMap?.level}</p>
            </div>
          </div>
        </div>
        <div>
          {!CourseView ? (
            <Button
              onClick={GenerateCourse}
              className="w-full md:max-w-70 bg-linear-to-r from-[#7C5CFF] to-[#FF4FD8] cursor-pointer text-white"
            >
              {loading ? <Loader className="animate-spin" /> : <Settings />}{" "}
              Kursni yaratish
            </Button>
          ) : (
            <Link href={`/course/` + course?.cid}>
              <Button className="w-full md:max-w-70 bg-linear-to-r from-[#7C5CFF] to-[#FF4FD8] cursor-pointer text-white">
                {loading ? <Loader className="animate-spin" /> : <PlaySquare />}{" "}
                Kursni ko'rish
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="mt-5">
        {course?.bannerImage && (
          <Image
            className="w-full h-60 rounded-2xl"
            src={course.bannerImage}
            alt="BannerImage"
            width={400}
            height={400}
          />
        )}
      </div>
    </div>
  );
}

export default CourseInfo;
