// Import React and useEffect hook for managing side effects
import React, { useEffect, useState, useRef } from 'react';
// Import D3 library for data visualization
import * as d3 from 'd3';
// Import the component's CSS file for styling
import './FYShuffle.css';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { styled } from '@mui/material/styles';
import { purple, blue, red } from '@mui/material/colors';
// Define the FYShuffle component
const FYShuffle = () => {
    const duration = {
        durationBetweenLines: 50, // Duration for transitions
        durationTransitionTime: 400,
        durationNewVisual: 12400
    };

    const size = {
        w: 960,
        n: 240,
        h: 50,
    };

    const scale = {
        x: d3.scaleLinear().domain([0, size.n]).range([size.h, size.w - size.h]),
        a: d3.scaleLinear().domain([0, size.n - 1]).range([90 + 60, 270 - 60]),
    };

    const transform = (d, i) => {
        const { x, a } = scale;
        const { h } = size;
        return "translate(" + x(i) + "," + h + ")rotate(" + a(d) + ")";
    };

    const data = d3.range(size.n);

    const [showButton, setShowButton] = useState(true);

    const lineRef = useRef(null); // Create a ref for the line elements

    const pressToRun = () => {
        const { h } = size;
        const { durationBetweenLines, durationTransitionTime, durationNewVisual } = duration;

        setShowButton(false);
        const generateUniqueRandomList = (array) => {
            const passes = [];

            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            passes.push(array.slice());
            return passes;
        };

        const startAnimation = async () => {

            const passes = generateUniqueRandomList(data);

            for (let i = 0; i < passes.length; i++) {
                const pass = passes[i];

                await lineRef.current

                    .data(pass, Number)
                    .transition()
                    .attr("y1", 0)
                    .attr("y2", h)
                    .delay((d, i) => i * durationBetweenLines)
                    .duration(durationTransitionTime)
                    .attr("transform", transform)

                // await lineRef.current.data(pass,Number).transition().style("stroke","black");

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

        lineRef.current = svg.selectAll("line") // Assign the line elements to the ref
            .data(data)
            .enter().append("line")
            .attr("x1", 0)
            .attr("y1", -size.h)
            .attr("x2", 0)
            .attr("y2", 0)
            .attr("transform", transform);
    }, []); // Run the effect only once on component mount


    const PlayButton = styled(Button)(({ theme }) => `
    padding:0;
    margin:0;
    color:black;
    font-size: 2rem;
    background-color: white;
    &:hover {
        color: ${red[600]};
        background-color:transparent;
      }
    `);
    return (
        <div>
            <Typography variant="h3" gutterBottom >Shuffle Visualization</Typography>
            <Typography>When we aim to create an array of 10,000 unique numbers in random order, the traditional approach involves initializing and populating an array with 10,000 random numbers while ensuring their uniqueness. This method is not efficient and can have a worst-case time complexity of O(n^2).
            </Typography>
            <br></br>
            <Typography>However, there's a better way. How about generating an array from 1 to 10,000 and shuffling it?</Typography>
            <br></br>
            <Typography>Think of it as having a fresh deck of cards:</Typography>
            <Stack margin={0} justifyContent={'center'} alignItems={'center'} id="visualization-container">
                <Box position={"absolute"} height={"1/2"}>
                    {showButton && <PlayButton onClick={pressToRun} aria-label='playArrowIcon'> <PlayArrowIcon fontSize='inherit' /></PlayButton>}
                </Box>

            </Stack>
            <Typography>To implement an in-place O(n) shuffle, simply pick a random remaining element from the front and place it in its new location at the front. The unshuffled elements remain at the bottom, ready for subsequent shuffling.</Typography>
            
        </div>
    );
};

export default FYShuffle;
