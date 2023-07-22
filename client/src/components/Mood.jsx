export default function Mood({mood, updateFields}) {
    return (
        <>
            <select name="selectedMood" size="5" onChange={e => updateFields({mood: e.target.value})}>
                <option value="happy">Happy</option>
                <option value="sad" >Sad</option>
                <option value="dance">Dance</option>
                <option value="energetic" >Energetic</option>
                <option value="chill">Chill</option>
            </select>
        </>
    )
}


