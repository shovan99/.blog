import React , { useState , useEffect } from 'react'
import { Box, makeStyles, Typography } from "@material-ui/core"
import { Link , useHistory } from "react-router-dom"
import { Edit , Delete } from "@material-ui/icons"

import CommentShow from "./CommentShow"

import Comments from './Comments'
import { getPostById , deletePostById } from "./service/api"
import { isAuthenticated , getCommentsByPost } from "./service/api"

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "0 100px",
        [theme.breakpoints.down("md")]: {
            padding: 0
        } 
    },
    image: {
        width: "100%",
        height: "50vh",
        objectFit: "cover"
    },
    icons: {
        float:"right"
    },
    icon: {
        margin: "6px",
        padding: "4px",
        border: "1px solid #878787",
        borderRadius: "10px"
    },
    heading: {
        fontSize: 38,
        fontWeight: 600,
        textAlign: "center",
        margin: "10px 0 10px 0"
    },
    subheading: {
        color: "#878787",
        [theme.breakpoints.down("sm")]: {
            display: "block"
        },
        display: "flex",
        margin: "20px"
    }
}))

const Detailview = ({ match }) => {


    const [ post , setPost ] = useState([])
    const [ comments , setComments ] = useState([])
    const { token , user: { _id , name } } = isAuthenticated()

    const history = useHistory()

    useEffect(() => {
        const fetchdata = async() => {
            let data = await getPostById(match.params.id)
            console.log(data)
            // console.log(post)
            setPost(data)
            const allComments = await getCommentsByPost(match.params.id)
            setComments(allComments)
            console.log(comments)
            isAuthenticated()
        }
        fetchdata()
    },[])


    const deletePost = async() => {
        await deletePostById(post._id  , _id , token)
        history.push("/")
    }

    const url = "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
    const classes = useStyles()
    return (
        <Box className={classes.container}>
            <img src={url} alt="banner" className={classes.image}/>
            <Box className={classes.icons}>
                { post.username == name && ( 
                    <>
                    <Link to={`/update/${post._id}`}><Edit className={classes.icon} color="primary"/></Link>
                    <Delete onClick={() => deletePost()} className={classes.icon} color="primary"/>
                    </>
                 ) }
                
            </Box>
            <Typography className={classes.heading}> {post.title} </Typography>
            <Box className={classes.subheading}>
            <Link to={`/?username=${post.username}`} style={{textDecoration: "none" , color: "inherit"}}>
                <Typography> Author: <span style={{fontWeight: "bold"}}> {post.username} </span> </Typography>
            </Link>
                <Typography style={{marginLeft: "auto"}}> {new Date(post.createdAt).toDateString()} </Typography>
            </Box>
            <Typography> {post.description} </Typography>
            <Comments post={post}/>
            { comments.length > 0 && (
                comments.map( comment => (
                <CommentShow comment={comment}/>
            ) )
            )  }
        </Box>
    )
}

export default Detailview
