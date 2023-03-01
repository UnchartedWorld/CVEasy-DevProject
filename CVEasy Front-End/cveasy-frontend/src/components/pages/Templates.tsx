import React, {useState} from 'react'
import {Box, Grid, Paper} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ThemeCard from "../ThemeCard";

const sampleData = [
    {
        img: "?",
        title: "First Template",
        description: "Finding a good template sucks. This template also still sucks."
    },
    {
        img: "?",
        title: "Second Template",
        description: "Finding a good template sucks. This template also still sucks."
    },
    {
        img: "?",
        title: "Third Template",
        description: "Finding a good template sucks. This template also still sucks."
    },
    {
        img: "?",
        title: "Fourth Template",
        description: "Finding a good template sucks. This template also still sucks."
    },
    {
        img: "?",
        title: "Fifth Template",
        description: "Finding a good template sucks. This template also still sucks."
    },
    {
        img: "?",
        title: "Sixth Template",
        description: "Finding a good template sucks. This template also still sucks."
    },
    {
        img: "?",
        title: "Seventh Template",
        description: "Finding a good template sucks. This template also still sucks."
    },
    {
        img: "?",
        title: "Eighth Template",
        description: "Finding a good template sucks. This template also still sucks."
    }

]


export default function Templates() {

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
                {sampleData.map((themeData, i) => (
                    <Grid xs={12} sm={6} md={4}>
                        <ThemeCard img={themeData.img} cardTitle={themeData.title}
                                   cardDescription={themeData.description}/>
                    </Grid>
                ))}
            </Grid>
        </Box>


    );

}