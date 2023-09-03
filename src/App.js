

import MergeSort from "./MergeSort";
import FYShuffle from "./FYShuffle/FYShuffle";

import { Container, Link, Breadcrumbs, Box, Typography} from '@mui/material';
export default function App() {

  return (
    <div >
      <Container maxWidth={"lg"}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="none" color="inherit">
          September 03, 2023
        </Link>
        <Link
          underline="hover"
          color="lightblue"
          href="https://zhenrongshi.com"
        >
          Zhenrong Shi
        </Link>
        
      </Breadcrumbs>
      <FYShuffle/>
      <Typography>
      For more about the Shuffle algorithm, see the <Link href="">Wikipedia article</Link>The visualizations in this post were built with d3.js.
Want to see the source code, see my <Link href="">GitHub</Link>
      </Typography>
      <Box marginTop="300px">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="none" color="inherit">
          September 03, 2023
        </Link>
        <Link
          underline="hover"
          color="lightblue"
          href="https://zhenrongshi.com"
        >
          Zhenrong Shi
        </Link>
        
      </Breadcrumbs>
      </Box>
      
      </Container>
      
    </div>
  );
}