import React , { useState , useEffect } from 'react'
import { Box , makeStyles , TextareaAutosize , Button } from "@material-ui/core"
import { isAuthenticated } from "./service/api"
import { newComment } from "./service/api"

import { useHistory } from "react-router-dom"

const useStyles = makeStyles({
    component: {
        marginTop: "100px",
        display: "flex"
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: "50%"
    },
    textArea: {
        // width: "100%",
        margin: "0 20px"
    },
    button: {
        height: "40px"
    }
})


const initialState = {
    name: "",
    postId: "",
    date: new Date(),
    comments: ""
}

const Comments = ({ post }) => {
    const url ="https://image.flaticon.com/icons/png/512/3135/3135715.png"
    const history = useHistory()

    const { user: { name } } = isAuthenticated()

    useEffect(() => {
        isAuthenticated()
    },[])

    const [ comment , setComment ] = useState(initialState)

    const handleChange = ( e ) => {
        setComment({...comment , name: name , postId: post._id , comments: e.target.value})
    } 

    const postComment = async() => {
        await newComment(comment)
        // setComment({ ...comment , comments: "" })
        history.push("/")
    }
    const classes = useStyles()
    return (
        <Box className={classes.component}>
            <Box>
                <img src={url} className={classes.image} alt="profilepic"/>
                <TextareaAutosize
                    placeholder="Enter Your Comment Here...."
                    className={classes.textArea}
                    onChange={(e) => handleChange(e)}
                    rowsMin={4}
                    cols={120}
                />
                <Button
                variant="contained"
                onClick={() => postComment()}
                color="primary"
                size="medium"
                classNama={classes.button}
                > Post </Button>
            </Box>
        </Box>
    )
}

export default Comments
