import { getAllArtistAlbums, getAllTracks, getMultipleAudio, getAllAudio, getAllMultipleAudio } from "../spotifyapi"
import { useState, useEffect } from "react"
import { catchAsync, shuffle } from "../utils"
import Loader from "./Loader"

export default function Playlist({data}) {
    const {artists, mood} = data
    /*

    Happy
    valence > 0.7

    Sad
    valence < 0.3

    Dance
    danceability > 0.7

    Energetic
    energy > 0.7

    Chill
    tempo < 90 bpm
    energy < 0.3

    */
   const moodFilter = (mood, data) => {
        if (mood === "happy") {
            return data.valence > 0.7
        }
        else if (mood === "sad") {
            return data.valence < 0.3
        }
        else if (mood === "dance") {
            return data.danceability > 0.7
        }
        else if (mood === "energetic") {
            return data.energy > 0.7
        }
        else if (mood === "chill") {
            return data.tempo < 90 && energy < 0.5
        }

   }

    const [allArtistAlbums, setAllArtistAlbums] = useState([])
    const [allTracks, setAllTracks] = useState([])
    const [allData, setAllData] = useState([])
    const [playlist, setPlaylist] = useState([])
    
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

            const {res} = await getAllMultipleAudio(dividedQuadrants)
            console.log(res.map(sub => sub.data.audio_features).flat())
            setAllData(res.map(sub => sub.data.audio_features).flat())
        }
        catchAsync(fetchData())
    }, [allTracks])

    useEffect(() => {
        const parseData = async () => {
            shuffle(allData) //randomize tracks
            const result = allData.filter(data => moodFilter(mood, data))
            shuffle(result)
            setPlaylist(result.slice(0, 20))
        }
        catchAsync(parseData())
    }, [allData, mood])




    return(
        <>
            {playlist ?
            <h1>{console.log(playlist)}</h1>
            :
            <Loader/>
        }
        </>
    )
}