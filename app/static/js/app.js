d3.selectAll(".photobanner img").on("click", function() {        
    let btn = d3.select(this);       
    let uri = btn.attr('data-nav');
    window.location.href = uri;
});

// d3.selectAll(".photobanner img").on("mouseover", function() {        
//     let img = d3.select(this);       
//     let txt = img.attr('data-nav');
//     window.location.href = uri;
// });

// d3.selectAll(".photobanner img").on("mouseout", function() {        
//     let btn = d3.select(this);       
//     let uri = btn.attr('data-nav');
//     window.location.href = uri;
// });

d3.select("#btnShowAllWards").on("click", function() {
    optionChanged("w0");
})

function filterWard(wardID)
{
    //console.log('inside filterWard wardID passed in was: '+wardID)
    optionChanged('w'+wardID);
}

// OnChange function for select. Takes in the Test Subject ID to fitler on
function optionChanged(wardID) {
    //console.log(wardID);
    if(wardID==="w0")
    {
        //console.log('show all');
        //show all
        for (let i = 1; i < 24; i++)
        {
            let w = '#w'+i;
            if (i === 13) { continue; }
            //console.log(w);
            d3.select(w).attr('class', 'row show');
        }      
        d3.select("#btnShowAllWards").classed('disabled-link', true);
    } 
    else 
    {
        //console.log('hide all');
        //hide all, then show only the id
        //show all
        for (let i = 1; i < 24; i++)
        {
            let w = '#w'+i;
            if (i === 13) { continue; }
            //console.log(w);
            d3.select(w).attr('class', 'row hide');
        }    
        //console.log('show one');
        d3.select('#'+wardID).attr('class', 'row show');
        d3.select("#btnShowAllWards").classed('disabled-link', false);
    }   
    
    
    // let gaugePlotData = getGaugeData(otuId);
    // Plotly.react('gauge', gaugePlotData.trace, gaugePlotData.layout); 
}

// d3.select('#selDataset')
//     .selectAll('option')
//     .data('{{ wards }}')
//     .enter()
//     .append('option')
//     .text(function (d) { return d; })
//     .attr('value', function (d) { return d; });    

