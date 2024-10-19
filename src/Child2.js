import React, { Component } from 'react';
import * as d3 from 'd3';

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

  componentDidMount() {
    // console.log(this.props.data2);
  }

  componentDidUpdate() {
    // console.log("componentDidUpdate", this.props.data2);
    var data = this.props.data2;
    var temp_data = d3.flatRollup(data, (v) => d3.mean(v, (d) => d.tip), (d) => d.day);

    // dimensions and margins of the graph
    var margin = { top: 40, right: 10, bottom: 50, left: 30 },
        w = 500 - margin.left - margin.right,
        h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child2_svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .select(".g_2")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // add X-axis 
    const x_data = temp_data.map((item) => item[0]);
    var x_scale = d3.scaleBand().domain(x_data).range([margin.left, w]).padding(0.2);
    container.selectAll(".x_axis_g").data([0]).join('g').attr("class", "x_axis_g")
    .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

    // add Y-axis
    const y_data = temp_data.map((item) => item[1]);
    var y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);
    container.selectAll(".y_axis_g").data([0]).join('g').attr("class", "y_axis_g")
    .attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(y_scale));

    // plot the data
    container.selectAll("rect").data(temp_data).join('rect').attr("x", d=>x_scale(d[0])).attr('width', x_scale.bandwidth()).style('fill', '#69b3a2')
    .attr("y", d=>y_scale(d[1]))
    .attr("height", d=>h-y_scale(d[1]))

    // title label
    d3.select(".child2_svg")
      .selectAll(".title_label")
      .data([0])
      .join("text")
      .attr("class", "title_label")
      .attr("x", (w + margin.left + margin.right) / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Average Tip by Day");

    // X-axis label
    d3.select(".child2_svg")
      .selectAll(".x_label")
      .data([0])
      .join("text")
      .attr("class", "x_label")
      .attr("x", (w + margin.left + margin.right) / 2)
      .attr("y", h + margin.top + margin.bottom - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Day");

    // Y-axis label
    d3.select(".child2_svg")
      .selectAll(".y_label")
      .data([0])
      .join("text")
      .attr("class", "y_label")
      .attr("x", -(h / 2) - margin.top)
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Average Tip");
  }

  render() {
    return (
        <svg className='child2_svg'>
            <g className='g_2'></g>
        </svg>
    )
  }
}

export default Child2;