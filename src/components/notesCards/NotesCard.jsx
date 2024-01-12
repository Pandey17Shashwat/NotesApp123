import React, { useEffect, useState } from "react";
import SingleCard from "../singleCard/SingleCard";
import { useSelector, useDispatch } from "react-redux";
import "./notesCard.css";
import { fetchNotes } from "../../store/AllnotesSlice";
function NotesCard() {
  const { data: allnotes, status } = useSelector((state) => state.allNotes);
  const {currentpage,startindex,endIndex,endPage}=useSelector((state)=>state.page)

  const allnote = allnotes
    .slice(0)
    .reverse()
    .map((element) => {
      return element;
    });
  const disPatch = useDispatch();
  useEffect(() => {
    disPatch(fetchNotes());
  }, [disPatch]);
  const sortedNotes = [...allnote].sort((a, b) => {
    if (a.pinned && !b.pinned) {
      return -1;
    } else if (!a.pinned && b.pinned) {
      return 1;
    } else {
      return 0; 
    }
  });

  return (
    <div className="multi">
      {sortedNotes.slice(startindex,endIndex).map((item) => (
        <SingleCard
          background={item.background}
          desc={item.desc}
          pinned={item.pinned}
          tagline={item.tagline}
          title={item.title}
          imageUrl={item.imageUrl}
          id={item.id}
          key={item.id}
        />
      ))}
    </div>
  );
}

export default NotesCard;
