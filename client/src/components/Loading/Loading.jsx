import React from "react";

const Loading = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-purple-600 border-t-4 border-t-red-600 rounded animate-spin"></div>
      </div>
    </>
  );
};

export default Loading;
