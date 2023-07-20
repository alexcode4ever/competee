import React from "react";

export const RefineHackathon: React.FC = () => {
  return (
    <div className="banner flex-row justify-center align-center text-center relative px-2 py-3 bg-black border-black">
      <a
        className="gh-link"
        href="https://refine.dev/blog/refine-hackathon-2/"
        target="_blank"
        rel="noreferrer"
      >
        <div className="content relative text-white">
          <span className="wizard display-flex justify-center align-center background-color-rgb-255-255-255 color-rgb-13-13-13 border-radius-50">
            ⭐️⭐️ refine Open Source Hackathon ⭐️⭐️
          </span>
        </div>
      </a>
    </div>
  );
};
