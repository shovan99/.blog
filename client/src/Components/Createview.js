import React , { useState , useEffect } from 'react'
import { makeStyles , FormControl, InputBase , Button , TextareaAutosize , Select , MenuItem , InputLabel , Box } from '@material-ui/core'
import { AddCircle } from "@material-ui/icons"
import { useHistory } from "react-router-dom"
import { createPost , uploadFile } from "./service/api"


import { Alert } from '@material-ui/lab'

import { isAuthenticated } from "./service/api"

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
    },
    selectBox: {
        display: "flex",
        marginTop: "40px"
    },
    select: {
        // marginTop: "20px",
        // marginBottom: "20px",
        width: "100%"
    }
}))


const initialPost = {
    title: "",
    description: "",
    picture: "",
    username: "",
    categories: "All",
    createdAt: new Date()
}

const Createview = () => {
    const [ post , setPost ] = useState(initialPost)
    const [ file , setFile ] = useState("")
    const [ image , setImage ] = useState("")

    const [ errr , setErr ] = useState(false)
    const [ msgg , setMsg ] = useState(false)
    const { token , user: { name } } = isAuthenticated();
    const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"

    useEffect(() => {
        const getimage = async() => {
            if( file ) {
                console.log(file)
                const data = new FormData();
                data.append("name" , file.name)
                data.append("file" , file)
                const image = await uploadFile(data)
                post.picture = image.data
                setImage(image.data)
                isAuthenticated()
            }
        }
        getimage()
    } , [file])
    
    const history = useHistory()
    const handleChange = (e) => {
        setPost({...post , username: name , [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        await createPost(post , token).then( data => {
            if( data.error ) {
                setErr(data.error)
            }
            else {
                setMsg(data.message)
                history.push("/")
            }
        } )
    }
    const classes = useStyles()
    return (
        <Box className={classes.container}>
            <img src={url} alt="banner" className={classes.image}/>
            { msgg && (
            <Alert severity="success"> {msgg} </Alert>
            ) }
            { errr && (
                <Alert severity="warning"> {errr} </Alert>
            ) }
            <FormControl className={classes.form}>
                <label htmlFor="fileInput">
                    <AddCircle fontSize="large" color="primary"/>
                </label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} id="fileInput" style={{ display:"none" }}/>
                <InputBase placeholder="Title" onChange={(e) => handleChange(e)} name="title" className={classes.textfield}/>
                <Button onClick={(e) => handleSubmit(e)} variant="contained" color="primary"> Publish </Button>
            </FormControl>
            <TextareaAutosize placeholder="Tell Your Story" onChange={(e) => handleChange(e)} name="description" className={classes.textarea}/>
        </Box>
    )
}

export default Createview
