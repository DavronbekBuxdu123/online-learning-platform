export type UserDetail = {
  email: string;
  name: string;
};
export type User = {
  id: number;
  name: string;
  email: string;
};

export type Chapter = {
  chapterDescription: string;
  chapterName: string;
  chapterNumber: number;
  duration: number;
};

export type CourseJsonCourse = {
  bannerImagePrompt: string;
  category: string;
  chapters: Chapter[];
  description: string;
  includeVideo: boolean;
  level: string;
  name: string;
  noOfChapters: number;
};

export type CourseJson = {
  course: CourseJsonCourse;
};

export type Course = {
  id: number;
  cid: string;
  name: string;
  description: string;
  chapters: number;
  video: boolean;
  level: string;
  category: string;
  courseJson: CourseJson;
  userEmail: string;
  bannerImage: string;
  courseContent: Record<string, any>;
};

export type Enroll = {
  id: number;
  cid: string;
  userEmail: string;
  course: Course[];
  completedChapters: Record<string, any>;
  enrolls: [];
};
