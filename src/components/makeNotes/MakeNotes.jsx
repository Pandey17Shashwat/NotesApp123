import React, { useEffect, useState } from "react";
import { BsPin, BsImage } from "react-icons/bs";
import { db, storage } from "../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import "./makeNotes.css";
import { add } from "../../store/AllnotesSlice";
import { TiTick } from "react-icons/ti";
import { err, failure, success } from "../../store/errorSlice";
import { dontAdd } from "../../store/addNotesSlice";

function MakeNotes() {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [desc, setDesc] = useState("");
  const [background, setBackground] = useState("rgb(193, 202, 207)");
  const [pinned, setPinned] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const notesRef = collection(db, "notes");
  const disPatch = useDispatch();
  const handlePin = () => {
    setPinned(!pinned);
  };
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const fileType = uploadedFile.type;
      if (fileType.startsWith("image/")) {
        setFile(uploadedFile);
      } else {
        disPatch(err("Only images are allowed!"));
      }
    }
  };
  const errorScheme=useSelector((state)=>state.error)
  const errorStatus=errorScheme.errorStatus;
  useEffect(() => {
    const uploadImage = () => {
      const name = new Date().getTime() + file.name;
      console.log(name)
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
          if(progress===100){
            disPatch(success("image uploaded"))
          }else{
            disPatch(err("image not yet uploaded"))
          }
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break
          }
        },
        (error) => {
          disPatch(failure("image can't be uploaded"))
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL)
          });
        }
      );
    };
    file && uploadImage();
  }, [file]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(title.trim()===""){
      disPatch(err("Notes should have a title!"));
    }else if(tagline.trim()===""){
      disPatch(err("Notes should have a tagline!"));
    }else if(desc.trim()===""){
      disPatch(err("Notes should have a description!"));
    }else if(file && imageUrl.trim()===""){
      disPatch(err("image not yet uploaded"))
    }else{
      const newNote = {
        title: title,
        tagline: tagline,
        desc: desc,
        background: background,
        pinned: pinned,
        imageUrl:imageUrl
      };
  
      try {
        const docRef = await addDoc(notesRef, {
          title: title,
          tagline: tagline,
          desc: desc,
          background: background,
          pinned: pinned,
          imageUrl:imageUrl
        });
        const noteWithId = { ...newNote, id: docRef.id };
        disPatch(add(noteWithId));
        setTitle("");
        setTagline("");
        setBackground("rgb(193, 202, 207)");
        setPinned(false);
        setDesc("");
        setImageUrl("");
        disPatch(dontAdd());
        disPatch(success("New Note added"))
      } catch (error) {
        disPatch(failure("Note was not added"))
        console.log(e);
      }
    }
    
  };
  return (
    <div className="newNote">
      <h3>Add a Note</h3>
      <BsPin className={pinned ? "pinned" : "pin"} onClick={handlePin} />
      <form className="main_form" onSubmit={handleSubmit}>
        <h4>Title</h4>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h4>Tagline</h4>
        <input
          type="text"
          placeholder="Tagline"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
        />
        <div className="back">
          <label htmlFor="image-upload">
            <div className="circle image-circle">
              <BsImage />
            </div>
          </label>
          <input
            type="file"
            onChange={handleFileUpload}
            id="image-upload"
            style={{ display: "none" }}
          />
          <div
            className="circle"
            style={{ backgroundColor: "rgb(193, 202, 207)" }}
            onClick={() => setBackground("rgb(193, 202, 207)")}
          >
            {background === "rgb(193, 202, 207)" && (
              <TiTick color="rgb(119, 124, 128)" />
            )}
          </div>
          <div
            className="circle"
            style={{ backgroundColor: "rgba(31, 139, 31,0.7)" }}
            onClick={() => setBackground("rgba(31, 139, 31,0.7)")}
          >
            {background === "rgba(31, 139, 31,0.7)" && (
              <TiTick color="rgba(19, 85, 19, 0.7)" />
            )}
          </div>
          <div
            className="circle"
            style={{ backgroundColor: "rgba(47, 3, 58, 0.6)" }}
            onClick={() => setBackground("rgba(47, 3, 58, 0.6)")}
          >
            {background === "rgba(47, 3, 58, 0.6)" && (
              <TiTick color="rgba(20, 3, 24, 0.6)" />
            )}
          </div>
          <div
            className="circle"
            style={{ backgroundColor: "rgba(107, 107, 7, 0.8)" }}
            onClick={() => setBackground("rgba(107, 107, 7, 0.8)")}
          >
            {background === "rgba(107, 107, 7, 0.8)" && (
              <TiTick color="rgba(36, 36, 5, 0.8)" />
            )}
          </div>
          <div
            className="circle"
            style={{ backgroundColor: "rgb(202, 72, 72)" }}
            onClick={() => setBackground("rgb(202, 72, 72)")}
          >
            {background === "rgb(202, 72, 72)" && (
              <TiTick color="rgb(53, 15, 15)" />
            )}
          </div>
        </div>
        <h4>Description</h4>
        <textarea
          className="desc"
          placeholder="Add a Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <button type="submit" className="submit">
          Submit
        </button> 
        
      </form>
    </div>
  );
}

export default MakeNotes;
