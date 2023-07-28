import Button from "./Button"
import styled from "styled-components"
import { SubTitle, Title } from "./styles"
import Vinyl from "./Vinyl"
import SpotifyLogo from "./SpotifyLogo"

const AUTH_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:8888/login' : 'https://google.com'

export default function Login() {
    return (
      <Wrapper>
        <SpotifyLogo/>
        <Title>SPOTIFY UNCOVERED</Title>
        <SubTitle>GENERATE A SPOTIFY PLAYLIST BASED ON YOUR CURRENT MOOD AND TASTE</SubTitle>
        <Vinyl/>
        <Button link={AUTH_URL} text={"CONNECT WITH SPOTIFY"} color={"#F97C7C"}/>
      </Wrapper>
    )
  }

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;

  margin-left:0.5em;
  margin-right:0.5em;
`

  
