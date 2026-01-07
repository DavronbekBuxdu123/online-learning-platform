import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#070B1A] text-white">
      <header className="flex  md:flex-row items-center justify-between px-6 md:px-10 py-6 border-b border-white/10 gap-4 md:gap-0 shadow-purple-500 shadow-sm">
        <Link href="/">
          <div className="flex items-center gap-2 text-lg font-semibold bg-[#070B1A] p-2 animate-pulse">
            <div className="flex items-center justify-center px-5 py-1 rounded-lg bg-linear-to-br from-[#7F00FF] via-[#E100FF] to-[#FF69B4] shadow-lg shadow-white/15">
              <span className="text-xl mr-3">📚</span>
              <span className="text-white font-medium tracking-wide text-lg">
                DavaCourse
              </span>
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex gap-6 text-md font-semibold text-white">
          <a href="/workspace">Kurslar yaratish</a>
          <a href="/workspace">Kurslarni o'rganish</a>
          <a href="/workspace">Obuna ta'riflari</a>
          <a href="/workspace">Profil</a>
        </nav>

        <div className="flex gap-4">
          <Link href="/workspace">
            <Button className="px-4 py-2 text-white rounded-lg cursor-pointer bg-linear-to-r from-[#7C5CFF] to-[#FF4FD8] text-sm font-medium">
              Bepul boshlash
            </Button>
          </Link>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 md:px-10 py-10 max-w-7xl mx-auto">
        <div className="py-6 md:py-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Sun’iy intellekt yordamida <br />
            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              online kurslar yarating va o‘rganing
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-white/60 max-w-lg sm:max-w-xl">
            Platforma sizga sun’iy intellekt yordamida avtomatik kurslar
            yaratish, ularni boshqarish va o‘rganish imkonini beradi. Barchasi
            bitta zamonaviy va qulay tizimda.
          </p>

          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-4">
            <Link href={`/workspace`}>
              <Button className="px-6 py-3 text-white rounded-xl bg-linear-to-r from-[#7C5CFF] to-[#FF4FD8] font-medium flex items-center gap-2">
                O'rganishni bepul boshlash →
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative ">
          <div className="rounded-2xl bg-[#0D132B] border border-white/10 shadow-2xl overflow-hidden ">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>

            <div className="text-[9px] md:text-[15px] shadow-sm ">
              <SyntaxHighlighter
                language="javascript"
                style={nightOwl}
                wrapLongLines={true}
                customStyle={{
                  maxHeight: "370px",
                  overflowY: "auto",
                  overflowX: "auto",
                  padding: "16px",
                  backgroundColor: "#0D132B",
                }}
              >
                {`import { useState, useEffect } from "react";
import axios from "axios";
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const fetchCourses = async () => {
    try {
      const res = await axios.get("/api/courses");
      setCourses(res.data);
    } catch (error) {
      console.error("Xato yuz berdi:", error);
    }
  };
useEffect(() => {
    fetchCourses();
  }, []);`}
              </SyntaxHighlighter>
            </div>

            <div className="m-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-green-400 text-sm">
              <b>✔ Ma'lumotlar muvaffaqiyatli olindi!</b>
              <p className="text-white/60 mt-1">
                Ushbu kod Axios yordamida API’dan kurslar ma'lumotlari olinadi.
                Xatolik yuz bersa, console orqali xabar beriladi.
              </p>
            </div>
          </div>

          <div className="absolute -inset-6 bg-blue-500/10 blur-3xl -z-10" />
        </div>
      </section>
    </main>
  );
}
