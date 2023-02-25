// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

const chartData = {
    height: 480,
    type: 'bar',
    options: {
        chart: {
            id: 'bar-chart',
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%'
            }
        },
        xaxis: {
            type: 'category',
            // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            categories: ['22/02/2023', '23/02/2023', '24/02/2023', '25/02/2023']

        },
        legend: {
            show: true,
            fontSize: '14px',
            fontFamily: `'Roboto', sans-serif`,
            position: 'bottom',
            offsetX: 20,
            labels: {
                useSeriesColors: false
            },
            markers: {
                width: 16,
                height: 16,
                radius: 5
            },
            itemMargin: {
                horizontal: 15,
                vertical: 8
            }
        },
        fill: {
            type: 'solid'
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            show: true
        }
    },
    series: [
        {
            name: 'Amount of streams',
            data: ['13', '4', '6']
        },
        // {
        //     name: 'Loss',
        //     data: [35, 15, 15, 35, 65, 40, 80, 25, 15, 85, 25, 75]
        // },
        // {
        //     name: 'Profit',
        //     data: [35, 145, 35, 35, 20, 105, 100, 10, 65, 45, 30, 10]
        // },
        // {
        //     name: 'Maintenance',
        //     data: [0, 0, 75, 0, 0, 115, 0, 0, 0, 0, 150, 0]
        // }
    ]
};
export default chartData;
