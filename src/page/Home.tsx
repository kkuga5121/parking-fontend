/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-24 12:14 (GMT+0900)
 */
import { Box, Button, Grid } from "@mui/material"
import React from "react"
export default function Home() {
  return (
   <Box 
   sx={{
     display: 'flex',
     flexDirection: 'row-reverse',
     p: 1,
     m: 1,
     boxShadow:2,
     bgcolor: 'background.paper',
     borderRadius: 1,
   }} >
   <div className=" flex flex-col gap-4"> 
   <h1 >Home</h1>
      <Button variant="contained">Contained</Button>
        <Button variant="contained" disabled>
        Disabled
        </Button>
        <Button variant="contained" href="#contained-buttons">
        Link
        </Button>
        </div>
   </Box>
  )
}