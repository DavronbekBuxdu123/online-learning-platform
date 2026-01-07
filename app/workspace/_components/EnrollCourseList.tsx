"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import EnrollCourseCard from "./EnrollCourseCard";
import { Course, Enroll } from "@/types/types";
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 mt-5">
        {enrolledCourses?.map((cours) => (
          <EnrollCourseCard
            key={cours.id}
            courses={cours?.courses}
            enrolledcourse={cours?.enrolls}
          />
        ))}
      </div>
    </div>
  );
}

export default EnrollCourseList;
