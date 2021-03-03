import styles from "../styles/components/Login.module.css";
import { FormLogin } from "../components/FormLogin";
import { LoginProvider } from "../contexts/LoginContext";

export default function Ranking() {
  return (
    <LoginProvider>
      <div className={styles.containerLogin}>
        <div>
          <header>
            <img src="/moveit.svg" alt="" />
          </header>
          <strong>Bem-vindo</strong>
          <p>
            <img src="/icons/Github.svg" alt="Github" />
            <span>Faça login com seu Github para começar</span>
          </p>
          <FormLogin />
        </div>
      </div>
    </LoginProvider>
  );
}
