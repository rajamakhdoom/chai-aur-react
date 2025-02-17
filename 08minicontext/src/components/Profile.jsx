import React, { useContext } from "react";
import UserContext from "../context/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) return <div>Not logged in</div>;
  return <div>Welcome, {user}!</div>;
};

export default Profile;
