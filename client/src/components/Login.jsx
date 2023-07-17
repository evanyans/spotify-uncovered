import Button from "./Button"

const AUTH_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:8888/login' : 'https://google.com'

export default function Login() {
    return (
      <>
        <Button link={AUTH_URL} text={"CONNECT WITH SPOTIFY"}/>
      </>
    )
  }
  
