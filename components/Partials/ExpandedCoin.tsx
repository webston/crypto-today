import React, { FunctionComponent, useEffect, useState } from "react"
import tw from 'twin.macro'
import {css} from "@emotion/core"
import { CoinIdentity } from "./CoinIdentity"
import { Paragraph, CoinData } from "../Typography"
import { PriceChange } from "../../lib/helpers"
import useSWR from 'swr'
import fetch from '../../lib/fetch'
// import { ResponsiveContainer, AreaChart, Area, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Skeleton from "react-loading-skeleton"
import moment from 'moment'
import { Line } from 'react-chartjs-2';
import _ from 'lodash'


type Props = {
    id: string,
    image: string,
    symbol: string,
    name: string,
    marketCap: number,
    currentPrice: number,
    dayChange: number,
}

const CustomSkeleton = () => {
    return (
        <div css={tw`py-12px`}>
            <Skeleton width={100}/>
        </div>
    )
}

const ExpandedCoin: FunctionComponent<Props> = ({id, image, symbol, name, marketCap, currentPrice, dayChange}) => {
    const [chartData, setChartData] = useState()
    const [coinPrices, setCoinPrices] = useState([])
    const [coinDates, setCoinDates] = useState([])
    const [activeInterval, setInterval] = useState('1')
    const [activeTickInterval, setTickInterval] = useState(30)

    let coin = useSWR(activeInterval ? `${process.env.API_URL}coins/${id}/market_chart?vs_currency=usd&days=${activeInterval}` : null, fetch) 

    useEffect(() => {
        if(coin && coin.data) {
            const coinData = coin.data.prices

            setChartData(coinData)

            let prices = [] 
            
            let dates = []
                    
            _.each(coinData, (data) => {
                dates.push(data[0])
                prices.push(data[1])
            })

            if(dates && prices) {
                setCoinPrices(prices)
                setCoinDates(dates)
            }
        }
    }, [coin, coin.data])

    const returnPrice = (price) => {
        return price > 1 || price  < -1 ? price.toFixed(3) : price.toFixed(6)
    }

    const intervals = [
        {
            interval: '24h',
            days: '1',
            tickInterval: 30
        },
        {
            interval: '7d',
            days: '7',
            tickInterval: 24
        },
        {
            interval: '1m',
            days: '31',
            tickInterval: 100
        },
        {
            interval: '3m',
            days: '93',
            tickInterval: 10
        },
        {
            interval: '1y',
            days: '365',
            tickInterval: 31
        },
        {
            interval: 'max',
            days: 'max',
            tickInterval: 62
        },
    ]
    
	return ( 
		<div css={tw`w-full p-3 hocus:cursor-auto`}>
            <div css={tw`flex justify-between`}>
                <div>
                    {
                        !chartData ? 
                            <CustomSkeleton />
                        : <CoinIdentity image={image} symbol={symbol} name={name} />
                    }
                </div>
                <div>
                    {
                        !chartData ? 
                            <CustomSkeleton />
                        : (
                            <>
                            <CoinData css={tw`font-bold`}>Current Price</CoinData>
                            <CoinData>{'$ ' + currentPrice}</CoinData>
                            </>
                        )
                    }
                </div>
                <div>
                    {
                        !chartData ? 
                            <CustomSkeleton />
                        : (
                            <>
                                <CoinData css={tw`font-bold`}>24h Change</CoinData>
                                <CoinData>{PriceChange(dayChange)}</CoinData>
                            </>
                        )
                    }
                </div>
                <div>
                    {
                        !chartData ? 
                            <CustomSkeleton />
                        : (
                            <>
                                <CoinData css={tw`font-bold`}>Market Cap</CoinData>
                                <CoinData>{'$ ' + marketCap.toLocaleString()}</CoinData>
                            </>
                        )
                    }
                </div>
            </div>
            <div css={tw`flex w-full mt-50px`}>
                {
                    !chartData ? 
                        <CustomSkeleton />
                    : 
                    intervals.map((interval, index) => (
                        <div css={[tw`text-center hocus:cursor-pointer border border-blue px-2 py-1 rounded mx-5px text-14 font-roboto hocus:bg-light-blue`, css`transition: all 0.3s;`, activeInterval === interval.days ? tw`bg-light-blue` : null]} onClick={() => {
                            setInterval(interval.days)
                            setTickInterval(interval.tickInterval)
                        }}>
                            {interval.interval}
                        </div>            
                    ))
                }
            </div>
            <div css={tw`mt-20px`}>
            {
                chartData ? (
                    <Line data={
                        {
                            labels: coinDates,
                            datasets: [{
                                data: coinPrices,
                                borderColor: process.env.BLUE,
                                borderWidth: 1, 
                                backgroundColor: process.env.LIGHT_BLUE,
                                pointRadius: 0
                            }],
                        }
                    }
                    
                    options={
                        {
                            responsive: true,
                            tooltips: {
                                mode: 'index',
                                intersect: false,
                                backgroundColor: '#FFF',
                                titleFontColor: 'black',
                                bodyFontColor: 'black',
                                callbacks: {
                                    title: (item) => {
                                        return moment.unix(parseInt(item[0].label)/1000).format('LLL')
                                    },
                                    label: (item, data) => {    
                                        const price = typeof item.yLabel == 'number' ? returnPrice(item.yLabel) : item.yLabel
                                        
                                        return ' $ ' + price
                                    }
                                }
                            },
                            legend: {
                                display: false
                            },
                            hover: {
                                mode: 'index',
                                intersect: false
                            },
                            elements: {
                                line: {
                                    tension: 0
                                }
                            },
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            callback: (value, index, values) => {
                                                return '$ ' + returnPrice(value)
                                            },
                                        },
                                    }
                                ],
                                xAxes: [
                                    {
                                        ticks: {
                                            callback: (value, index, values) => {

                                                if(activeInterval === '1') {
                                                    return moment(value).format('HH:mm')
                                                } else if(activeInterval === '7' || activeInterval === '31' || activeInterval === '93') {
                                                    return moment(value).format('DD MMM YY')
                                                } else {
                                                    return moment(value).format('MMM YY')
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }/>
                ) : <CustomSkeleton />
            }
            </div>
        </div>
	)
}

export {ExpandedCoin}
