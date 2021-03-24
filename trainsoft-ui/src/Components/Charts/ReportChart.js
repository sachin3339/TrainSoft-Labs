import { Line } from 'react-chartjs-2';


const ReportChart = ({ChartData,ChartType,labelLeft,labelRight}) =>{

    const lineChart = () => {
        try {
            let dataArr = []
            const data = {
                score: {
                    fill: false,
                    type: 'line',
                    label: 'Score',
                    data: [10,20,30,50,30,40,90],
                    borderColor: '#C04DD8',
                    backgroundColor: '#C04DD8',
                },
                activities: {
                    type: 'line',
                    fill: false,
                    label: 'Batch Progress',
                    data: [40,20,60,30,20,90,70],
                    borderColor: '#4ED8DA',
                    backgroundColor: '#4ED8DA',
                    // yAxisID: 'right-y-axis'
                },
            }
            switch (ChartType) {
                case 'report':
                    dataArr = [data.activities,data.score]
                    break;
                case 'analytics':
                    dataArr = [data.analytics, ]
                    break;
                    default:
                        break;
            }
            return dataArr
        } catch (err) {
            console.error("Error occurred while liveChart()", err)
        }
    }
        return (
            <> <Line
                height={150}
                data={{
                    labels: ['ITU_1','ITU_3','ITU_1','ITU_4','ITU_5','ITU_6','ITU_7'],
                    datasets: lineChart()
                }}
                options={{
                    responsive: true,
                    title: { display: false, text: 'Chart.js Line Chart' },
                    tooltips: { mode: 'index', intersect: false, },
                    hover: { mode: 'nearest', intersect: true },
                    legend: { display: true,
                        labels: {
                        boxWidth: 18
                      } },
                      elements: {
                        line: {
                            tension: 0.000001
                        },
                    },
                    maintainAspectRatio: true,
                    scales: {
                        xAxes: [{ stacked: false,gridLines: {
                            display: false,
                            color: "black"
                        }, }],
                        yAxes: [{
                            id: 'left-y-axis',
                            type: 'linear',
                            position: 'left',
                            stacked: false,
                            scaleLabel: {
								display: true,
								labelString: labelLeft
                            },
                            ticks: {
                                beginAtZero: true,
                                
                            }
                            
                            
                        }
                    ]
                    }
                }}
            /> </>)
}

export default ReportChart;