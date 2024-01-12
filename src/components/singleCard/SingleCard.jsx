import React, { useState } from "react";
import { BsPin } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import "./singleCard.css";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { remove } from "../../store/AllnotesSlice";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../config/firebase";
import { updateNote } from "../../store/updateSlice";
import { dontAdd } from "../../store/addNotesSlice";
import { failure, success } from "../../store/errorSlice";

function SingleCard({
  title,
  tagline,
  background,
  pinned,
  desc,
  id,
  imageUrl,
  
}) {
  const [editBtn, setEditBtn] = useState(false);
  const handleHover = () => {
    setEditBtn(true);
  };
  const dispatch = useDispatch();
  const handleDelete = async (id, imageUrl) => {
    try {
      const notesRef = doc(db, "notes", id);
      const desertRef = ref(storage, imageUrl);
      await deleteDoc(notesRef);
      imageUrl !== "" && (await deleteObject(desertRef));
      dispatch(remove(id));
      dispatch(success("Note successfully removed"));
    } catch (e) {
      dispatch(failure("Note cannot be deleted"));
      
    }
  };

  const handleEdit= ( title,
    tagline,
    background,
    pinned,
    desc,
    id,
    imageUrl)=>{
      const initialNote={
        title,
        tagline,
        background,
        pinned,
        desc,
        id,
        imageUrl
      }
    dispatch(updateNote(initialNote))
    dispatch(dontAdd());
  }
  return (
    <div
      className="single-card"
      onMouseOver={handleHover}
      onMouseLeave={() => setEditBtn(false)}
      style={{ boxShadow: editBtn && "none", backgroundColor: background }}
    >
      {pinned && <BsPin className="bspin" />}
      <BiEditAlt
        className="edit-note"
        style={{ bottom: editBtn && "10px" }}
        onClick={()=>handleEdit( title,
          tagline,
          background,
          pinned,
          desc,
          id,
          imageUrl)}
      />
      <MdOutlineDeleteOutline
        className="delete-note"
        style={{ bottom: editBtn && "10px" }}
        onClick={() => handleDelete(id, imageUrl)}
      />
      {imageUrl && (
        <div className="single-image">
          <img src={imageUrl} alt="notes" />
        </div>
      )}
      <h3 >{title}</h3>
      <h4>{tagline}</h4>
      <p className="para">{desc}</p>
    </div>
  );
}

export default SingleCard;
