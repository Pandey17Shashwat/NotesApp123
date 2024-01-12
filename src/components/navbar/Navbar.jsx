import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import "./navbar.css";
import { useDispatch,useSelector  } from 'react-redux';
import { changeMode } from "../../store/modeSlice";
import { changeNote } from "../../store/addNotesSlice";
import { darkimage, lightimage } from "../../assets/images/images";
import { falseNotes } from "../../store/updateSlice";


function Navbar() {
  const dispatch = useDispatch();
  const handleModes=()=>{
    dispatch(changeMode())
  }
  const mode=useSelector((state)=> state.mode)
  const addNote=useSelector((state)=>state.addNote)
  const handleAddNote=()=>{
    dispatch(changeNote());
    dispatch(falseNotes());
  }
  const [add,setAdd]=useState("");
  useEffect(()=>{
    addNote?setAdd("Show"):setAdd("Add");
  },[addNote])

  return (
    <div className={mode ?"navbar":"navbar navbar-dark"}>
      <div className="add" onClick={handleAddNote}>
        <BiPlus className="plus" />
        {add} Notes
      </div>
      <p className="snap">SnapNote</p>
      <div className="modes">
        <div  onClick={handleModes}>
          <img src={lightimage} alt="light"/>
          <div className="mode-main" style={{left:mode?"5px":"40px"}}></div>
          <img src={darkimage} className="dark" alt="dark"/>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
