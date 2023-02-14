// sets layout and injects individual article into template using route parameters & useParams

// constant called _id is equal to built in react hook useParams
// allows access to _id of individual piece of content stored in database (uses _id for assigning ids)
// { _id } in template allows output into this component to test being passed

import { useParams } from "react-router-dom"

// custom hook useFetch created to make the API fetch, code could be refactored to be used also for Home.js
// returns data (individual article), isPending (true or false), error (if any, with message)

import useFetch from "../hooks/useFetch"

// data is called material consitency across app, evaluated in template if present, renders properties
// value name && - && evaluates anything left of it, if true, executes anything to right of it 
const Read = () => {
    const { _id } = useParams()
    const { data: material, error, isPending } = useFetch("/api/materials/" + _id);

    return ( 
       <div className="read">
        <h2>Content Detail - { _id }</h2>
        { isPending && <div>Loading...</div> }
        { error && <div>{ error }</div>}
        { material && (
            <article>
                <h2>{ material.title}</h2>
                <div>{ material.body }</div>
            </article>
        )} 
       </div>
    );
}
 
export default Read;