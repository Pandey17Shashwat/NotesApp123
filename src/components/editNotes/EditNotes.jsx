import React, { useEffect, useState } from "react";
import "./editnotes.css";
import { BsPin, BsImage } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { db, storage } from "../../config/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import { falseNotes } from "../../store/updateSlice";
import { updateItem } from "../../store/AllnotesSlice";
import { err, failure, success } from "../../store/errorSlice";

function EditNotes() {
  const { notesStatus, initialNote } = useSelector((state) => state.update);

  const [title, setTitle] = useState(initialNote.title);
  const [tagline, setTagline] = useState(initialNote.tagline);
  const [desc, setDesc] = useState(initialNote.desc);
  const [background, setBackground] = useState(initialNote.background);
  const [pinned, setPinned] = useState(initialNote.pinned);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(initialNote.imageUrl);
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

  useEffect(() => {
    const uploadImage = async () => {
      const desertRef = ref(storage, imageUrl);
      imageUrl !== "" && (await deleteObject(desertRef));
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress < 100) {
            disPatch(err("Image Not yet uploaded"));
          } else {
            disPatch(success("image successfully uploaded"));
          }
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
            default:
              break;
          }
        },
        (error) => {
          disPatch(failure("image can't be uploaded!"));
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
          });
        }
      );
    };
    file && uploadImage();
  }, [file]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      disPatch(err("Notes should have a title!"));
    } else if (tagline.trim() === "") {
      disPatch(err("Note should have a tagline!"));
    } else if (desc.trim() === "") {
      disPatch(err("Note should have a description!"));
    } else if (file && imageUrl === "") {
      disPatch(err("Image Not yet uploaded Please wait!"));
    } else {
      try {
        const id = initialNote.id;
        const notesRef = doc(db, "notes", id);
        await updateDoc(notesRef, {
          title: title,
          tagline: tagline,
          background: background,
          pinned: pinned,
          imageUrl: imageUrl,
          desc: desc,
        });
        disPatch(
          updateItem({
            id: initialNote.id,
            title,
            tagline,
            desc,
            background,
            pinned,
            imageUrl,
          })
        );
        disPatch(falseNotes());
        disPatch(success("Notes updated successfully"));
      } catch (e) {
        disPatch(failure("Notes could not be updated"))
      }
    }
  };
  return (
    <div className="update-note-main">
      <RxCross1 className="cross" onClick={() => disPatch(falseNotes())} />
      <div className="newNote">
        <h3>Update a Note</h3>
        <BsPin
          className={pinned ? "pinned left" : "pin left"}
          onClick={handlePin}
        />
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
    </div>
  );
}

export default EditNotes;
