"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserDetailContext } from "./context/UserDetailContext";
import { SelectedChapterContext } from "./context/SelectedChapterIndex";
import { UserDetail } from "@/types/types";

function Provider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded, isSignedIn } = useUser();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    CreateNewUser();
  }, [user, isSignedIn]);

  const CreateNewUser = async () => {
    try {
      const res = await axios.post("/api/user", {
        email: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
      });
      setUserDetail(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <SelectedChapterContext.Provider
        value={{ selectedIndex, setSelectedIndex }}
      >
        {children}
      </SelectedChapterContext.Provider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
