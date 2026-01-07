"use client";

import ChapterContent, {
  CourseInfoType,
  EnrollInfoType,
} from "../_components/ChapterContent";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { ModeToggle } from "@/app/_components/ModleToogle";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ChapterListSidebar from "../_components/ChapterListSidebar";

type CourseEnrollResponse = {
  courses: CourseInfoType;
  enrolls: EnrollInfoType;
};
function Course() {
  const { courseId } = useParams();
  const [courseInfo, setCourseInfo] = useState<CourseEnrollResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getEnrollCourseById();
  }, []);
  const getEnrollCourseById = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/enroll-course?courseId=" + courseId);
      setCourseInfo(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div>
      <div className=" p-4 shadow-md dark:shadow-[#992edb] dark:shadow-sm border ">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/workspace">
              <div className="flex items-center gap-2 text-lg font-semibold  p-2 ">
                <div className="flex items-center justify-center px-5 py-1 rounded-lg bg-linear-to-br from-[#7F00FF] via-[#E100FF] to-[#FF69B4] shadow-lg shadow-white/15">
                  <span className="text-xl mr-3">📚</span>
                  <span className="text-white font-medium tracking-wide text-lg">
                    DavaCourse
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <button
              className="md:hidden p-2 rounded-lg border animate-pulse"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>
            <ModeToggle />
            <UserButton />
          </div>
        </div>
      </div>
      <div className="flex relative">
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          />
        )}

        <div
          className={`
      fixed md:static top-12
      h-[calc(100vh-72px)]
      w-3/4 sm:w-1/2 md:w-1/4
      border-r
      z-40

      transition-all duration-300
      ${open ? "left-0" : "-left-full"}
      md:left-0
    `}
        >
          {courseInfo && <ChapterListSidebar courseInfo={courseInfo} />}
        </div>

        <div className="w-full md:w-3/4 ">
          {courseInfo && (
            <ChapterContent
              refreshData={getEnrollCourseById}
              courseInfo={courseInfo}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Course;
