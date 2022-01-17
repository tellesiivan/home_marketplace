import { useEffect, useState, useRef } from "react";
import { auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

export default function useAuthStatus() {
  const isMounted = useRef(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // instally runs and checks if theres a user is logged in when reference from another file

  useEffect(() => {
    isMounted &&
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        }
        setLoading(false);
      });

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return { loading, loggedIn };
}
