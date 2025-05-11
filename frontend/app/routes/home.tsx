import React, { useState } from "react";
import { useNavigate } from "react-router";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setErrorMessage("Please enter a username."); // Set error message if input is empty
      return;
    }
    setErrorMessage(""); // Clear error message if input is valid
    localStorage.setItem("username", username); // Store username in localStorage
    navigate("/chat", { state: { username } }); // Navigate to chat page with username
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#9300EE] to-[#DEDEDE] text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to Free Chat !</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Connect with anonymous people and have interesting conversations. No
        sign-up required, just click the button below to start chatting!
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center" // Added class for styling
      >
        <input
          type="text"
          placeholder="Enter your username"
          className="mb-4 p-2 rounded border border-gray-300 outline-0" // Styled input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p> // Error message
        )}
        <button
          type="submit"
          className="bg-[#9300EE] hover:bg-[#7a00b3] text-white font-bold py-2 px-4 rounded transition duration-300" // Styled button
        >
          Chat now !
        </button>
      </form>
    </div>
  );
};

export default Home;
