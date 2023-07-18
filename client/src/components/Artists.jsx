import { useState, useEffect } from "react"
import { getTopArtists } from "../spotifyapi"
import { catchAsync } from "../utils"
import Loader from "./Loader"

export default function Artists({artists, updateFields}) {
    const [topArtists, setTopArtists] = useState(null)
    const [selectedArtists, setSelectedArtists] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await getTopArtists()
            setTopArtists(data)
        }
        catchAsync(fetchData())
    }, [])


    const toggleSelectedArtist = (id) => {
        if (selectedArtists.includes(id)) {
            setSelectedArtists(selectedArtists.filter(a => a !== id))
            return 
        }
        if (selectedArtists.length > 4) return
        setSelectedArtists([...selectedArtists, id])
    }
    return (
        <>
        {topArtists ? 
        (topArtists.items.map(({id, external_urls, name, images}, i) => (
            <div onClick={() => toggleSelectedArtist(id)} key={i}>
                {name}
            </div>
        ))   
        )
        : 
        <Loader/>}
        </>
    )
}

    // const [user, setUser] = useState(null)

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const { data } = await getUser()
    //         setUser(data)
    //     }
    //     catchAsync(fetchData());
    // }, [])
