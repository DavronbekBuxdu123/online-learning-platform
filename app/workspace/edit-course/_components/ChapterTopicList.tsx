import { Course } from "./CourseInfo";

function ChapterTopicList({ course }: { course: Course }) {
  const courseData = course?.courseJson?.course;
  

  return (
    <section className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold mb-16">Bo'limlar va Mavzular</h2>

      {courseData?.chapters?.map((chapter) => (
        <div key={chapter.chapterNumber} className="mb-32">
          {/* Chapter Card */}
          <div className="flex justify-center mb-16">
            <div className="bg-purple-600 text-white rounded-xl px-8 py-5 shadow-lg max-w-xl text-center">
              <p className="text-sm opacity-80">
                Chapter {chapter.chapterNumber}
              </p>
              <h3 className="text-xl font-semibold">{chapter.chapterName}</h3>
              <p className="text-sm opacity-90 mt-1">
                {chapter.chapterDescription}
              </p>
              <span className="text-xs opacity-80 mt-2 inline-block">
                Duration: {chapter.duration}
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 hidden md:block" />

            <div className="space-y-16">
              {chapter.topics.map((topic: string, index: number) => {
                const isRight = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`flex w-full ${
                      isRight ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="relative w-full md:w-1/2 px-4 md:px-8">
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 ${
                          isRight ? "md:-left-5 left-0" : "md:-right-5 right-0"
                        } w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-semibold`}
                      >
                        {index + 1}
                      </div>

                      <div className="bg-white dark:bg-[#091544] border rounded-lg p-5 shadow-sm ml-0 md:ml-auto">
                        <p className="text-gray-800 dark:text-white ml-4">
                          {topic}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ChapterTopicList;
