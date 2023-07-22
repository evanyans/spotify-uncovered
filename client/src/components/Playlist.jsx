import { getAlbumTracks, getArtistAlbums, getAllArtistAlbums } from "../spotifyapi"
import { useState, useEffect } from "react"
import { catchAsync } from "../utils"
import Loader from "./Loader"

export default function Playlist({data}) {
    const {artists, mood} = data

    const [dataStatus, setDataStatus] = useState('')
    const [allArtistAlbums, setAllArtistAlbums] = useState([])
    const [albumTracks, setAlbumTracks] = useState(null)

    
    useEffect(() => {
        const fetchData = async () => {
            const {data} = await getAllArtistAlbums(artists)
            setAllArtistAlbums(data)
        }
        catchAsync(fetchData(artists))
        
    }, [artists])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const {data} = await getAlbumTracks()
    //         setAlbumTracks(data)
    //     }
    //     catchAsync(fetchData())
    // }, [])

    return(
        <>
            {allArtistAlbums.length > 4 ?
            <h1>blimey</h1>
            :
            <Loader/>
        }
        </>
    )
}