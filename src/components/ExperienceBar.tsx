import { useState, useEffect, useContext } from "react";
import styles from "../styles/components/ExperienceBar.module.css";
import { ChallengesContext } from "../contexts/ChallengesContext";

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(
    ChallengesContext
  );

  const percenteToNextLevel =
    Math.round(currentExperience * 100) / experienceToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percenteToNextLevel}%` }} />
        <span
          className={styles.currentExperience}
          style={{ left: `${percenteToNextLevel}%` }}
        >
          {currentExperience} px
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}
