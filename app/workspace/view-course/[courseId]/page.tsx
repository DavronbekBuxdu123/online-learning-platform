import CourseEdit from "../../edit-course/[courseId]/page";

function ViewCourse() {
  return (
    <div>
      <CourseEdit CourseView={true} />
    </div>
  );
}

export default ViewCourse;
