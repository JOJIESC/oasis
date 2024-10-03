import React from "react";

function BackButton() {
  return (
    <div className="flex">
      <button
        className="flex items-center gap-2 bg-gray-200 p-2 rounded-md"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <img className="w-7 h-auto" src="/icons/home.png" alt="go Home" />
        <p>Go home</p>
      </button>
    </div>
  );
}

export default BackButton;
