import { ethers } from 'ethers';

export const getAllLogs = async (contract, setLoader, token, TOKEN_ABI, provider, setArrayBlock, decimalsToken ) => {
        try {
            setLoader(true);
          //--------  EVENT#1 (from Blockchain)   StartFlow ---------------
            const result = [];

            const numActive = (await contract.amountActiveStreams()).toNumber();

            if (numActive > 0) {
                for (let i = 0; i < numActive; i++) {
                    const addressEmployee = await contract.activeStreamAddress(i);
                    const timeStarted = await contract.getStream(addressEmployee);

                    const obj = {
                        name: 'Active',
                        addr: addressEmployee,
                        time: timeStarted.startAt.toNumber() //startedAt
                    };

                    result.push(obj);
                }
            }
            // console.log("RESSSS: ", result)

            //--------  EVENT#2   StreamFinished ---------------
            const eventFinish = await contract.queryFilter(contract.filters.StreamFinished());

            for (let i = 0; i < eventFinish.length; i++) {
                const addressEmployee = eventFinish[i].args[0];

                const startTime = eventFinish[i].args[3].toNumber();

                const finishTime = eventFinish[i].args[2].toNumber();
                let arrDecimals=[1]
                for (let i=0; i < decimalsToken; i++){
                  const zero = '0'
                  arrDecimals.push(zero)
                }
              const decimal = +arrDecimals.join('')
                const earnedTokens = ((eventFinish[i].args[1])/decimal).toString();
              
                console.log('18 nulei', decimal)
                const txHash = eventFinish[i].transactionHash;

                const obj = {
                    name: 'Finished',
                    addr: addressEmployee,
                    startAt: startTime,
                    time: finishTime, //endeddAt
                    earned: earnedTokens,
                    txHash: txHash
                };

                result.push(obj);
            }
            // console.log("RESSSS 2:", result)

            //--------  EVENT#3   StreamAllFinished ---------------
            // const eventAllFinish = await contract.queryFilter(contract.filters.StreamAllFinished());

            // for (let i = 0; i < eventAllFinish.length; i++) {
            //     const amountEmployee = eventAllFinish[i].args[0].toNumber();
            //     const endsAt = eventAllFinish[i].args[1].toNumber();
            //     const txHash = eventAllFinish[i].transactionHash;

            //     const obj = {
            //         name: 'Finish All',
            //         time: endsAt,
            //         amountEmployee: amountEmployee,
            //         txHash: txHash
            //     };

            //     result.push(obj);
            // }

            // console.log("RESSSS 3:", result)

            //--------  EVENT#4   Deposit -------------
            const contractStableCoin = new ethers.Contract(token, TOKEN_ABI, provider);
            const filterTo = contractStableCoin.filters.Transfer(null, contract.address);

            const transerEvents = await contractStableCoin.queryFilter(filterTo);

            for (let i = 0; i < transerEvents.length; i++) {
                const amountDeposit = transerEvents[i].args[2].toString();
                const txHash = transerEvents[i].transactionHash;

                const blockNumber = transerEvents[i].blockNumber;
                const blockTimestamp = (await provider.getBlock(blockNumber)).timestamp;

                const obj = {
                    name: 'Deposit',
                    time: blockTimestamp,
                    amount: ethers.utils.formatUnits(amountDeposit, decimalsToken),
                    // amount: Number(ethers.utils.formatUnits(Number(amountDeposit), decimalsToken)).toFixed(2)
                    txHash: txHash
                };

                result.push(obj);
            }

            //--------  EVENT#5   Withdraw -------------

            const filterFrom = contractStableCoin.filters.Transfer(contract.address, await contract.owner());

            const withdrawEvents = await contractStableCoin.queryFilter(filterFrom);

            for (let i = 0; i < withdrawEvents.length; i++) {
                const amountDeposit = withdrawEvents[i].args[2].toString();
                const txHash = withdrawEvents[i].transactionHash;

                const blockNumber = withdrawEvents[i].blockNumber;
                const blockTimestamp = (await provider.getBlock(blockNumber)).timestamp;

                const obj = {
                    name: 'Withdraw',
                    time: blockTimestamp,
                    amount: ethers.utils.formatUnits(amountDeposit, decimalsToken),
                    txHash: txHash
                };

                result.push(obj);
            }

            // SORT BY TIME!!!!

            // //--------  EVENT#3   ADD_EMPLOYEE ---------------
            // const eventAddEmployee = await companyContract.queryFilter(companyContract.filters.AddEmployee());
            // console.log("All Events ADD EMPLOYEE: ", eventAddEmployee)
            setArrayBlock(result);
            setLoader(false);

        } catch (error) {
            console.log('DEV>>>>', error);
        }
    }