import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { useSelector } from 'react-redux';
import { contractSelector } from 'store/reducers/contract/reducer';
import useContract from 'contracts/prepareContract';
import ChartDataMonth from './chart-data/total-order-month-line-chart';
import ChartDataYear from './chart-data/total-order-year-line-chart';
import chartData from './chart-data/total-growth-bar-chart';
import { getAllLogs } from 'utils/getAllLogs';
import { TOKEN_ABI } from 'consts/contractAbi';
import provider from 'contracts/provider';
import dayjs, { Dayjs } from 'dayjs';
import Main from 'views/main/default';
import { useAccount } from 'wagmi';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    const { address, token, decimalsToken, arrEmployee, symbolToken, admin } = useSelector(contractSelector);
    const { contract } = useContract();
    const [arrayBlock, setArrayBlock] = useState([]);

    const [loader, setLoader] = useState(false);

  const [earnArraySortedByDateForChart, setEarnArraySortedByDateForChart] = useState([])
const [dateArraySortedByDateForChart, setDateArraySortedByDateForChart] = useState([])
const [valueArraySortedByDateForChart, setValueArraySortedByDateForChart] = useState([])
  
    useEffect(() =>{
        getAllLogs(contract, setLoader, token, TOKEN_ABI, provider, setArrayBlock, decimalsToken)
    },[])

// const [sumOfStreamsPerDay, setSumOfStreamsPerDay] = useState([])
// const [arraySortedByDateForChart, setArraySortedByDateForChart] = useState([])

useEffect(() => {
   if(arrayBlock.length != 0){
  //========prerpare array for dashboard=======//
  const arrayFinishedStreams = arrayBlock.filter((i) => i.name == 'Finished');

  const arrayOfErningsForDashboard = []
  for(let i=0; i < arrayFinishedStreams.length; i++){
      const dateNew = dayjs.unix(arrayFinishedStreams[i].time).format('DD/MM/YYYY')
      const earn = Number(arrayFinishedStreams[i].earned)
    const obj = {
      date: dateNew,
      earn: earn,
      id: 1
  };  
  arrayOfErningsForDashboard.push(obj)
  }
  
  const resultObject = {};
  for (let item of arrayOfErningsForDashboard) {
    const resultValue = resultObject[item.date];
    if (resultValue) {
      // у нас такой уже есть, плюсуем
      resultValue.earn += item.earn;
      resultValue.id += item.id;
    } else {
      // такого еще нету - создаем новый
      resultObject[item.date] = { ...item };
    }
  }
  const arraySortedByDateForChart = Object.values(resultObject);
  //setArraySortedByDateForChart(preArraySortedByDateForChart)

  const preEarnArraySortedByDateForChart = arraySortedByDateForChart.map(i => Number(i.earn.toFixed(2)))
  setEarnArraySortedByDateForChart(preEarnArraySortedByDateForChart)

  const preDateArraySortedByDateForChart = arraySortedByDateForChart.map(i => i.date)
setDateArraySortedByDateForChart(preDateArraySortedByDateForChart)

const preValueArraySortedByDateForChart = arraySortedByDateForChart.map(i => i.id)
setValueArraySortedByDateForChart(preValueArraySortedByDateForChart)
//  let sumOfStreamsPerDay 
//      if(EarnArraySortedByDateForChart.length != 0) 
//   const sumOfStreamsPerDay = earnArraySortedByDateForChart.reduce((sum, current) => sum + current).toFixed(0);

 }

}, [arrayBlock])


// let sumOfStreamsPerDay
// let valueOfStreamsPerDay

const [sumOfStreamsPerDay, setSumOfStreamsPerDay] = useState(0)
const [valueOfStreamsPerDay, setValueOfStreamsPerDay] = useState(0)

const newchartData = chartData

 useEffect(() => {
 if(earnArraySortedByDateForChart.length != 0)
{
    setSumOfStreamsPerDay(earnArraySortedByDateForChart.reduce((sum, current) => sum + current).toFixed(0))
    setValueOfStreamsPerDay(valueArraySortedByDateForChart.reduce((sum, current) => sum + current))
}    
ChartDataMonth.series[0].data  = earnArraySortedByDateForChart
// newchartData.options.xaxis.categories = dateArraySortedByDateForChart
newchartData.series[0].data = valueArraySortedByDateForChart
  
}, [earnArraySortedByDateForChart, valueArraySortedByDateForChart, arrayBlock]) 

    console.log('Massiv DashBOARD :', earnArraySortedByDateForChart)
     console.log('DashBOARD :', dateArraySortedByDateForChart)
     console.log('OBOROT :', valueArraySortedByDateForChart)
     
     const { address: addressWallet } = useAccount();

 

    return (
<>
 {address && addressWallet ?

            <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard 
                        isLoading={isLoading} 
                        ChartDataMonth={ChartDataMonth} 
                        sumOfStreamsPerDay={sumOfStreamsPerDay}
                        />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart 
                        isLoading={isLoading} 
                    chartData= {newchartData}
                    valueOfStreamsPerDay={valueOfStreamsPerDay}

                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard 
                        isLoading={isLoading} 
                        arrEmployee={arrEmployee} 
                        symbolToken={symbolToken}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
            : <Main />}
</>
       
        
       
    );
};

export default Dashboard;
