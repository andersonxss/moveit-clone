import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountDownContextData {
  minutes: number;
  seconds: number;
  hashFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountDown: () => void;
}

export const CountDownContext = createContext({} as CountDownContextData);
interface CountDownProviderProps {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;
export function CountDownProvider({ children }: CountDownProviderProps) {
  const { starNewChallenge } = useContext(ChallengesContext);
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setisIsActive] = useState(false);
  const [hashFinished, setHashFinished] = useState(false);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setisIsActive(true);
  }

  function resetCountDown() {
    clearTimeout(countdownTimeout);
    setisIsActive(false);
    setTime(0.1 * 60);
    setHashFinished(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHashFinished(true);
      setisIsActive(false);
      starNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountDownContext.Provider
      value={{
        minutes,
        seconds,
        hashFinished,
        isActive,
        startCountdown,
        resetCountDown,
      }}
    >
      {children}
    </CountDownContext.Provider>
  );
}
