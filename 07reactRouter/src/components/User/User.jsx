import React from "react";
import { useParams } from "react-router-dom";
function User() {
  const { userid } = useParams();
  return (
    <div className="p-10 bg-orange-700 rounded-xl m-5 text-white text-3xl">
      User: {userid}
    </div>
  );
}

export default User;
