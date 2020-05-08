import React, { FunctionComponent, useEffect, useState } from "react"
import tw from 'twin.macro'
import {css} from "@emotion/core"
import { CoinIdentity } from "./CoinIdentity"
import { Paragraph, CoinData } from "../Typography"
import { PriceChange } from "../../lib/helpers"
import useSWR from 'swr'
import fetch from '../../lib/fetch'
import Skeleton from "react-loading-skeleton"
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
    openCoin: any
}

const CustomSkeleton = () => {
    return (
        <div css={tw`py-12px`}>
            <Skeleton width={100}/>
        </div>
    )
}

const ExpandedCoin: FunctionComponent<Props> = ({id, image, symbol, name, marketCap, currentPrice, dayChange, openCoin}) => {
    const [chartData, setChartData] = useState()
    const [coinPrices, setCoinPrices] = useState([])
    const [coinDates, setCoinDates] = useState([])
    const [activeInterval, setInterval] = useState('24h')
    const [activeIntervalDays, setIntervalDays] = useState('1')

    let coin = useSWR(activeIntervalDays ? `${process.env.API_URL}coins/${id}/market_chart?vs_currency=usd&days=${activeIntervalDays}` : null, fetch) 

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

    const returnPrice = (price, short?) => {
        return price > 1 || price  < -1 ? [short ? price.toFixed(3) : price] : price.toFixed(6)
    }

    const intervals = [
        {
            interval: '24h',
            days: '1',
        },
        {
            interval: '7d',
            days: '7',
        },
        {
            interval: '1m',
            days: '31',
        },
        {
            interval: '3m',
            days: '93',
        },
        {
            interval: '1y',
            days: '365',
        },
        {
            interval: 'max',
            days: 'max',
        },
    ]
    
	return ( 
		<div css={tw`w-full p-3 hocus:cursor-auto`}>
            <div css={tw`flex justify-between cursor-pointer`} onClick={() => openCoin()}>
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
                        <div key={index} css={[tw`text-center hocus:cursor-pointer border border-blue px-2 py-1 rounded mx-5px text-14 font-roboto hocus:bg-light-blue`, css`transition: all 0.3s;`, activeIntervalDays === interval.days ? tw`bg-light-blue` : null]} onClick={() => {
                            setIntervalDays(interval.days)
                            setInterval(interval.interval)
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
                                mode: 'label',
                                intersect: false,
                                backgroundColor: '#FFF',
                                titleFontColor: 'black',
                                bodyFontColor: 'black',
                                callbacks: {
                                    label: (item, data) => {    
                                        const price = typeof item.yLabel == 'number' ? returnPrice(item.yLabel, true) : item.yLabel
                                        
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
                                        type: 'time',
                                        time: {
                                            unit: activeInterval === '24h' ? 'hour' : 'day',
                                            // unitStepSize: activeInterval === '24h' ? 2 : activeInterval === '7d' ? 1 : activeInterval === '1m' ? 3 : activeInterval === '3m' ? 10 : activeInterval === '1y' ? 22 : 30,
                                            displayFormats: {
                                                'day': 'DD MMM YY'
                                            },
                                        },
                                        ticks: {
                                            maxTicksLimit: activeInterval === '24h' ? 12 : activeInterval === '7d' ? 7 : 15
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
