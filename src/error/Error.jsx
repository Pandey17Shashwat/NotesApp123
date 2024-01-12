import React, { useEffect, useState } from 'react'
import {BiSolidError} from 'react-icons/bi'
import {RiInformationFill} from 'react-icons/ri'
import {MdDone} from 'react-icons/md'
import {RxCross1} from 'react-icons/rx'
import './error.css'
import { useDispatch, useSelector } from 'react-redux'
import { nothing } from '../store/errorSlice'
function Error() {
    const [alert,setAlert]=useState(false)
    const {errorStatus,errorMessage}=useSelector((state)=>state.error)
    const [show,setShow]=useState("");
    const dispatch=useDispatch();
    const mode=useSelector((state)=>state.mode)
    useEffect(()=>{
        if (errorStatus !== "") {
            setAlert(true);
            if(errorStatus==="success"){
                setShow("success");
            }
            if(errorStatus==="error"){
                setShow("error")
            }
            if(errorStatus==="failure"){
                setShow("failure")
            }
            const timeout = setTimeout(() => {
              setAlert(false);
              dispatch(nothing())
            }, 5000);
            return () => {
              clearTimeout(timeout);
            };
        }
    },[errorStatus,dispatch])
  return (
    <div className={alert?"error error3":"error"}>
        <div className='error-content'>
            {show==="failure" && <BiSolidError className='err'/>}
            {show==="error" && <RiInformationFill className='info'/>} 
            {show==="success" && <MdDone className='done'/>}
           <p>{errorMessage}</p> 
        </div>
        <RxCross1 className='crr' onClick={()=>setAlert(false)}/>
    </div>
  )
}

export default Error