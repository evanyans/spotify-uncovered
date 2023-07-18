import styled from "styled-components"

export default function Button ({button=false, func=()=>{}, link="https://google.com", text="Default" }) {
    return (
        <>
            {button ? 
            <StyledButton type="submit" onClick={func}>{text}</StyledButton>
            :
            <StyledAnchor href={link}>{text}</StyledAnchor>}
        </>
    )
}

const StyledButton = styled.button`

`

const StyledAnchor = styled.a`
    font-size:400;
    color:black;
`