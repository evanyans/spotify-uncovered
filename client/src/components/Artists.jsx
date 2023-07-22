import { useState, useEffect } from "react"
import { getTopArtists } from "../spotifyapi"
import { catchAsync } from "../utils"
import Loader from "./Loader"

export default function Artists({artists, updateFields}) {
    const [topArtists, setTopArtists] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await getTopArtists()
            setTopArtists(data)
        }
        catchAsync(fetchData())
    }, [])
    return (
        <>
        {topArtists ? 
        (topArtists.items.map(({id, external_urls, name, images}, i) => (
            <div id={id} onClick={() => updateFields(id)} key={i}>
                {name}
            </div>
        ))   
        )
        : 
        <Loader/>}
        </>
    )
}
