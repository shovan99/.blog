import React , { useState , useEffect } from 'react'
import { AppBar , Toolbar , Typography , makeStyles } from "@material-ui/core"

import { Link , useHistory , withRouter , Redirect } from "react-router-dom"

import { isAuthenticated , signout } from "./service/api"


const useStyles = makeStyles({
    component: {
        // background: "blue",
        color: "#ffff",
    },
    container: {
        justifyContent: "center",
        '& > *': {
            padding: 20,
        }
    },
    link: {
        textDecoration: "none",
        color: "inherit"
    }
})

const Header = () => {
    const [ auth , setAuth ] = useState(false)
    const classes = useStyles();

    const history = useHistory() 


    useEffect(() => {
        setAuth(isAuthenticated())
    } , [Header])
    return (
        <AppBar className={classes.component}>
            <Toolbar className={classes.container}>
                <Link to="/" className={classes.link} ><Typography> Home </Typography></Link>
                <Link to="/about" className={classes.link} ><Typography> About </Typography></Link>
                <Link to="/contact" className={classes.link} ><Typography> Contact </Typography></Link>
                { auth && <Typography className={classes.link} style={{ cursor: "pointer" }} onClick={() => (
                    signout(() => (
                        history.push("/signin")
                    ))
                )}> Signout </Typography> }
                { !auth && (
                    <>
                    <Link to="/signin" className={classes.link}><Typography className={classes.link}> Signin </Typography></Link>
                    <Link to="/signup" className={classes.link}><Typography className={classes.link}> Signup </Typography></Link>
                    </>
                ) }
            </Toolbar>
        </AppBar>
    )
}

export default withRouter(Header)
