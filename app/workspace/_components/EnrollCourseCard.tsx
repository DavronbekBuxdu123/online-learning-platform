import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Course, Enroll } from "@/types/types";
import { PlaySquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
type EnrollCourseCardProps = {
  courses: Course;
  enrolledcourse: Enroll;
};
function EnrollCourseCard({ courses, enrolledcourse }: EnrollCourseCardProps) {
  const CourseView = courses.courseJson.course;
  const ProgressResults = () => {
    const result =
      (enrolledcourse?.completedChapters?.length / courses?.chapters) * 100;
    return Math.round(result);
  };
  console.log(Number.isNaN(ProgressResults()) ? 0 : "");
  return (
    <div className="shadow-md  rounded-xl cursor-pointer flex flex-col justify-between h-full dark:bg-[#091544] dark:shadow-[#992edb]  ">
      <div>
        <Image
          src={courses?.bannerImage}
          alt={courses?.name}
          width={400}
          height={300}
          className="object-cover rounded-t-xl w-full"
        />
      </div>
      <div className="p-5">
        <h2 className="text-lg font-bold line-clamp-1">{CourseView.name}</h2>
        <p className="line-clamp-3">{CourseView.description}</p>
      </div>
      <div className="px-5 flex items-center justify-between text-purple-500">
        <p>Natija</p>
        <p>{Number.isNaN(ProgressResults()) ? 0 : ProgressResults()}%</p>
      </div>
      <div className="px-5">
        <Progress className="[&>div]:bg-[#992edb]" value={ProgressResults()} />
      </div>
      <div className="p-5 ">
        <Link href={`/workspace/view-course/` + courses.cid}>
          <Button className="bg-linear-to-r text-white from-[#7C5CFF] to-[#FF4FD8] cursor-pointer w-full ">
            <PlaySquare size={24} /> Kursni ko'rish
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default EnrollCourseCard;
