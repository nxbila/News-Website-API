import React from 'react';
import { useGlobalContext } from './context';


const Search = () => {
    //we are using data from custom hook.
    // const name = useGlobalContext();
    const {query, searchPost} = useGlobalContext();
      return(<>
      <form onSubmit = {(e) => e.preventDefault()}>
    <div>
    <input type = "text" placeholder='Search here' 
    value = {query}
    onChange = {(e) => searchPost(e.target.value)}/>
  </div>

</form> 
</>)
}
export default Search;