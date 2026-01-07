import CourseList from "./_components/CourseList";

import WelcomeBanner from "./_components/WelcomeBanner";

function WorkSpace() {
  return (
    <div className="p-10">
      <WelcomeBanner />

      <CourseList />
    </div>
  );
}

export default WorkSpace;
