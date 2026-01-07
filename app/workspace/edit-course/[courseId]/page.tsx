"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import ChapterTopicList from "../_components/ChapterTopicList";
import CourseInfo, { Course } from "../_components/CourseInfo";

function CourseEdit({ CourseView = false }) {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/courses?courseId=${courseId}`);
      setCourse(res.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <CourseInfo CourseView={CourseView} course={course!} />
      <ChapterTopicList course={course!} />
    </div>
  );
}

export default CourseEdit;
