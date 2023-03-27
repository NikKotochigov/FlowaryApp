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
import { getAllLogs, useGetAllLogs } from 'utils/getAllLogs';
import { TOKEN_ABI } from 'consts/contractAbi';
import provider from 'contracts/provider';
import dayjs, { Dayjs } from 'dayjs';
import Main from 'views/main/default';
import { useAccount } from 'wagmi';
import { FlashOffTwoTone } from '@mui/icons-material';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    const { address, token, decimalsToken, arrEmployee, symbolToken, owner, admin } = useSelector(contractSelector);
    const { contract } = useContract();
    const [arrayBlock, setArrayBlock] = useState([]);
    const { address: addressWallet } = useAccount();
    const [loader, setLoader] = useState(false);

    let employeeOrNot;
    if (address && addressWallet) {
        if (addressWallet === owner) employeeOrNot = undefined;
        else if (addressWallet === admin) employeeOrNot = undefined;
        else {
            employeeOrNot = arrEmployee.find((i) => i.who == addressWallet);
        }
    }

    useEffect(() => {
        getAllLogs(contract, setLoader, token, setArrayBlock, decimalsToken);
    }, [employeeOrNot]);

  //========prerpare array for dashboard=======//
  const arrayFinishedStreams = (arrayBlock.length != 0 && arrayBlock.filter((i) => i.name == 'Finished'));

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
  const arraySortedByDateForChart = Object.values(resultObject);//arr with sums & # of streams per date
  const earnArraySortedByDateForChart = arraySortedByDateForChart.map(i => Number(i.earn.toFixed(2)))// only sums - for graph
  const dateArraySortedByDateForChart = arraySortedByDateForChart.map(i => i.date)// only dates for legenda
  const valueArraySortedByDateForChart = arraySortedByDateForChart.map(i => i.id)// only # for columns

 //sum of ALL streams in money
const sumOfStreamsPerDay = (earnArraySortedByDateForChart.length != 0 && earnArraySortedByDateForChart.reduce((sum, current) => sum + current).toFixed(0))
//number of all streams, count
const valueOfStreamsPerDay = (valueArraySortedByDateForChart.length != 0 && valueArraySortedByDateForChart.reduce((sum, current) => sum + current)) || 0

const newchartData = {...chartData}

ChartDataMonth.series[0].data  = earnArraySortedByDateForChart

newchartData.options.xaxis.categories = dateArraySortedByDateForChart
newchartData.series[0].data = valueArraySortedByDateForChart
  

    console.log('MASSIV:', arrayBlock)
     
    return (
<>
 {/* {address && addressWallet ? */}

            <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard 
                        isLoading={isLoading} 
                        ChartDataMonth={{...ChartDataMonth}} 
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
                    chartData= {{...newchartData}}
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
             {/* : <Main />} */}
</>
       
        
       
    );
};

export default Dashboard;
