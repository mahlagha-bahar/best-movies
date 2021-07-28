import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { UserContext } from "../Context/UserContext";
export default function Auth() {
  const { setSessionId } = useContext(UserContext);

  const location = useLocation();
  const history = useHistory();
  const requestToken = new URLSearchParams(location.search).get(
    "request_token"
  );
  console.log("baba", requestToken);
  useEffect(() => {
    if (requestToken) {
      const url = `https://api.themoviedb.org/3/authentication/session/new?api_key=86ba05b5b5ef9e6cd98405fff0572996`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ request_token: requestToken }),
      })
        .then((r) => r.json())
        .then((data) => {
          setSessionId(data.session_id);
          console.log("hi", data, requestToken);
          history.replace("/");
        });
    }
  }, [requestToken]);
  return (
    <div>
      <h1>hiiihi</h1>
    </div>
  );
}
