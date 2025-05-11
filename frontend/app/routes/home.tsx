import React from "react";
import { useNavigate } from "react-router";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#9300EE] to-[#DEDEDE] text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to ChatApp</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Connect with anonymous people and have interesting conversations. No
        sign-up required, just click the button below to start chatting!
      </p>
      <button
        className="bg-[#9300EE] hover:bg-[#7a00b3] text-white font-bold py-2 px-4 rounded transition duration-300"
        onClick={() => navigate("chat")}
      >
        Start Chat
      </button>
    </div>
  );
};

export default Home;
