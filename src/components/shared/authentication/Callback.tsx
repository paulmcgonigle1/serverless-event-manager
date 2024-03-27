import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useAuth } from "../../../context/AuthContext";

const Callback = () => {
  const { handleTokens } = useAuth(); // Use handleTokens from AuthProvider
  const [tokensHandled, setTokensHandled] = useState(false);

  useEffect(() => {
    // Assuming you're using the "code" flow
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code && !tokensHandled) {
      // Step 2: Exchange the code for tokens
      fetch(
        "https://globaleventmanager.auth.eu-west-1.amazoncognito.com/oauth2/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: "3c65sj6c3ok6ug3nqsoloi2gn4",
            redirect_uri: "http://localhost:3000/callback",
            code: code,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          handleTokens(data);
          setTokensHandled(true);
        })
        .catch((error) =>
          console.error("Error exchanging code for tokens:", error)
        );
    }
  }, [tokensHandled]);

  return <div>Redirecting...</div>;
};

export default Callback;
