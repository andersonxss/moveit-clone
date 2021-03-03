import { createContext, useState, ReactNode } from "react";
import { useRouter } from "next/router";

import Cookies from "js-cookie";
interface LoginContextData {
  statusForm: boolean;

  resetStatus: () => void;
  setLoginSession: (data) => void;
}

export const LoginContext = createContext({} as LoginContextData);

interface LoginProviderProps {
  children: ReactNode;
}

export function LoginProvider({ children }: LoginProviderProps) {
  const [statusForm, setStatusForm] = useState(false);
  const router = useRouter();
  async function setLoginSession(value) {
    const res = await fetch(`https://api.github.com/users/${value}`);
    const data = await res.json();

    if (res.status === 200) {
      Cookies.set("isLogin", String(true));
      Cookies.set("id", String(data.id));
      Cookies.set("avatar", String(data.avatar_url));
      Cookies.set("name", String(data.name));
      router.push("/");
    } else {
      setStatusForm(true);
    }
  }

  function resetStatus() {
    setStatusForm(false);
  }

  return (
    <LoginContext.Provider value={{ setLoginSession, statusForm, resetStatus }}>
      {children}
    </LoginContext.Provider>
  );
}
