import { useState, useEffect } from "react";
import { getRandomTip } from "../constants/devTips";

export const useDevTips = (interval = 6000) => {
  const [currentTip, setCurrentTip] = useState("");

  useEffect(() => {
    setCurrentTip(getRandomTip());
    const tipInterval = setInterval(() => {
      setCurrentTip(getRandomTip());
    }, interval);

    return () => clearInterval(tipInterval);
  }, [interval]);

  return currentTip;
};
