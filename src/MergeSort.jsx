// Import React and useEffect hook for managing side effects
import React, { useEffect } from 'react';
// Import D3 library for data visualization
import * as d3 from 'd3';
// Import the component's CSS file for styling
import './mergesort.css';

// Define the MergeSort component
const MergeSort = () => {
  useEffect(() => {
    // Set up initial variables for visualization
    const w = 960, // Width of the SVG container
      h = 50; // Height of the SVG container

    const n = 240, // Number of elements to sort
      x = d3.scaleLinear().domain([0, n]).range([h, w - h]), // Scale for x-axis
      a = d3.scaleLinear().domain([0, n - 1]).range([90 + 60, 270 - 60]), // Scale for rotation
      data = d3.shuffle(d3.range(n)), // Generate initial data
      duration = 250; // Duration for transitions

    // Create an SVG container for visualization
    const svg = d3.select("#visualization-container").append("svg")
      .attr("width", w)
      .attr("height", h);

    // Create line elements for each data point
    const line = svg.selectAll("line")
      .data(data)
      .enter().append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", h)
      .attr("transform", transform); // Apply the transform function

    // Start the visualization
    start();

    // Function to start the mergesort visualization
    function start() {
      // Perform mergesort and get passes
      const passes = mergesort(data).reverse();

      // Update the visualization
      update();

      // Function to update the visualization for each pass
      function update() {
        const pass = passes.pop(); // Get the current pass

        // Transition lines based on the data in the current pass
        line.data(pass, Number)
          .transition()
          .duration(duration)
          .attr("transform", transform);

        if (passes.length) {
          setTimeout(update, duration); // Continue updating if more passes exist
        } else {
          d3.shuffle(data); // Shuffle the data for a new visualization
          setTimeout(start, duration + 4000); // Start a new visualization after a delay
        }
      }
    }

    // Function to apply transformation to lines based on data
    function transform(d, i) {
      return "translate(" + x(i) + "," + h + ")rotate(" + a(d) + ")";
    }

    // Function to perform mergesort on an array
    function mergesort(array) {
      const passes = [];
      let i, j;
      const n = array.length;
      let m = 1;

      while (m < array.length) {
        i = j = 0;
        while (i < array.length) j += merge(i, i += m, i += m);
        if (j) passes.push(array.slice());
        else m <<= 1;
      }

      function merge(start, middle, end) {
        middle = Math.min(array.length, middle);
        end = Math.min(array.length, end);
        for (; start < middle; start++) {
          if (array[start] > array[middle]) {
            const v = array[start];
            array[start] = array[middle];
            insert(middle, end, v);
            return true;
          }
        }
        return false;
      }

      function insert(start, end, v) {
        while (start + 1 < end && array[start + 1] < v) {
          const tmp = array[start];
          array[start] = array[start + 1];
          array[start + 1] = tmp;
          start++;
        }
        array[start] = v;
      }

      return passes;
    }
  }, []); // Run the effect only once on component mount

  // Render the component
  return (
    <div>
      <h1>Mergesort Visualization</h1>
      <p>This is a visualization of the mergesort algorithm using D3.js.</p>
      <div id="visualization-container"></div>
    </div>
  );
}

// Export the MergeSort component as the default export
export default MergeSort;
