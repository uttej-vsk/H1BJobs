import React from "react";

function Hero() {
  return (
    <div className="mt-32">
      <div className="text-5xl font-bold text-center">
        <h1>
          H1B sponsored jobs, curated for{" "}
          <span className="text-white bg-blue-500 px-2 pb-2 rounded-md inline-flex items-center justify-center">
            you
          </span>
        </h1>
      </div>
      <div className="text-gray-500 font-medium mt-2 text-center text-xl">
        <p>Browse community-approved jobs that offer visa sponsorships!</p>
      </div>
    </div>
  );
}

export default Hero;
