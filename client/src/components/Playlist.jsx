import { getAllArtistAlbums, getAllTracks, getMultipleAudio, getAllAudio } from "../spotifyapi"
import { useState, useEffect } from "react"
import { catchAsync } from "../utils"
import Loader from "./Loader"

export default function Playlist({data}) {
    const {artists, mood} = data

    const [allArtistAlbums, setAllArtistAlbums] = useState([])
    const [allTracks, setAllTracks] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            const {res} = await getAllArtistAlbums(artists)
            setAllArtistAlbums(res.map(sub => sub.data.items).map(sub => sub.map(a => a.id)).flat()) //extracts only ids
        }
        catchAsync(fetchData())
    }, [artists])

    useEffect(() => {
        const fetchData = async () => {
            const {res} = await getAllTracks(allArtistAlbums)
            setAllTracks(res.map(sub => sub.data.items).map(sub => sub.map(t => t.id)).flat())
        }
        catchAsync(fetchData())
    }, [allArtistAlbums])

    useEffect(() => {
        const fetchData = async () => {
            const chunkSize = 100
            const dividedQuadrants = Array.from(
                { length: Math.ceil(allTracks.length / chunkSize) },
                (_, index) => allTracks.slice(index * chunkSize, (index + 1) * chunkSize)
              );
            
            const csv = dividedQuadrants[0].join(',')
            //console.log(dividedQuadrants[0].length)
            const {res} = await getMultipleAudio(csv)
            //console.log(res)

        }
        catchAsync(fetchData())
    }, [allTracks])
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const {res} = await getAllAudio(allTracks)
    //         //console.log(res)
    //     }
    //     catchAsync(fetchData())
    // }, [allTracks])




    return(
        <>
            {allArtistAlbums ?
            <h1>{console.log(allArtistAlbums)} {console.log(allTracks)}</h1>
            :
            <Loader/>
        }
        </>
    )
}