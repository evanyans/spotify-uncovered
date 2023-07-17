import styled from "styled-components"

export default function Button ({link="https://google.com", text="Default"}) {
    return (
        <StyledButton href={link}>{text}</StyledButton>
    )
}

const StyledButton = styled.a`
    font-size:400;
    color:black;
`