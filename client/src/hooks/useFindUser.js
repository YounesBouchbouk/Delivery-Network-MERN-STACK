import { useState, useEffect } from "react";
import axios from "axios";

export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [isLoanding, setLoading] = useState(true);
  useEffect(() => {
    async function findUser() {
      try {
        let res = await axios.get("/user/getMe");
        if (res.data.user) {
          setUser(res.data.user);
          setLoading(false);
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setUser(null);
        setLoading(false);
      }
    }
    setLoading(true);
    findUser();
  }, []);

  const Logout = async () => {
    try {
      await axios.get("/authentication/users/signout");
      setUser(null);
      window.location = "/login";
    } catch (error) {
      console.log(error);
      setUser(null);
      window.location = "/login";
    }
  };

  return {
    user,
    setUser,
    isLoanding,
    Logout,
  };
}
