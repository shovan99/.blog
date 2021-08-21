import React , { useState , useEffect } from 'react'
import { makeStyles , TextField , Box , Button , Typography , Grid } from "@material-ui/core"

import { Link } from "react-router-dom"

import { Alert } from '@material-ui/lab'

import { signup , isAuthenticated } from "./service/api"

import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  container: {
        marginTop: 80,
        padding: "0 100px",
        [theme.breakpoints.down("md")]: {
            padding: 0
        } 
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  textfield: {
      width: "100%"
  },
  heading: {
      fontSize: 40,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "4px",
      textAlign: "center",
      fontFamily: "roboto"
  }
}));


const initialValue = {
    name: "",
    email: "",
    password: ""
}

const Signup = () => {
    const classes = useStyles()
    const history = useHistory()
    const [ data , setData ] = useState(initialValue)
    const [ err , setErr ] = useState(false)

    useEffect(() => {
        isAuthenticated()
    },[])

    const handleChange = ( e ) => {
        setData({ ...data , [e.target.name] : e.target.value })
    }

    const submitData = async( e ) => {
        e.preventDefault()
        await signup(data)
        .then( response => {
            if(response.error) {
                setErr(response.error)
            }
            else {
                history.push("/signin")
            }
        } )
    }
    return (
        <Box className={classes.container}>
        { err && (
            <Alert severity="warning"> {err} </Alert>
        ) }
        <Typography className={classes.heading} color="primary"> Signup Here </Typography>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" name="name" onChange={(e) => handleChange(e)} className={classes.textfield} label="Username" variant="outlined" />
            <br/>
            <small style={{ color: "gray" }}> Username Should Be Unique </small>
            <br/>
            <TextField id="outlined-basic" type="email" name="email" onChange={(e) => handleChange(e)} className={classes.textfield} label="Email" variant="outlined" />
            <br/>
            <TextField id="outlined-basic" type="password" name="password" onChange={(e) => handleChange(e)}  className={classes.textfield} label="Password" variant="outlined" />
            <Button variant="contained" onClick={(e) => submitData(e)} size="lg" color="primary"> Signup </Button>
            <Typography style={{ color:"blue" , textDecoration: "none" }}> Already Have An Acoount? <Link to="/signin"> <span style={{ color: "inherit" , fontWeight: "bold" }}>Signin Here</span> </Link> </Typography>
        </form>
        </Box>
    )
}

export default Signup
