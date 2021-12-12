costList = [
    {wardID:0, cost:0},
    {wardID:1, cost:486000},
    {wardID:2, cost:301000},
    {wardID:3, cost:546000},
    {wardID:4, cost:1465000},
    {wardID:5, cost:551000},
    {wardID:6, cost:296000},
    {wardID:7, cost:856000},
    {wardID:8, cost:100000},
    {wardID:9, cost:600000},
    {wardID:10, cost:7000},
    {wardID:11, cost:303000},
    {wardID:12, cost:754000},
    {wardID:13, cost:0},
    {wardID:14, cost:780000},
    {wardID:15, cost:226000},
    {wardID:16, cost:578000},
    {wardID:17, cost:226000},
    {wardID:18, cost:257000},
    {wardID:19, cost:256000},
    {wardID:20, cost:500000},
    {wardID:21, cost:450000},
    {wardID:22, cost:266000},
    {wardID:23, cost:1400000}
];


// function to return the cost for the ward
function getCost(wardID) {
    let cost = costList.filter(cost => cost.wardID == wardID);    
    return cost[0];
}

// BONUS - function to return gauge data
function getGaugeData(wardID) {
    let cost = getCost(wardID);  
    
    // pie chart converted to gauge chart
    let gaugeData = {
        type: 'pie',        
        hole: 0.5,
        rotation: 90,
        direction: 'clockwise',
        values: [180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180],
        text: ['0-100k','100k-200k','200k-300k','300k-400k','400k-500k','500k-600k','600k-700k', '700kM-800k', '> 800k'],        
        textinfo: 'text',
        textposition: 'inside',
        marker: {
            colors: ['#F8F3EC','#F4F1E5','#E9E6CA','#E2E4B1','#D5E49D','#B7CC92','#8CBF88','#8ABB8F','#85B48A','transparent'],
            labels: ['0-100k','100k-200k','200k-300k','300k-400k','400k-500k','500k-600k','600k-700k', '700kM-800k', '> 800k']              
        },
        hoverinfo: "skip",
        showlegend: false
    }

    // the dot for the needle 
    let needleDot = {
        type: 'scatter', // this is the smoothest animation for the needle movement
        x: [0],
        y: [0],
        marker: {
            size: 20,
            color:'#830308'
        },
        hoverinfo: "skip",
        showlegend: false        
    }

     // offsets for the degree calculation to update the needle
    let offset = 0;  
    let d = 0;
    let c = (cost.cost * 0.00001).toFixed(3);
     switch(true) 
     {
        case (c < 2):
            d = c;
            offset = 0;
            break; 
        case (c < 4):
            d = c;
            offset = 3;
            break;
        case (c < 5):
            d = c;
            offset = 1;
            break;
        case (c < 6):
            d = c;
            offset = -.5;
            break;
        case (c < 7):
            d = c;
            offset = -2;
            break;
        case (c < 8):
            d = c;
            offset = -3;
            break;
        case (c > 9):
            d = 9;
            offset = 0;
            break;
        default:
            d = c;
            offset = 0;        
     }   

    // build the triangle needle
    let degrees = 180-(20 * d + offset); 
    let radius = .5;
    let radians = degrees * Math.PI / 180;

    let x1 = 0.025 * Math.cos((radians) * Math.PI / 180);
    let y1 = 0.025 * Math.sin((radians) * Math.PI / 180);
    let x2 = -0.025 * Math.cos((radians) * Math.PI / 180);
    let y2 = -0.025 * Math.sin((radians) * Math.PI / 180);
    let x3 = radius * Math.cos(radians);
    let y3 = radius * Math.sin(radians);

    // build the SVG path string (m = moveto, L = linetos, z = closepath) 
    let pth = 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2 + ' L ' + x3 + ' ' + y3 + ' Z';

    // layout
    let gaugeLayout = {
        title: { text: `<b>Ward ${wardID} Project Costing</b><br>(Related to all Wards dollar values)`,
            font: {
                color:'#aaaaaa'
            }
        },         
        shapes:[{
            type: 'path',
            path: pth,
            fillcolor: '#830308',
            line: {
                color: '#830308'
            }
        }],
        xaxis: {
            zeroline:false, 
            showticklabels:false,
            showgrid: false, 
            range: [-1, 1]            
        },
        yaxis: {
            zeroline:false, 
            showticklabels:false,
            showgrid: false, 
            range: [-1, 1]           
        }        
    };
  
    let data = {
        trace:[gaugeData, needleDot],
        layout:gaugeLayout
    }

    return data;
}