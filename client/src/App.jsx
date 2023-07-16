import Login from "./components/Login"
import Profile from "./components/Profile";
import { token } from "./spotifyapi";
import { useState, useEffect } from "react";

function App() {

  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    setAccessToken(token);
  }, []);

  return (
    <>
      {accessToken ? <Profile/> : <Login/>}
    </>
  )
}

export default App
