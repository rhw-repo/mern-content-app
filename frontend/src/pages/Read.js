// sets layout and injects specified user input (one article) into template using route parameters & useParams

// constant called _id is equal to built in react hook useParams
// allows access to _id of individual piece of content stored in database (uses _id for assigning ids)
// { _id } in template allows output into this component to test being passed

import { useState } from "react"
import { useParams } from "react-router-dom"

// custom hook useFetch created to make the API fetch, code could be refactored to be used also for Home.js
// returns data (individual article), isPending (true or false), error (if any, with message)

import useFetch from "../hooks/useFetch"
import Edit from "./Edit"

// data is called material consitency across app, evaluated in template if present, renders properties
// value name && - && evaluates anything left of it, if true, executes anything to right of it 
const Read = () => {
    const { _id } = useParams()
    const { data: material, error, isPending } = useFetch("/api/materials/" + _id);
    const [isEditing, setIsEditing] = useState(false)

   function handleUpdateClick() {
        setIsEditing(true)
    }

    return ( 
        <div>
            {isEditing ? (
                <Edit materialId={materialId} />
            ) : (


       <div className="read">
        <h3>Id is { _id }</h3>
        { isPending && <div>Loading...</div> }
        { error && <div>{ error }</div>}
        { material && (
            <article>
                <div className="read_title">{ material.title}</div>
                <div>{ material.body }</div>
                <div>{ material.tags }</div>
            </article>
        )} 
     <span className="update-btn"><button onClick={handleUpdateClick}>Update</button></span>
       </div>
            )}
       </div>
    );
}

export default Read;