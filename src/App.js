import React from "react";
import FYShuffle from "./FYShuffle/FYShuffle";
import { Container, Link, Breadcrumbs, Box, Typography } from '@mui/material';
import { blue } from "@mui/material/colors";

/**
 * The main application component.
 */
export default function App() {
  return (
    <div>
      <Container maxWidth={"lg"}>
        {/* Date and Author Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="none" color="inherit">
            September 03, 2023
          </Link>
          <Link
            underline="hover"
            color={blue[400]}
            href="https://zhenrongshi.com"
          >
            Jon Shi
          </Link>
        </Breadcrumbs>

        {/* FYShuffle Component */}
        <FYShuffle />

        {/* Main Content */}
        <Typography>
          For more about the Shuffle algorithm, see the{" "}
          <Link
            underline="hover"
            color={blue[400]}
            href="https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle"
          >
            Wikipedia article
          </Link>
          . The visualizations in this post were built with d3.js. Want to see
          the source code, check my{" "}
          <Link
            underline="hover"
            color={blue[400]}
            href="https://github.com/Jonszr/Shuffle-Visualization"
          >
            GitHub
          </Link>
          .
        </Typography>

        {/* Additional Date and Author Breadcrumbs */}
        <Box marginTop="100px">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="none" color="inherit">
              September 03, 2023
            </Link>
            <Link
              underline="hover"
              color={blue[400]}
              href="https://zhenrongshi.com"
            >
              Jon Shi
            </Link>
          </Breadcrumbs>
        </Box>
      </Container>
    </div>
  );
}
