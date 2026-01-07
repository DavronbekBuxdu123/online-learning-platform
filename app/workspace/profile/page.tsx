import { UserProfile } from "@clerk/nextjs";

function Profile() {
  return (
    <div className=" flex flex-col mt-5 items-center justify-center">
      <h2 className="text-xl font-bold mb-5">Sizning profilingiz</h2>
      <UserProfile />
    </div>
  );
}

export default Profile;
