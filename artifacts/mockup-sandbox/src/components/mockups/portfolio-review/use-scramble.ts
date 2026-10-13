import { useState, useEffect, useRef } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#@$%ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function useScramble(finalText: string, startDelay = 200, frameDuration = 28) {
  const [display, setDisplay] = useState(finalText);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    let iteration = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const scramble = () => {
      setDisplay(
        finalText
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < Math.floor(iteration)) return finalText[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration += finalText.replace(/ /g, "").length / 20;
      if (iteration < finalText.length) {
        frameRef.current = setTimeout(scramble, frameDuration) as unknown as number;
      } else {
        setDisplay(finalText);
      }
    };

    timeoutId = setTimeout(() => scramble(), startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(frameRef.current);
    };
  }, [finalText, startDelay, frameDuration]);

  return display;
}
