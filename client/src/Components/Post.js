import React , { useEffect } from 'react'
import { Box , makeStyles , Typography , Grid } from '@material-ui/core'

import { isAuthenticated } from "./service/api"

const useStyles = makeStyles({
    container: {
        border: '1px solid #d3cede',
        borderRadius: 10,
        margin: 10,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        height: 350,
        '& > *': {
            padding: '0 5px 5px 5px'
        }
    },
    image: {
        width: '100%',
        objectFit: 'cover',
        borderRadius: '10px 10px 0 0',
        height: 150
    },
    textColor: {
        color: '#878787',
        fontSize: 12
    },
    heading: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: 600
    },
    detail: {
        fontSize: 14,
        wordBreak: 'break-word'
    }
})

const Post = ({ post }) => {
    const classes = useStyles()
    

    const imgArr = [
        "https://images.pexels.com/photos/2058128/pexels-photo-2058128.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/4134784/pexels-photo-4134784.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/4144294/pexels-photo-4144294.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/4708880/pexels-photo-4708880.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/4050415/pexels-photo-4050415.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/4939614/pexels-photo-4939614.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    ]
    useEffect(() => {
        isAuthenticated()
    } , [])

    const addElipsis = ( strr , limit ) => {
        return strr.length > 100 ? strr.substring(0 , limit) + "...." : strr
    }

    const imgNum = Math.floor(Math.random() * (6 - 0) + 0 );
    return (
        <>
            <Box className={classes.container}>
                <img src={imgArr[imgNum]} alt="post" className={classes.image} />
                <Typography className={classes.textColor}> {post.categories} </Typography>
                <Typography className={classes.heading}> {addElipsis(post.title , 20)} </Typography>
                <Typography className={classes.textColor}> <span style={{ fontWeight: "bold" }}>Author:</span> {post.username} </Typography>
                <Typography className={classes.detail}> {addElipsis(post.description , 100)} </Typography>
            </Box>
        </>
    )
}

export default Post
