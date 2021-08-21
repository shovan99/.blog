import React , { useState , useEffect } from 'react'
import { Grid } from "@material-ui/core"
import Post from "./Post"
import { Link , useLocation } from "react-router-dom"

import { getAllPosts , isAuthenticated } from "./service/api"

const Posts = () => {
    const [ posts , setPosts ] = useState([])
    const { search } = useLocation()

    useEffect(() => {
        const fetchdata = async() => {
          let data = await getAllPosts(search);
          setPosts(data);
          isAuthenticated()
        }
        fetchdata()
    },[search])
    return (
        <>
            { posts.map(( post ) => (
              <Grid item lg={3} sm={4} xs={12}>
                <Link to={`/details/${post._id}`} style={{textDecoration: "none" , color: "inherit"}}>
                <Post post={post}/>
                </Link>
              </Grid>
            )) }
        </>
    )
}

export default Posts
