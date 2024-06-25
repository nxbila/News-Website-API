import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';

let API = "https://hn.algolia.com/api/v1/search?";

const initialState = {
    isLoading: true,
    query: "HTML",
    nbPages: 0,
    page: 0, 
    hits: []
}
//Context creation
const AppContext = React.createContext();

//Provider
const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const fetchAPIdata = async(url) => {
        dispatch({type:"SET_LOADING"})
        try{
            const res = await fetch(url);
            const data = await res.json();
            //isLoading = false;
            console.log(data);
            dispatch({
                type: "GET_STORIES",
                payload: {
                    hits: data.hits,
                    nbPages: data.nbPages,
                }
            })
        }
        catch(error){
            console.log(error);
        }
    };
    //to search a post
    const searchPost = (searchQuery) => {
        dispatch({type : "SEARCH_QUERY", payload : searchQuery})
    }
        //to remove the post
    const removePost = (post_ID) => {
        dispatch({type: "REMOVE_POST", payload: post_ID});
    }
    //pagination
    const getNextPage = () => {
        dispatch({
            type: "NEXT_PAGE",
        })
    }
    const getPrevPage = () => {
        dispatch({
            type: "PREV_PAGE",
        })
    }


    useEffect(() => {
        fetchAPIdata(`${API}query=${state.query}&page=${state.page}`);
    },[state.query, state.page]);
    return <AppContext.Provider value = {{...state, removePost, searchPost, getNextPage, getPrevPage }}>{children}</AppContext.Provider>
};

//Create custom hook
const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext,AppProvider, useGlobalContext};