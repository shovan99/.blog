import axios from "axios"
const URL = "http://localhost:8000/api"

export const createPost = async( post , token ) => {
    // try {
    // return await axios.post(`${URL}/post/create` , post);
    // } catch( err ) {
    //     console.log(err)
    // }
    return fetch(`${URL}/post/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
    }).then(response => {
      return response.json()
    })
    .catch(err=>
    console.log(err)
    )
}

export const getAllPosts = async( param ) => {
    try {
        const response =  await axios.get(`${URL}/posts/${param}`);
        return response.data;
    } catch( err ) {
        console.log(err)
    }
}


export const getPostById = async( id ) => {
    try {
        const post = await axios.get(`${URL}/post/${id}`)
        return post.data
    }catch( err ) {
        console.log(err)
    }
}


export const updatePost = async( id , post ) => {
    try{
        return await axios.put(`${URL}/post/${id}` , post)
    }catch( err ) {
        console.log(err)
    }
}

export const deletePostById = async( postId , userId , token ) => {
    try{
        // return await axios.delete(`${URL}/post/${id}`)
        return fetch(`${URL}/post/${postId}/${userId}`, {
        method: "DELETE",
        headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        }
        })
    }catch( err ) {
        console.log(err)
    }
}


export const uploadFile = async( data ) => {
    try{
        return await axios.post(`${URL}/file/upload` , data)
    }catch( err ) {
        console.log(err)
    }
}


export const newComment = async( data ) => {
    try{
        return await axios.post(`${URL}/comment/new` , data)
    } catch( err ) {
        console.log(err)
    }
}

export const authenticate = ( data , next ) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt" , JSON.stringify(data))
        next()
    }
}


export const isAuthenticated = () => {
    if(typeof window == "undefined") {
        return false;
    }
    if( localStorage.getItem("jwt") ) {
        return JSON.parse(localStorage.getItem("jwt"))
    } 
    else {
        return false
    }
}

export const signout = next => {
    if( typeof window != "undefined" ) {
        localStorage.removeItem("jwt")
        next()
        return axios.get(`${URL}/signout`)
        .then(responce=>console.log("Signout Success"))
        .catch(err => console.log(err))
    }
}

// export const signup = user => {
//     const config = { 
//         headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//         }
//     }

//     const bodyParams = {
//         body: JSON.stringify(user)
//     }
//     return axios.post(`${URL}/signup` , bodyParams , config)
//     .then(responce=>{
//         return responce.json()
//     })
//     .catch(err => console.log(err))
// }

export const signup = user => {
    return fetch(`${URL}/signup`,{
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
    })
    .then(responce=>{
        return responce.json()
    })
    .catch(err => console.log(err))
}


export const signin = user => {
    return fetch(`${URL}/signin`,{
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
    })
    .then(responce=>{
        return responce.json()
    })
    .catch(err => console.log(err))
}


// export const getCommentsByPost = ( postId ) => {
//     return fetch(`${URL}/comments/${postId}` , {
//         method: "GET"
//     }).then(response => {
//         console.log(response)
//         return response.json();
//     }).catch( err => {
//         console.log(err)
//     } )
// }


export const getCommentsByPost = async( postId ) => {
    try {
        const response =  await axios.get(`${URL}/comments/${postId}`);
        console.log(response.data)
        return response.data;
    } catch( err ) {
        console.log(err)
    }
}