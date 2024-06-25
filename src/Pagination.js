import React from 'react';
import { useGlobalContext } from './context';

const Pagination = () => {
  const {page, nbPages, getPrevPage, getNextPage} = useGlobalContext();
  return(
   <>
   <div className='pagination_btn'>
    <button onClick = {() => getPrevPage()}>Previous</button>
    <p>{page + 1} of {nbPages}</p>
    <button onClick={() => getNextPage()}>Next</button>
   </div>
   </>
  )
}
export default Pagination;