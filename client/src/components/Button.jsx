import styled from "styled-components"

export default function Button ({button=false, func=()=>{}, link="https://google.com", text="Default", color="white" }) {
    return (
        <>
            {button ? 
            <StyledButton type="submit" onClick={func} style={{color: color}}>{text}</StyledButton>
            :
            <StyledAnchor href={link} style={{color: color}}>{text}</StyledAnchor>}
        </>
    )
}

const StyledButton = styled.button`

`

const StyledAnchor = styled.a`
    font-size: 2em;
    font-family: 'VT323', monospace;
    text-decoration:none;
    background-color:black;
    padding: 0.3em 1em;
    border-radius: 0.3em;
    text-align:center;
`