import React from "react";

const MyChallengesHeader = ({ user }) => {
  return (
    <div className="py-8">
      <h2 className="font-semibold text-3xl text-gray-900">My Challenges</h2>
      <p className="mt-2 text-gray-600">
        Welcome back,{" "}
        <strong className="text-green-600">
          {user.displayName || user.email}
        </strong>
        ! Here's a look at your progress.
      </p>
    </div>
  );
};

export default MyChallengesHeader;