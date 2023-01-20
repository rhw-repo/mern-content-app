import { useMaterialsContext } from "../hooks/useMaterialsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react";

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

        //const singleMaterial = [single, setSingle] = useState("_id");

   // TODO:function passing single material as prop + material.id ?
   // each material is an entry in database with a unique id but would mean request to server 
   // could use keyword this?
   // could use Link to another page that renders the properties but then id issue 
    const handleButton = () => {
          console.log("button clicked");
            return (
            <div className="read-view">
            <h4>{this.material.title}</h4>
            <p>{this. material.body}</p>  
            </div>
        )
    }
    

    return (
        <div className="material-details">
            <h4>{material.title}</h4>
            <p>{material.body}</p>
            <h5>Tags: <br />{material.tags}</h5>
            <p>{formatDistanceToNow(new Date(material.createdAt), { addSuffix: true })}</p>
            <button onClick={handleButton}>View</button>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
}

export default MaterialDetails;