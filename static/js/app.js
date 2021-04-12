
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
   //get top 10


   otu_ids = tsamp.map(e=>{return e.otu_ids});
   sample_values = tsamp.map(e=>{return e.sample_values});
   otu_labels = tsamp.map(e=>{return e.otu_labels});   
   console.log(otu_ids);
   console.log(sample_values);
   console.log(otu_labels);

};
    
optionChanged("940")