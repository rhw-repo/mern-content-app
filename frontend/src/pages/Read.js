// TODO: fetch individual article after <h2>

import { useParams } from "react-router-dom"



// constant named id is equal to built in react hook useParams
// allows access to id of individual piece of content stored in database
// placing within template allows output into this component 
const Read = () => {
    const { _id } = useParams()

    return ( 
        <div className="read">
            <h2>Content Details - { _id }</h2>
        </div>
     );
}
 
export default Read