import styles from "../styles/components/Login.module.css";
import { useState, useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
export function FormLogin() {
  const [form, setForm] = useState("");

  const { setLoginSession, statusForm, resetStatus } = useContext(LoginContext);
  function onSubmit() {
    setLoginSession(form);
  }

  function onChangeForm(e) {
    setForm(e.target.value);
    resetStatus();
  }

  return (
    <form>
      <div className={styles.input}>
        <input
          type="text"
          name="setForm"
          onChange={onChangeForm}
          placeholder="Digite ser username"
        />
        <button type="button" onClick={onSubmit}>
          <img src="/icons/Vector.png" alt="Vetor" />
        </button>
      </div>
      <p>{statusForm && <span>Usuário não encontrado.</span>}</p>
    </form>
  );
}
