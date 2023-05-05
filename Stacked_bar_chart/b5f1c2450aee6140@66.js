import define1 from "./7764a40fe6b83ca1@437.js";

function _1(md){return(
md`# Final Project: InfoViz`
)}

function _accident(FileAttachment){return(
FileAttachment("accident.csv").csv()
)}

function _3(__query,accident,invalidation){return(
__query(accident,{from:{table:"accident"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"accident")
)}

async function _acc_data(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("accident.csv").text(),d3.autoType)
)}

function _5(__query,acc_data,invalidation){return(
__query(acc_data,{from:{table:"acc_data"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"acc_data")
)}

function _6(Plot,acc_data){return(
Plot.plot({
  marks:[
    Plot.dot(acc_data,{
      x:"STATE",
      y:"FATALS",
      fill:"MONTH"
    })
  ],
  color: {legend:true}
})
)}

function _8(vl,acc_data){return(
vl.markBar()
  .data(acc_data)
  .encode(
    vl.y().field("STATENAME").sort({ field: "MONTH", order: "descending" }),
    vl.x().sum("FATALS"),

  )
  .width(600) // specify a fixed width for the chart
  //.autosize({type: 'fit', resize: true}) // enable responsive resizing to fit the chart within its container
  .render()
)}

function _9(vl,acc_data){return(
vl.markBar()
  .data(acc_data)
  .encode(
    vl.y().field("STATENAME"),
    vl.x().sum("FATALS"),
    vl.color().fieldN("MONTH").scale({scheme:"dark2"})
  )
  .render()
)}

function _area1(vl,acc_data){return(
vl.markArea()
  .data(acc_data)
  .encode(
    vl.x().fieldQ("MONTH"),
    vl.y().sum("FATALS"),
    vl.color().fieldN("STATENAME")
  )
  .render()
)}

function _area(vl,acc_data){return(
vl.markArea()
  .data(acc_data)
  .encode(
    vl.x().fieldQ("MONTH"),
    vl.y().sum("FATALS"),
    vl.color().fieldN("WEATHERNAME")
  )
  .render()
)}

function _12(vl,acc_data){return(
vl.markBar()
  .data(acc_data)
  .encode(
    vl.y().fieldQ("MONTH"),
    vl.x().sum("FATALS"),
    vl.color().fieldN("LGT_CONDNAME").scale({scheme:"dark2"})
  )
  .render()
)}

function _13(vl,acc_data){return(
vl.markBar()
  .data(acc_data)
  .encode(
    vl.y().field("MONTH"),
    vl.x().sum("FATALS"),
    vl.color().fieldN("ROUTENAME").scale({scheme:"dark2"})
  )
  .render()
)}

function _area4(vl,acc_data){return(
vl.markArea()
  .data(acc_data)
  .encode(
    vl.x().fieldQ("DAY"),
    vl.y().sum("FATALS"),
    vl.color().fieldN("DAY_WEEKNAME")
  )
  .render()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["accident.csv", {url: new URL("./files/25f1f9ef0fb1d062fd36faf01b16f303c86afb41301cc162284c256684b736a4945bce63cf5774cc6777bb82661f4b347c57803efe1fce05d94ce6bca7f45252.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("accident")).define("accident", ["FileAttachment"], _accident);
  main.variable(observer()).define(["__query","accident","invalidation"], _3);
  main.variable(observer("acc_data")).define("acc_data", ["d3","FileAttachment"], _acc_data);
  main.variable(observer()).define(["__query","acc_data","invalidation"], _5);
  main.variable(observer()).define(["Plot","acc_data"], _6);
  const child1 = runtime.module(define1);
  main.import("vl", child1);
  main.variable(observer()).define(["vl","acc_data"], _8);
  main.variable(observer()).define(["vl","acc_data"], _9);
  main.variable(observer("viewof area1")).define("viewof area1", ["vl","acc_data"], _area1);
  main.variable(observer("area1")).define("area1", ["Generators", "viewof area1"], (G, _) => G.input(_));
  main.variable(observer("viewof area")).define("viewof area", ["vl","acc_data"], _area);
  main.variable(observer("area")).define("area", ["Generators", "viewof area"], (G, _) => G.input(_));
  main.variable(observer()).define(["vl","acc_data"], _12);
  main.variable(observer()).define(["vl","acc_data"], _13);
  main.variable(observer("viewof area4")).define("viewof area4", ["vl","acc_data"], _area4);
  main.variable(observer("area4")).define("area4", ["Generators", "viewof area4"], (G, _) => G.input(_));
  return main;
}
