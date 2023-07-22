import Button from "./Button"
import { useMultiform } from "../hooks/useMultiform"
import { useState } from "react"

import Mood from "./Mood"
import Artists from "./Artists"
import Playlist from "./Playlist"

export default function Form() {
    const [data, setData] = useState({
        mood: "",
        artists: [],
    })

    const [completedForm, setCompletedForm] = useState('')
    const updateFields = (fields) => {
        setData(prev => {
            return {...prev, ...fields}
        })
    }

    const updateArtist = (id) => {
        if (data.artists && data.artists.includes(id)) {
            const fields = {artists : data.artists.filter(a => a !== id)}
            setData(prev => {
                return {...prev, ...fields}
            })
            return
        }
        if (data.artists.length > 4) return
        const fields = {artists: [...data.artists, id]}
        setData(prev => {
            return {...prev, ...fields}
        })

    }

    const { step, steps, currentStepIndex, next} = useMultiform(
        [<Mood {...data} updateFields={updateFields}/>, <Artists {...data} updateFields={updateArtist} />])

    function onSubmit(e) {
        e.preventDefault()
        if (currentStepIndex !== 1) return next()
        if (data.artists.length > 4) {
            setCompletedForm(true)
        }
    }
    return(
        <>
        { completedForm ?
        <Playlist data={data}/>
        :
        <form onSubmit={onSubmit}>
            <div>{currentStepIndex + 1}</div>
            {step}
            {currentStepIndex === 0 && <Button button={true} text={"select this mood"}/>}
            {currentStepIndex === 1 && <Button button={true} text={data.artists.length > 4 ? "generate playlist": "select 5 artists"}/>}
        </form>
        
        }
        </>
    )
}