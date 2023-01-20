import { useState } from "react";
import { useMaterialsContext } from "../hooks/useMaterialsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const CreateNew = () => {
    const { dispatch } = useMaterialsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError("You must be logged in")
            return
        }

        const material = { title, body, tags }

        const response = await fetch("/api/materials", {
            method: "POST",
            body: JSON.stringify(material),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        })


        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle("")
            setBody("")
            setTags("")
            setError(null)
            setEmptyFields([])
            console.log('new material added', json)
            dispatch({ type: "CREATE_MATERIAL", payload: json })
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3><strong>Add A New Piece Of Content Here:</strong></h3>
            <label><strong>Title:</strong></label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title") ? "error" : ""}
            />
            <label><strong>Paste content here:</strong></label>
            <textarea
                type="text"
                onChange={(e) => setBody(e.target.value)}
                value={body}
                className={emptyFields.includes("body") ? "error" : ""}
            />
            <label><strong>Paste or type tags here:</strong></label>
            <input
                type="text"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
                className={emptyFields.includes("tags") ? "error" : ""}
            />

            <button>Add New Content</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default CreateNew;