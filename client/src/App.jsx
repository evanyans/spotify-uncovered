import Login from "./components/Login"
import Form from "./components/Form";
import { token } from "./spotifyapi";
import { useState, useEffect } from "react";

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
