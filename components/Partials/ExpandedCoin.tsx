import React, { FunctionComponent, useEffect, useState } from "react"
import tw from 'twin.macro'
import {css} from "@emotion/core"
import { CoinIdentity } from "./CoinIdentity"
import { Paragraph, CoinData } from "../Typography"
import { PriceChange } from "../../lib/helpers"
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
    openCoin: any,
    coinIndex: number
}

type CustomSkeletonProps = {
    skeletonWidth?: any,
    skeletonHeight?: any
}

const CustomSkeleton: FunctionComponent<CustomSkeletonProps> = ({skeletonWidth, skeletonHeight}) => {
    return (
        <div css={[tw`smd:py-12px`, css`max-height: 555px; height: ${skeletonHeight}`]}>
            <Skeleton width={skeletonWidth ? skeletonWidth : 100} height={skeletonHeight ? '100%' : null} />
        </div>
    )
}

const ExpandedCoin: FunctionComponent<Props> = ({id, image, symbol, name, marketCap, currentPrice, dayChange, openCoin, coinIndex}) => {
    const [chartData, setChartData] = useState()
    const [coinPrices, setCoinPrices] = useState([])
    const [coinDates, setCoinDates] = useState([])
    const [activeInterval, setInterval] = useState('24h')
    const [activeIntervalDays, setIntervalDays] = useState('1')

    useEffect(() => {

        fetch(`${process.env.API_URL}/coins/${id}/market_chart?vs_currency=usd&days=${activeIntervalDays}`).then(response => {     
            console.log(response)
            const coinData = response.prices

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
        })
    }, [activeIntervalDays])

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
		<div css={tw`w-full smd:p-3 hocus:cursor-auto overflow-hidden`}>
            <div css={tw`flex flex-wrap smd:justify-between cursor-pointer`} onClick={(el) => {
                return openCoin(prevCoins => _.filter(prevCoins, coin => coin !== coinIndex))
                }}>
                <div css={tw`w-1/2 mb-15px smd:mb-0 smd:w-auto`}>
                    {
                        !chartData ? 
                            <CustomSkeleton />
                        : <CoinIdentity image={image} symbol={symbol} name={name} />
                    }
                </div>
                <div css={tw`w-1/2 mb-15px smd:mb-0 smd:w-auto`}>
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
                <div css={tw`w-1/2 smd:w-auto`}>
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
                <div css={tw`w-1/2 smd:w-auto`}>
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
            <div css={tw`flex w-full mt-30px smd:mt-50px`}>
                {
                    !chartData ? 
                        <CustomSkeleton />
                    : 
                    intervals.map((interval, index) => (
                        <div key={index} css={[tw`text-center hocus:cursor-pointer border border-blue px-2 py-1 rounded mx-5px text-12 smd:text-14 font-roboto hocus:bg-light-blue`, css`transition: all 0.3s;`, activeIntervalDays === interval.days ? tw`bg-light-blue` : null]} onClick={() => {
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
                            animation: {
                                duration: 0
                            },
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
                ) : <CustomSkeleton skeletonWidth={'100%'} skeletonHeight={'38.33vw'} />
            }
            </div>
        </div>
	)
}

export {ExpandedCoin}
