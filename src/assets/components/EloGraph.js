import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

const EloGraph = (props) => {
    const [data, setData] = useState({})
    const options = {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'month'
          },
          gridLines: {
            color: 'rgba(255, 255, 255, 0.5)',
            zeroLineColor: 'rgba(255, 255, 255, 0.9)'
          },
          ticks: {
            fontColor: 'rgba(255, 255, 255, 0.5)'
          },
        }],
        yAxes: [{
          type: 'linear',
          gridLines: {
            color: 'rgba(255, 255, 255, 0.5)',
            zeroLineColor: 'rgba(255, 255, 255, 0.9)'
          },
          ticks: {
            fontColor: 'rgba(255, 255, 255, 0.5)'
          }
        }]
      },
      tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';
                if (label) {
                    label += ':';
                }
                label += Math.round(tooltipItem.value * 100) / 100;
                label += ` |  Elo Change: ${data.datasets[tooltipItem.datasetIndex].eloChange[tooltipItem.index]}`
                label += ` | Match Name: ${data.datasets[tooltipItem.datasetIndex].matchNames[tooltipItem.index]}`
                
                return label;
            }
        }
     },
     maintainAspectRatio: false,
     responsive: true
    }
    
    useEffect(() => {
      let labels = []
      let dataset = {
        label: 'ELO', 
        data: [], 
        fill: false, 
        backgroundColor: 'rgb(255, 99, 132)', 
        borderColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 5,
        cubicInterpolationMode: 'monotone',
        matchNames: [],
        eloChange: []
      }
      
      for (let i in props.history) {
        let row = props.history[i];
        let x = Date.parse(row['start_time']);
        labels.push(x);
        dataset['data'].push(row['new_elo']);
        dataset['matchNames'].push(row['name'])
        dataset['eloChange'].push(row['elo_change'])
      }
      setData({
        labels: labels,
        datasets : [dataset]
      })
    }, [props.history])


    return (
      <Line data={data} options={options} height={400}/>
    )
    
}

export default EloGraph