import './pagination.css'
import {useSelector,useDispatch} from 'react-redux'
import { next, prev, total } from '../../store/paginationSlice';
import { useEffect } from 'react';

function Pagination() {
    const {data : allnotes,status}=useSelector(state=>state.allNotes)
    const pageData=useSelector((state)=>state.page)
    const disPatch=useDispatch();
    useEffect(()=>{
        disPatch(total(Math.ceil(allnotes.length/6)));        
    },[allnotes,disPatch])
    const isPage=pageData.endpage;
    return(
       isPage ?(
        <div className='page-btn'>
            <button onClick={()=>disPatch(prev())} className={pageData.currentpage===1 && "prev"}>Prev</button>
            <button onClick={()=>disPatch(next())} className={(pageData.currentpage===pageData.endpage ) && "prev"}>Next</button>
        </div>
       ):<div>No Notes Yet</div>
    )

}

export default Pagination