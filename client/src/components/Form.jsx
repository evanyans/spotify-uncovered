import Button from "./Button"
import { useMultiform } from "../hooks/useMultiform"
import { useState } from "react"

import Mood from "./Mood"
import Artists from "./Artists"

const INITIAL_DATA = {
    mood: "",
    artists: [""],
}

export default function Form() {
    const [data, setData] = useState(INITIAL_DATA)
    const updateFields = (fields) => {
        setData(prev => {
            return {...prev, ...fields}
        })
    }

    const { step, steps, currentStepIndex, back, next} = useMultiform(
        [<Mood {...data} updateFields={updateFields}/>, <Artists {...data} updateFields={updateFields} />])

    function onSubmit(e) {
        e.preventDefault()
        if (currentStepIndex !== 1) return next()
        alert('success') //send data
    }
    return(
        <form onSubmit={onSubmit}>
            <div>{currentStepIndex + 1}</div>
            {step}
            {currentStepIndex === 0 && <Button button={true} text={"select this mood"}/>}
            {currentStepIndex === 1 && <Button button={true} text={"select 5 artists"}/>}
        </form>
    )
}