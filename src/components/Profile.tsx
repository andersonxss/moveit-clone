import { useState, useEffect, useContext } from "react";
import styles from "../styles/components/Profile.module.css";
import { ChallengesContext } from "../contexts/ChallengesContext";

export function Profile(props) {
  const { level, name, avatar } = useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img src={avatar} alt={name} />
      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
