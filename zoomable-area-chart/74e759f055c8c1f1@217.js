// https://observablehq.com/@d3/zoomable-area-chart@217
function _1(md){return(
md`# Zoomable Area Chart

This zoomable time series area chart shows the number of flights per day. The effect of the September 11, 2001 attacks on air travel is evident.`
)}

function _chart(d3,margin,width,height,DOM,area,data,x,xAxis,yAxis,y)
{
  const zoom = d3.zoom()
      .scaleExtent([1, 32])
      .extent([[margin.left, 0], [width - margin.right, height]])
      .translateExtent([[margin.left, -Infinity], [width - margin.right, Infinity]])
      .on("zoom", zoomed);

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  const clip = DOM.uid("clip");

  svg.append("clipPath")
      .attr("id", clip.id)
    .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom);

  const path = svg.append("path")
      .attr("clip-path", clip)
      .attr("fill", "steelblue")
      .attr("d", area(data, x));

  const gx = svg.append("g")
      .call(xAxis, x);

  svg.append("g")
      .call(yAxis, y);

  svg.call(zoom)
    .transition()
      .duration(750)
      .call(zoom.scaleTo, 4, [x(Date.UTC(2001, 8, 1)), 0]);

  function zoomed(event) {
    const xz = event.transform.rescaleX(x);
    path.attr("d", area(data, xz));
    gx.call(xAxis, xz);
  }

  return svg.node();
}


function _height(){return(
500
)}

function _margin(){return(
{top: 20, right: 20, bottom: 30, left: 30}
)}

function _x(d3,data,margin,width){return(
d3.scaleUtc()
    .domain(d3.extent(data, d => d.date))
    .range([margin.left, width - margin.right])
)}

function _y(d3,data,height,margin){return(
d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top])
)}

function _xAxis(height,margin,d3,width){return(
(g, x) => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
)}

function _yAxis(margin,d3,data){return(
(g, y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))
)}

function _area(d3,y){return(
(data, x) => d3.area()
    .curve(d3.curveStepAfter)
    .x(d => x(d.date))
    .y0(y(0))
    .y1(d => y(d.value))
  (data)
)}

async function _data(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("flights.csv").text(), d3.autoType), {y: "Flights"})
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["flights.csv", {url: new URL("./files/1171cb24da0255c434c1ff554b4964c39c1253aa9349f2d356a25351acd3579367f92b24366ae5b6c208c9336811489c0a176cbc0cc62e31feff51e294a178fe.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["d3","margin","width","height","DOM","area","data","x","xAxis","yAxis","y"], _chart);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], _x);
  main.variable(observer("y")).define("y", ["d3","data","height","margin"], _y);
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","width"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","data"], _yAxis);
  main.variable(observer("area")).define("area", ["d3","y"], _area);
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], _data);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
