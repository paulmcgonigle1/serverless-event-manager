// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// const poolData = {
//   UserPoolId: "eu-west-1_29EN5Z0Ia",
//   ClientId: "3c65sj6c3ok6ug3nqsoloi2gn4",
// };

interface User {
  username: string;
  email: string;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  handleTokens: (tokens: any) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Add more auth functions (signUp, signOut, getSession) as needed

  useEffect(() => {
    // Attempt to retrieve and decode the token from local storage on component mount
    const tokensStr = localStorage.getItem("tokens");
    if (tokensStr) {
      const tokens = JSON.parse(tokensStr);
      if (tokens.id_token && typeof tokens.id_token === "string") {
        decodeAndSetUser(tokens.id_token);
      }
    }
  }, []);

  const decodeAndSetUser = (token: string) => {
    if (typeof token === "string" && token.trim() !== "") {
      const decoded = jwtDecode<{ "cognito:username": string; email: string }>(
        token
      );
      console.log("tokens decoded", decoded);

      setUser({
        username: decoded["cognito:username"],
        email: decoded.email,
      });
    } else {
      console.error("Invalid token specified: must be a string.");
    }
  };
  const signOut = () => {
    // Clear the authentication tokens from local storage
    localStorage.removeItem("tokens");
    console.log("signout user");
    // Reset the user state to null
    setUser(null);
  };

  const handleTokens = (tokens: any) => {
    console.log("tokens", tokens);
    if (tokens && tokens.id_token && typeof tokens.id_token === "string") {
      localStorage.setItem("tokens", JSON.stringify(tokens));
      decodeAndSetUser(tokens.id_token);
    } else {
      console.error(
        "Token handling error: ID token is missing or is not a string."
      );
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleTokens, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
