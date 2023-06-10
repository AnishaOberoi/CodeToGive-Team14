var yes = document.getElementById('div-yes').dataset.yes
var no = document.getElementById('div-no').dataset.no
var total = document.getElementById('div-total').dataset.total
console.log(total);
console.log(yes);
console.log(no);

var trace1 = {
    type: 'bar',
    x: ["yes", "no"],
    y: [yes, no],
    marker: {
        color: '#C8A2C8',
        line: {
            width: 2.5
        }
    }
};

var data = [trace1];

var layout = {
    title: 'Number of people who know about addiction',
    font: { size: 18 }
};

var config = { responsive: true }

Plotly.newPlot('myDiv', data, layout, config);

// const ctx = document.getElementById('myChart');

// new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Yes', 'No'],
//         datasets: [{
//             label: 'Number of people who know what is addiction',
//             data: [yes, no],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });
