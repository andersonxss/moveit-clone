import Link from "next/link";
import { useContext } from "react";
import styles from "../styles/components/SideBar.module.css";
import { ChallengesContext } from "../contexts/ChallengesContext";

export function SideBar() {
  const { logout } = useContext(ChallengesContext);

  return (
    <div className={styles.sideBar}>
      <header>
        <img src="/icons/logo.svg" alt="Logo" />
      </header>
      <main>
        <ul>
          <li>
            <Link href="/">
              <a>
                <img src="/icons/home.svg" alt="" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/ranking">
              <a>
                <img src="/icons/award.svg" alt="" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/login" passHref>
              <a onClick={logout}>
                <img src="/icons/exit.svg" alt="" />
              </a>
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
