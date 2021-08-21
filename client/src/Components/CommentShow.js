import React from 'react'
import { Box , makeStyles , Typography , Grid } from "@material-ui/core"

const useStyles = makeStyles({
    container: {
        margin: 20,
        backgroundColor: "#CAD5E2",
        border: "2px solid #758283",
        borderRadius: "2%"
    },
    intContainer: {
        display: "flex",
        padding: "10px"
    },
    user: {
        fontWeight:"bold",
        fontSize: "14px",
        color: "#03203C",
        textTransform:"uppercase"
    },
    comment: {
        padding: "10px",
        fontSize: "14px",
        fontFamily: "roboto",
        color: "#242B2E"
    },
    date: {
        color: "#242B2E",
        fontSize: "12px",
        fontWeight: "bold",
        letterSpacing: "2px"
    }
})

const CommentShow = ({ comment }) => {
    const classes = useStyles()
    return (
        <Box className={classes.container}>
        <Box className={ classes.intContainer }>
            <Typography className={classes.user}> {comment.name} </Typography>
            <Typography className={classes.date} style={{ float: "right" , marginLeft: "auto" }}> {new Date(comment.date).toDateString()} </Typography>
        </Box>
        <Box className={classes.comment}>
            <Typography> {comment.comments} </Typography>
        </Box>
        </Box>
    )
}

export default CommentShow
