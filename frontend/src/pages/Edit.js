///     TODO 
// analyse 
// debug line 28 navigate component is not working to navigate away
// remove test line showing id
// add a pop up to tell user changes are saved 
// add CSS rules to tidy up appearance 

import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Edit = ({ material, onUpdateComplete, navigate }) => {
  const [title, setTitle] = useState(material.title);
  const [body, setBody] = useState(material.body);
  const [tags, setTags] = useState(material.tags);
  const { user } = useAuthContext()

  useEffect(() => {
    setTitle(material.title);
    setBody(material.body);
    setTags(material.tags);
  }, [material]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMaterial = { title, body, tags };
    const response = await fetch(`/api/materials/${material._id}`, {
      method: "PATCH", // or PUT
      headers: 
      { "Content-Type": "application/json", 
      "Authorization": `Bearer ${user.token}`},
      body: JSON.stringify(updatedMaterial),
    });
    if (response.ok) {
      onUpdateComplete();
      navigate(`/materials/${material._id}`);
    }
  };

  return (
    <div className="edit">
      <h3>Edit Material</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Edit;
