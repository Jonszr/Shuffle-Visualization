import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { styled } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import codepic from '../codepic.png';
import './FYShuffle.css'

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

// Define the FYShuffle component
const FYShuffle = () => {
    // Define duration and size settings
    const duration = {
        durationBetweenLines: 50,
        durationTransitionTime: 400,
        durationNewVisual: 12400
    };

    const size = {
        w: 960,
        n: 240,
        h: 60,
    };

    // Define scales and transform function
    const scale = {
        x: d3.scaleLinear().domain([0, size.n]).range([size.h, size.w - size.h]),
        a: d3.scaleLinear().domain([0, size.n - 1]).range([90 + 60, 270 - 60]),
    };

    const transform = (d, i) => {
        const { x, a } = scale;
        const { h } = size;
        return "translate(" + x(i) + "," + h + ")rotate(" + a(d) + ")";
    };

    // Generate initial data array
    const data = d3.range(size.n);

    const [showButton, setShowButton] = useState(true);

    const lineRef = useRef(null);

    // Function to start the animation
    const pressToRun = () => {
        const { h } = size;
        const { durationBetweenLines, durationTransitionTime, durationNewVisual } = duration;

        setShowButton(false);

        // Function to generate a unique random list
        const generateUniqueRandomList = (array) => {
            const passes = [];

            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            passes.push(array.slice());
            return passes;
        };

        // Function to start the animation sequence
        const startAnimation = async () => {
            const passes = generateUniqueRandomList(data);

            for (let i = 0; i < passes.length; i++) {
                const pass = passes[i];

                await lineRef.current
                    .data(pass, Number)
                    .transition()
                    .attr("y1", 10)
                    .attr("y2", h)
                    .delay((d, i) => i * durationBetweenLines)
                    .duration(durationTransitionTime)
                    .attr("transform", transform);
            }

            setTimeout(() => {
                setShowButton(true);
                lineRef.current
                    .attr("x1", 0)
                    .attr("y1", -h)
                    .attr("x2", 0)
                    .attr("y2", 0)
                    .attr("transform", transform);
            }, durationNewVisual);
        };

        startAnimation();
    };

    useEffect(() => {
        const svg = d3.select("#visualization-container").append("svg")
            .attr("width", size.w)
            .attr("height", size.h + 50);

        lineRef.current = svg.selectAll("line")
            .data(data)
            .enter().append("line")
            .attr("x1", 0)
            .attr("y1", -size.h)
            .attr("x2", 0)
            .attr("y2", 0)
            .attr("transform", transform);
    }, []);

    // Define the styled PlayButton
    const PlayButton = styled(Button)(({ theme }) => `
    padding: 0;
    margin: 0;
    color: black;
    font-size: 2rem;
    background-color: white;
    &:hover {
        color: ${red[600]};
        background-color: transparent;
    }
    `);

    return (
        <Box marginY="50px">
            <Typography variant="h3" gutterBottom>Shuffle Visualization</Typography>
            <Typography>
                When we aim to create an array of 10,000 unique numbers in random order, the traditional approach involves initializing and populating an array with 10,000 random numbers while ensuring their uniqueness. This method is not efficient and can have a worst-case time complexity of O(n^2).
            </Typography>
            <br />
            <Typography>
                However, there's a better way. How about generating an array from 1 to 10,000 and shuffling it?
            </Typography>
            <br />
            <Typography>
                Think of it as having a fresh deck of cards:
            </Typography>
            <Stack marginY="50px" justifyContent={'center'} alignItems={'center'} id="visualization-container">
                <Box position={"absolute"} height={"1/2"}>
                    {showButton && <PlayButton onClick={pressToRun} aria-label='playArrowIcon'> <PlayArrowIcon fontSize='inherit' /></PlayButton>}
                </Box>
            </Stack>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography>
                        To implement an in-place O(n) shuffle, simply pick a random remaining element from the front and place it in its new location at the front. The unshuffled elements remain at the bottom, ready for subsequent shuffling.
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="body2" color={blue[400]}>
                        Click to shuffle!
                    </Typography>
                </Grid>
            </Grid>
            <Stack marginY="50px" justifyContent={'center'} alignItems={'center'}>
                <img src={codepic} alt="Code" />
            </Stack>
        </Box>
    );
};

export default FYShuffle;
