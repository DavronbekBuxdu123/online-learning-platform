"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddNewCourseDialog from "./AddNewCourseDialog";
import CourseCard, { CourseInfoType } from "./CourseCard";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

function CourseList() {
  const [courses, setCourses] = useState<CourseInfoType[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    user?.id && getCourses();
  }, [user?.id]);

  const getCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/courses");
      setCourses(res.data);
      
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <div>
        <h2 className="text-2xl font-bold py-3">Kurslar ro'yxati</h2>
        <div>
          {courses.length === 0 ? (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseList;
