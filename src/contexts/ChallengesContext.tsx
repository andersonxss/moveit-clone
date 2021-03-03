import { createContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

interface Challenge {
  type: "body";
  eye;
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  name: string;
  isLogin: boolean;
  avatar: string;
  activeChallege: Challenge;
  levelUp: () => void;
  starNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
  logout: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  name: string;
  avatar: string;
  isLogin: boolean;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [name, setName] = useState(rest.name);
  const [avatar, setAvatar] = useState(rest.avatar);
  const [isLogin, setIsLogin] = useState(rest.isLogin);
  const router = useRouter();
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallege, SetActiveChallege] = useState(null);
  const [isLevelUpModalOpen, SetIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    SetIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    SetIsLevelUpModalOpen(false);
  }

  function starNewChallenge() {
    const radomChallenfeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[radomChallenfeIndex];
    SetActiveChallege(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio", {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
  }

  function resetChallenge() {
    SetActiveChallege(null);
  }

  function completeChallenge() {
    if (!activeChallege) {
      return;
    }
    const { amount } = activeChallege;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    SetActiveChallege(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  function logout() {
    Cookies.remove("isLogin");
    Cookies.set("isLogin", String(false));
    router.replace("/");
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        avatar,
        name,
        isLogin,
        currentExperience,
        challengesCompleted,
        levelUp,
        starNewChallenge,
        activeChallege,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModal,
        logout,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
