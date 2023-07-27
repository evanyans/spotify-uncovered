import Button from "./Button"
import styled from "styled-components"
import { Title } from "./styles"

const AUTH_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:8888/login' : 'https://google.com'

export default function Login() {
    return (
      <Wrapper>
        <Title>SPOTIFY UNCOVERED</Title>
        <Button link={AUTH_URL} text={"CONNECT WITH SPOTIFY"}/>
      </Wrapper>
    )
  }

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
`

  
