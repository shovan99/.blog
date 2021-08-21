import React , { useState , useEffect } from 'react'
import { makeStyles , FormControl, InputBase , Button , TextareaAutosize } from '@material-ui/core'
import { AddCircle } from "@material-ui/icons"
import { Box } from "@material-ui/core"

import { useHistory } from "react-router-dom"

import { getPostById , updatePost , isAuthenticated } from "./service/api"

const useStyles = makeStyles(( theme ) => ({
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
    form: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10
    },
    textfield: {
        flex: 1,
        margin: "0 30px",
        fontSize: 24
    },
    textarea: {
        width: "100%",
        marginTop: "30px",
        border: "none",
        fontSize: "18px",
        "&:focus-visible": {
            outline: "none"
        }
    }
}))


const initialPost = {
    title: "",
    description: "",
    picture: "",
    username: "Shovan",
    categories: "All",
    createdAt: new Date()
}


const Updateview = ({ match }) => {
    const url = "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
    const classes = useStyles()
    const [ post , setPost ] = useState(initialPost)
    const history = useHistory()
    useEffect(() => {
        const fetchdata = async() => {
            let data = await getPostById(match.params.id)
            setPost(data);
            isAuthenticated()
        }
        fetchdata()
    },[])


    const handleChange = (e) => {
        setPost({...post , [e.target.name] : e.target.value})
    }

    const handleSubmit = async() => {
        await updatePost(match.params.id , post)
        history.push(`/details/${match.params.id}`)
    } 
    return (
        <Box className={classes.container}>
            <img src={url} alt="banner" className={classes.image}/>
            <FormControl className={classes.form}>
                <AddCircle fontSize="large" color="primary"/>
                <InputBase placeholder="Title" onChange={(e) => handleChange(e)} name="title" value={post.title} className={classes.textfield}/>
                <Button variant="contained" onClick={() => handleSubmit()} color="primary"> Update </Button>
            </FormControl>
            <TextareaAutosize placeholder="Tell Your Story" onChange={(e) => handleChange(e)} name="description" value={post.description} className={classes.textarea}/>
        </Box>
    )
}

export default Updateview
