import { Button } from "@/components/ui/button";
import axios from "axios";
import { Book, Loader, PlayCircle, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
export type CourseInfoType = {
  id: number;
  bannerImage: string;
  category: string;
  chapters: number;
  cid: string;
  courseContent: [];
  courseJson: {
    course: {
      bannerImagePrompt: string;
      category: string;
      chapters: [];
      description: string;
      includeVideo: boolean;
      level: string;
      name: string;
      noOfChapters: number;
    };
  };
  description: string;
  name: string;
};
function CourseCard({ course }: { course: CourseInfoType }) {
  const CourseView = course.courseJson.course;
  const [loading, setLoading] = useState(false);
  const enrollCourse = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/enroll-course/", {
        courseId: course?.cid,
      });

      if (res.data.resp) {
        toast.warning("Siz allaqachon kursga qo'shilgansiz!");
        setLoading(false);
        return;
      }
      toast.success("Kursga muvaffiqiyatli qo'shildingiz!");
    } catch (error) {
      console.log(error);
      toast.error("Xatolik yuz berdi!");
      setLoading(false);
    }
  };
  return (
    <div className="shadow-md  rounded-xl cursor-pointer flex flex-col justify-between h-full dark:bg-[#091544] dark:shadow-[#992edb]  ">
      <div>
        <Image
          src={course?.bannerImage}
          alt={course?.name}
          width={400}
          height={300}
          className="object-cover rounded-t-xl w-full"
        />
      </div>
      <div className="p-5 ">
        <h2 className="text-lg font-bold line-clamp-1">{CourseView.name}</h2>
        <p className="line-clamp-3">{CourseView.description}</p>
      </div>
      <div className="p-5 flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <Book className="text-purple-500" />
          <p>{CourseView.chapters?.length} ta bo'lim</p>
        </div>
        <div>
          {course.courseContent.length ? (
            <Button
              disabled={loading}
              onClick={enrollCourse}
              size={"sm"}
              className="bg-linear-to-r from-[#7C5CFF] to-[#FF4FD8] cursor-pointer text-white"
            >
              {loading ? (
                <Loader size={24} className="animate-spin" />
              ) : (
                <PlayCircle size={24} />
              )}
              Kursni ko'rish
            </Button>
          ) : (
            <Link href={`/workspace/edit-course/` + course.cid}>
              <Button size={"sm"} variant="outline" className="cursor-pointer">
                <Settings size={24} /> Kurs yaratish
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
