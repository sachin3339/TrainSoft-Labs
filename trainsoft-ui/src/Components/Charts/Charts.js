import { Bar } from 'react-chartjs-2';


const Charts = ({ChartData,ChartType,labelLeft,labelRight}) =>{

    const lineChart = () => {
        try {
            let dataArr = []
            const data = {
                activities: {
                    type: 'bar',
                    fill: true,
                    label: '',
                    data: [10,20,30,20],
                    borderColor: '#00CCF2',
                    backgroundColor: '#00CCF2',
                    // yAxisID: 'right-y-axis'
                },
                course: {
                    type: 'bar',
                    fill: true,
                    label: '',
                    data: [10,20,30,20],
                    borderColor: '#00CCF2',
                    backgroundColor: '#00CCF2',
                    // yAxisID: 'right-y-axis'
                },
                analytics: {
                    fill: false,
                    type: 'line',
                    label: '',
                    data: [10,20,30],
                    borderColor: '#ff6384',
                    backgroundColor: '#ff6384',
                    yAxisID: 'right-y-axis'
                },
            }
            switch (ChartType) {
                case 'activities':
                    dataArr = [data.activities]
                    break;
                case 'course':
                    dataArr = [data.course ]
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
            <> <Bar
                height={150}
                data={{
                    labels: ["js","ML","Java","Python"],
                    datasets: lineChart()
                }}
                options={{
                    responsive: true,
                    title: { display: false, text: 'Chart.js Line Chart' },
                    tooltips: { mode: 'index', intersect: false, },
                    hover: { mode: 'nearest', intersect: true },
                    legend: { display: false,
                        labels: {
                        boxWidth: 18
                      } },
                    maintainAspectRatio: true,
                    scales: {
                        xAxes: [{ stacked: true,gridLines: {
                            display: false,
                            color: "black"
                        }, }],
                        yAxes: [{
                            id: 'left-y-axis',
                            type: 'linear',
                            position: 'left',
                            stacked: true,
                            scaleLabel: {
								display: true,
								labelString: labelLeft
                            },
                            ticks: {
                                beginAtZero: true
                            }
                            
                        }
                    ]
                    }
                }}
            /> </>)
}

export default Charts;