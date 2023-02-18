import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

function Edit({ materialId }) {
    const [material, setMaterial] = useState("")
   

    useEffect(() => {
        useFetch("/api/materials/" + _id)
       //fetch(`/api/materials/${materialId}`)
            .then(response => response.json())
            .then(material => setMaterial(material.title))
            .then(material => setMaterial(material.body))
            .catch(error => console.error(error))
    }, [materialId])

    function handleContentChange(event) {
        setMaterial(event.target.value)
    }

    function handleSaveClick() {
        fetch(`api/materials/$d{materialId}`, {
            method: "PUT",
            headers: {
                "Content type": "application/json"
            },
            body: JSON.stringify({
                content: material
            })
        })
            .then(response => response.json())
            .then(material => {
                console.log("Document saved", material)
                // Add code to indicate success to the user 
            })
            .catch(error => console.error(error))
    }
return (
    <div>
        <h1>Edit Page</h1>
        <textarea value={material} onChange={handleContentChange} />
        <button onClick={handleSaveClick}>Save</button>
        </div>
)
}
export default Edit;