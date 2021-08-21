import React , { useEffect } from 'react'
import { Button , makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core"

import { Link } from "react-router-dom"
import { categories } from "./constants/Data"
import { isAuthenticated } from "./service/api"

const useStyles = makeStyles({
    button: {
        margin: 20,
        width: "86%"
    },
    tableBorder: {
        border: "1px solid rgba(224 , 224 , 224 , 2)"
    }
})

const Categories = () => {
    const classes = useStyles()


    useEffect(() => {
        isAuthenticated()
    } , [])
    return (
        <>
        <Link to="/create" style={{textDecoration: "none" , color: "inherit"}}><Button variant="contained" className={classes.button} color="primary"> Create Post </Button></Link>
        <Table className={classes.tableBorder}>
            <TableHead>
                <TableRow>
                    <Link to="/" style={{ textDecoration: "none" , color: "inherit" }}>  <TableCell> All Categories </TableCell>  </Link>
                </TableRow>
            </TableHead>
            <TableBody>
                    { categories.map(( category ) => (
                        <TableRow>
                            <Link to={`/?category=${category}`} style={{ textDecoration: "none" , color: "inherit" }}>  <TableCell> {category} </TableCell>  </Link>
                        </TableRow>
                    )) }
            </TableBody>
        </Table>
        </>
    )
}

export default Categories
