import styled from "styled-components"
import { getUser } from "../spotifyapi"
import { catchAsync } from "../utils"
import { useEffect, useState } from "react"
import Loader from "./Loader"

export default function Profile() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getUser()
            setUser(data)
        }
        catchAsync(fetchData());
    }, [])
    return (
        <Wrapper>
            {user ? user.display_name : <Loader/>}
        </Wrapper>
    )
}

const Wrapper = styled.div`
`