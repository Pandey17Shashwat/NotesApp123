import React, { useEffect, useState } from "react";
import MakeNotes from "../makeNotes/MakeNotes";
import "./landing.css";
import NotesCard from "../notesCards/NotesCard";
import { useSelector } from "react-redux";
import Pagination from "../pagination/Pagination";
import EditNotes from "../editNotes/EditNotes";
import { useDispatch } from "react-redux";
import { dontAdd } from "../../store/addNotesSlice";
import { load } from "../../assets/images/images";


function Landing() {
  const isAdd = useSelector((state) => state.addNote);
  const update=useSelector((state)=>state.update);
  const {data ,status}=useSelector(state=>state.allNotes)
  const noteStatus=update.notesStatus;
  const dispatch=useDispatch();
  const [loader,setLoader]=useState(false);
  useEffect(()=>{
    console.log(status)
  },[])
  const [adding,setAdding]=useState(false);
  const mode=useSelector((state)=>state.mode)
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setAdding(true)
      }
    };
    if(adding){
      dispatch(dontAdd());
    }
    if(!adding){
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
   
  }, [dispatch,adding]);
 
  return (
    <div className={mode?"landing":"landing landing-dark"}>
      {isAdd && (
        <div className="make-notes">
          <MakeNotes />
        </div>
      )}
      {loader ? <div>
        <img src={load}/>
      </div> :( <div className={`note-card ${isAdd && "note-card-mobile"}`}>
        <NotesCard />
        <div className="page-indicator">
          <Pagination />
      </div>
      </div>)}
      {noteStatus &&<div className={"edit-Notes"}> 
        <EditNotes/>
        </div>
      }
    </div>
  );
}

export default Landing;
