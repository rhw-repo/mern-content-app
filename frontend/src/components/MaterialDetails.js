import { useMaterialsContext } from "../hooks/useMaterialsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const MaterialDetails = ({ material }) => {

    const { dispatch } = useMaterialsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch("api/materials/" + material._id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: "DELETE_MATERIAL", payload: json })
        }
    }

    return (
        <div className="material-details">
            <h4>{material.title}</h4>
            <p>{material.body}</p>
            <h5>Tags: <br />{material.tags}</h5>
            <p>{formatDistanceToNow(new Date(material.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
}

export default MaterialDetails;