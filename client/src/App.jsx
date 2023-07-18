import Login from "./components/Login"
import { token } from "./spotifyapi";
import { useState, useEffect } from "react";

import Mood from "./components/Mood";
import Form from "./components/Form";

function App() {

  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    setAccessToken(token);
  }, []);

  return (
    <>
      {accessToken ? 
      <Form/>
      : 
      <Login/>}
    </>
  )
}

export default App
