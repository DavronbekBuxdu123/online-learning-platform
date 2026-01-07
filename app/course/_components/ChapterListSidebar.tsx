import { SelectedChapterContext } from "@/app/context/SelectedChapterIndex";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { CheckCircle } from "lucide-react";
import { useContext } from "react";
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
  courseContent: {
    courseData: ChapterDataType;
  }[];
  courseJson: {
    course: {

    };
  };
  description: string;
  name: string;
};
export type EnrollInfoType = {
  completedChapters: number[]; 
};

export type ChapterListSidebarProps = {
  courseInfo: {
    courses: CourseInfoType;
    enrolls: EnrollInfoType;
  };
};

type courseDataType = {
  chapterName: string;
};
function ChapterListSidebar({ courseInfo }: ChapterListSidebarProps) {
  const { selectedIndex, setSelectedIndex } = useContext(
    SelectedChapterContext
  );


  const completed = courseInfo?.enrolls?.completedChapters;
  const CourseMap = courseInfo?.courses?.courseContent;
  return (
    <div className="w-80 min-h-screen bg-purple-50 dark:bg-[#091544] shadow-white rounded-lg  p-5 mt-10">
      <h2 className="text-xl font-bold my-2">
        Bo'limlar ({CourseMap?.length})
      </h2>
      <Accordion type="single" collapsible>
        {CourseMap?.map((chapter, index) => (
          <AccordionItem
            onClick={() => setSelectedIndex(index)}
            key={index}
            value={chapter?.courseData?.chapterName}
          >
            <AccordionTrigger
              className={`font-medium text-md ${
                completed?.includes(index) ? "text-green-500" : ""
              }`}
            >
              {completed?.includes(index) ? <CheckCircle /> : ""}
              {index + 1}. {chapter?.courseData.chapterName}
            </AccordionTrigger>
            <AccordionContent asChild>
              {chapter.courseData.topics.map((topic, index_) => (
                <div
                  key={index_}
                  className={` ${
                    completed?.includes(index)
                      ? "bg-green-500 text-white"
                      : "bg-white text-black"
                  }   my-2 p-2 rounded-md shadow-md`}
                >
                  <p>
                    {index_ + 1}. {topic?.topic}
                  </p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default ChapterListSidebar;
