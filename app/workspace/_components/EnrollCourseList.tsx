"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import EnrollCourseCard from "./EnrollCourseCard";
import { Course, Enroll } from "@/types/types";
import AddNewCourseDialog from "./AddNewCourseDialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
type EnrollCourseCardProps = {
  id: number;
  courses: Course;
  enrolls: Enroll;
};

function EnrollCourseList() {
  const [enrolledCourses, setEnrolledCourses] = useState<
    EnrollCourseCardProps[]
  >([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getEnrollCourse();
  }, []);
  const getEnrollCourse = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/enroll-course/");

      setLoading(false);
      setEnrolledCourses(res.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="mt-5">
      <h2 className="text-2xl font-bold">O'rganayotgan kurslaringiz</h2>

      <div className="mt-4">
        {enrolledCourses.length === 0 ? (
          <div className="w-full border flex flex-col items-center space-y-8  p-5  rounded-xl">
            <Image src="/education.png" alt="edu" width={80} height={80} />
            <h2>Sizda hali yaratilgan kurslar yo'q</h2>
            <AddNewCourseDialog>
              <Button className="bg-linear-to-r from-[#7C5CFF] to-[#FF4FD8] cursor-pointer text-white">
                + Birinchi kursni yaratish
              </Button>
            </AddNewCourseDialog>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 mt-5">
            {enrolledCourses?.map((cours, index) => (
              <EnrollCourseCard
                key={index}
                courses={cours?.courses}
                enrolledcourse={cours?.enrolls}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EnrollCourseList;
