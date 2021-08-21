import React , { useState , useEffect } from 'react'
import { makeStyles , TextField , Box , Button , Typography , Grid } from "@material-ui/core"

import { Alert } from '@material-ui/lab'

import { Link , useHistory } from "react-router-dom"

import { signin , authenticate , isAuthenticated } from "./service/api"

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
    email: "",
    password: ""
}

const Signin = () => {
    const classes = useStyles()

    const history = useHistory()
    const [ data , setData ] = useState(initialValue)
    const [ err , setErr ] = useState(false)


    useEffect(() => {
        isAuthenticated()
    }, [])


    const handleChange = ( e ) => {
        setData({ ...data , [e.target.name] : e.target.value })
    }

    const submitData = async( e ) => {
        e.preventDefault()
        signin(data).then( async( data ) => {
            if( data.error ) {
                setErr(data.error)
                console.log(data.error)
            } else {
                await authenticate(data , () => {
                history.push("/")
                })
            }
        })
    }

    // const showErrors = ( data ) => (
    //     setTimeout(() => {
    //         <Alert severity="warning"> {data} </Alert>
    //     }, 2000)
    // )
    return (
        <Box className={classes.container}>
        { err && (
            <Alert severity="warning"> {err} </Alert>
        ) }
        <Typography className={classes.heading} color="primary"> Signin Here </Typography>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" name="email" onChange={(e) => handleChange(e)} className={classes.textfield} label="Email" variant="outlined" />
            <br/>
            <TextField id="outlined-basic" name="password" onChange={(e) => handleChange(e)} className={classes.textfield} label="Password" variant="outlined" />
            <Button variant="contained" onClick={(e) => submitData(e)} size="lg" color="primary"> Signup </Button>
            <Typography style={{ color:"blue" , textDecoration: "none" }}> Don't Have An Acoount? <Link to="/signup"> <span style={{ color: "inherit" , fontWeight: "bold" }}>Signup Here</span> </Link> </Typography>
        </form>
        </Box>
    )
}

export default Signin
