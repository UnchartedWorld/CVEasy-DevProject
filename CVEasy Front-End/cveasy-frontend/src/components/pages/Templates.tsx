import React, {useState} from 'react'
import {Box, Grid, Paper} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ThemeCard from "../ThemeCard";


const sampleData = [
    {
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.I7e7cvPB1ciK74f_dY3OgAHaIu%26pid%3DApi&f=1&ipt=61d2f59aa700b8495496b6eb05c7b7911b57f9f90342f7f4b281977e90abdcaa&ipo=images",
        title: "First Template",
        description: "Finding a good template sucks. This template also still sucks."
    },
    {
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.fbL3Y9ozu-q6X06GdcR22AHaH_%26pid%3DApi&f=1&ipt=dc900c5adbf68aa6f18cc898efe0a060f8fc0dbcf93a95a3e63207f121c19fe7&ipo=images",
        title: "Second Template",
        description: "Finding a good template sucks. This template also still sucks."
    },
    {
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.jnz070OotLqYNNZ0jH6qBQHaFU%26pid%3DApi&f=1&ipt=25b14e86fbf1e61fe730146cde5c2e75a08fcb96ca4bc977449f88d7927be55d&ipo=images",
        title: "Third Template",
        description: "Finding a good template sucks. This template also still sucks."
    },
    {
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.YNT_1rZg8wDnX4T-Xpeg9QHaE8%26pid%3DApi&f=1&ipt=88d0aaa4e719bfe580123c918f9501c1f1a547c8ee0c62a8f7300c59dcaa3fb8&ipo=images",
        title: "Fourth Template",
        description: "Finding a good template sucks. This template also still sucks."
    },
    {
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.4uo1ayQ2XQXrScxFHkVe-AHaLH%26pid%3DApi&f=1&ipt=e7be498a2065a8db56cb5ca08515f6adc3bec012f819b4233882f9408a9ba92d&ipo=images",
        title: "Fifth Template",
        description: "Finding a good template sucks. This template also still sucks."
    },
    {
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.pbOyT12IjWxqfzhbPnhrnQHaJ4%26pid%3DApi&f=1&ipt=e4ec4525fd4ee9ab9051f5b46c23788df61eb98682971f99385bf3bf85649984&ipo=images",
        title: "Sixth Template",
        description: "Finding a good template sucks. This template also still sucks."
    },
    {
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.7RHBvr0UmLaZeZTc8f60AAHaE6%26pid%3DApi&f=1&ipt=10ea60d36bdd0579cd232410f07e03fa19fe961663b9d506f9e4e75a160a5be4&ipo=images",
        title: "Seventh Template",
        description: "Finding a good template sucks. This template also still sucks."
    },
    {
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP._SFpsHbU27jlomQ4sYL53QHaHa%26pid%3DApi&f=1&ipt=2fb65021be689db589cc5594ad8c60cd8744156a22eb7be83c74a93106be51cf&ipo=images",
        title: "Eighth Template",
        description: "Finding a good template sucks. This template also still sucks."
    }

]

export const data = sampleData;

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