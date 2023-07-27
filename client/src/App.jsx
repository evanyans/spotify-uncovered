import Login from "./components/Login"
import { token } from "./spotifyapi";
import { useState, useEffect } from "react";

import styled from "styled-components"
import Form from "./components/Form";
import {createGlobalStyle} from "styled-components"

function App() {

  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    setAccessToken(token);
  }, []);

  return (
    <>
    <GlobalStyle/>
    <Wrapper>
        {accessToken ? 
        <Form/>
        : 
        <Login/>}
    </Wrapper>
    </>
  )
}

export default App

const GlobalStyle = createGlobalStyle`
  p{
    font-family: 'VT323', monospace;
  }

  h1{
    font-family: 'Syne', sans-serif;
  }
`

const Wrapper = styled.div`
  max-width:87em;
  margin-left:auto;
  margin-right:auto;
`