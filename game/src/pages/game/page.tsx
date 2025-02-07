import React, { useEffect } from "react";
import { initGame, destroyGame } from "./index";

const GamePage = () => {
  useEffect(() => {
    initGame(); // Initialize game when component mounts

    return () => {
      destroyGame(); // Cleanup when component unmounts
    };
  }, []);

  return (
    <div id="gameContainer">{/* Canvas will be created by LittleJS */}</div>
  );
};

export default GamePage;
