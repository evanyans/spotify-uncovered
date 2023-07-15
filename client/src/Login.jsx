import Button from "./components/Button"

const AUTH_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:5173/login' : 'https://google.com'

export default function Login() {
  
    return (
      <>
        <Button link={AUTH_URL} text={"LOGIN WITH SPOTIFY"}/>
      </>
    )
  }
  
