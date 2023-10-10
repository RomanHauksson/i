"use client";
import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabase";
import { ReactNode } from "react";
import { LandingPage } from "@/components/landingPage";

const UserContext = createContext({});

export const UserContextProvider = ({ children }: ReactNode) => {
  const [user, setUser] = useState(null);

  const onUserStateChange = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  useEffect(() => {
    onUserStateChange();
  }, []);

  return(
      <UserContext.Provider value={user}>
        {user ? children : <LandingPage />}
      </UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);