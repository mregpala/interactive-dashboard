
var demographics = [];
var samples = [];
var selector = d3.select("#selDataset");
var demographicSection = d3.select("#sample-metadata")
var optionitem = "";
var names = "";
var td = [];
var tdemog = [];
var ts = [];
var tsamp = [];
var id = "";
var sample_values = [];
var sample_values_int = [];
var otu_ids = []; 
var otu_labels = [];

d3.json("../../samples.json").then((data) => {
    names = data.names.map(d => d);
    demographics = data.metadata;
    samples = data.samples;
    names.forEach(function(element){
        optionitem = selector.append("option");
        optionitem.text(element);
    })    
    });


  console.log(names[0])

function optionChanged(id) {
   
   //Filter main dataset for Id selection
   td = demographics.filter(d => {return(d.id == id)});
   
   tdemog = td.map(e => {return e});
   
   console.log(tdemog);
   
   //Demographic Section
   var ethnicity = tdemog.map(e => {return e.ethnicity});
   var gender = tdemog.map(e => {return e.gender});
   var age = tdemog.map(e => {return e.age});
   var location = tdemog.map(e => {return e.location});
   var bbtype = tdemog.map(e => {return e.bbtype});
   var wfreq = tdemog.map(e => {return e.wfreq});
   console.log(`${id}, ethnicity:${ethnicity}, gender: ${gender}, age: ${age}, location:${location}, bbtype: ${bbtype}`);
   
   demographicSection.selectAll("h4").remove();
   var demogHeader = demographicSection.append("h4");
   demogHeader.text(`id: ${id}`);
   demogHeader = demographicSection.append("h4");
   demogHeader.text(`ethnicity: ${ethnicity}`);
   demogHeader = demographicSection.append("h4");
   demogHeader.text(`gender: ${gender}`);
   demogHeader = demographicSection.append("h4");
   demogHeader.text(`age: ${age}`);
   demogHeader = demographicSection.append("h4");
   demogHeader.text(`location: ${location}`);
   demogHeader = demographicSection.append("h4");
   demogHeader.text(`bbtype: ${bbtype}`);
   demogHeader = demographicSection.append("h4");
   demogHeader.text(`wfreq: ${wfreq}`);

   //Samples Section
   ts = samples.filter(d=> {return (d.id == id)});
   tsamp = ts.map(e=>{return e});
 

   otu_ids = tsamp.map(e=>{return e.otu_ids});
   sample_values = tsamp.map(e=>{return e.sample_values});
   
   var samp = sample_values[0];
   console.log(`samp ${samp}`)
   sample_values_int = samp.map(e=>{return parseInt(e)})

   otu_labels = tsamp.map(e=>{return e.otu_labels});   
   console.log(otu_ids);
   console.log(sample_values);
   console.log(otu_labels);

  //get top 10
  var trace = {
    x: sample_values_int.slice(0,10).reverse(),
    y: otu_ids[0].slice(0,10).reverse(),
    text: otu_labels[0].slice(0,10).reverse(),
    type: "bar",
    orientation:"h",
    transform:[
        { type: "sort",
          target:"x",
          order: "descending"
       }
       ]
  };
  
  data = [trace]

  var layout = {
    title: "OTU Sample Values",
    xaxis: { title: "Sample Values",
             type:"linear" },
    yaxis: { title: "OTU ID's",
             type:"category",
             }
  };

  Plotly.react("bar", data, layout);

  //Build Scatter Plot
  var desired_maximum_marker_size = 80;
  var trace = {
      y: sample_values_int.slice(0,10).reverse(),
      x: otu_ids[0].slice(0,10).reverse(),
      text: otu_labels[0].slice(0,10).reverse(),
      type: "scatter",
      mode: "markers",
      marker: {
        size: sample_values_int.slice(0,10).reverse(),
        sizeref: 2.0 * Math.max(...sample_values_int.slice(0,10).reverse()) / (desired_maximum_marker_size**2),
        sizemode: 'area',
        colorscale: "Greens",
        color: sample_values_int.slice(0,10).reverse()
      }
    };
    
    data = [trace];
  
    var layout = {
      xaxis: { title: "OTU ID" }
    };
  
    Plotly.react("bubble", data,layout);

    //Build Gauge Chart
    

    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: parseInt(wfreq),
        title: { text: "Wash Freq" },
        type: "indicator",
        mode: "gauge+number+delta",
        // delta: { reference: 380 },
        gauge: {
          axis: { range: [null, 9],
                  nicks: 9,
                  tickmode: "auto"},
          steps: [
            { range: [0, .99], color: "#cc0000" },
            { range: [1, 1.99], color: "#ff1a1a" },
            { range: [2, 2.99], color: "#ff9999" },
            { range: [3, 3.99], color: "#ffff33" },
            { range: [4, 4.99], color: "#ffff99" },
            { range: [5, 5.99], color: "#ffffb3" },
            { range: [6, 6.99], color: "#e6ffcc" },
            { range: [7, 7.99], color: "#73e600" },
            { range: [8, 9], color: "#408000" }           
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 10
          },
          bar: {color:"black"}
        }
      }
    ];
    
    // var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
    Plotly.react('gauge', data, layout);
};
    
optionChanged("940")