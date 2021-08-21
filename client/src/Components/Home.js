import React , { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import Banner from "./Banner"
import Categories from "./Categories"
import Posts from "./Posts"
import { isAuthenticated } from "./service/api"

const Home = () => {
    useEffect(() => {
        isAuthenticated()
    } , [])
    return (
        <>
        <Banner/>
        <Grid container>
        <Grid item lg={2} xs={12} sm={2}>
            <Categories />
        </Grid>
        <Grid container item sm={10} lg={10} xs={12}>
            <Posts />
        </Grid>
        </Grid>
        </>
    )
}

export default Home
