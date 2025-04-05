import UserProfileMain from "@/components/profile/studentProfile/UserProfileMain";
import PrivetRoute from "@/privetRoute/PrivetRoute";
import React from "react";

const ProfilePage = () => {
  return (
    <PrivetRoute>
      <UserProfileMain />
    </PrivetRoute>
  );
};

export default ProfilePage;
