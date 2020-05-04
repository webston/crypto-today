import React, { FunctionComponent, useEffect, useState } from "react"
import tw from 'twin.macro'
import {css} from "@emotion/core"
import { CoinIdentity } from "./CoinIdentity"
import { Paragraph, CoinData } from "../Typography"
import { PriceChange } from "../../lib/helpers"
import useSWR from 'swr'
import fetch from '../../lib/fetch'
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Skeleton from "react-loading-skeleton"
import moment from 'moment'

type Props = {
    id: string,
    image: string,
    symbol: string,
    name: string,
    marketCap: number,
    currentPrice: number,
    dayChange: number,
}

const ExpandedCoin: FunctionComponent<Props> = ({id, image, symbol, name, marketCap, currentPrice, dayChange}) => {
    const [chartData, setChartData] = useState()
    const [activeInterval, setInterval] = useState('1')
    const [activeTickInterval, setTickInterval] = useState(30)

    let coin = useSWR(activeInterval ? `${process.env.API_URL}coins/${id}/market_chart?vs_currency=usd&days=${activeInterval}` : null, fetch) 

    useEffect(() => {
        if(coin && coin.data) {
            setChartData(coin.data.prices)
        }
    }, [coin, coin.data])
    
    const getDate = (x) => { return x[0] }
    const getPrice = (x) => { return x[1] }

    const formatXAxis = (tickItem) => {
        if(activeInterval === '1') {
            return moment(tickItem).format('HH:mm')
        } else if(activeInterval === '7' || activeInterval === '31' || activeInterval === '93') {
            return moment(tickItem).format('DD MMM YY')
        } else {
            return moment(tickItem).format('MMM YY')
        }
    }

    const formatYAxis = (tickItem) => {
        return '$ ' + tickItem 
    }

    const CustomTooltip = (data) => {
        if (data.active) {
            const price = data.payload[0].value
            return (
            <div className="custom-tooltip" css={tw`bg-white p-3`}>
                <p css={tw`text-14`}>
                    
                    <b>Price:</b> $ {
                    price > 1 || price  < -1 ? price .toFixed(2) : price.toFixed(6)}
                </p>
                <p css={tw`text-14`}>
                    {moment(data.label).format('LLL')}
                </p>
            </div>
            );
        }
    
        return null;
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
		<div css={tw`w-full p-3`}>
            <div css={tw`flex justify-between`}>
                <div>
                    {
                        !chartData ? (
                            <Skeleton/>
                        ) : <CoinIdentity image={image} symbol={symbol} name={name} />
                    }
                </div>
                <div>
                    {
                        !chartData ? (
                            <Skeleton/>
                        ) : (
                            <>
                            <CoinData css={tw`font-bold`}>Current Price</CoinData>
                            <CoinData>{'$ ' + currentPrice}</CoinData>
                            </>
                        )
                    }
                </div>
                <div>
                    <CoinData css={tw`font-bold`}>24h Change</CoinData>
                    <CoinData>{PriceChange(dayChange)}</CoinData>
                </div>
                <div>
                    <CoinData css={tw`font-bold`}>Market Cap</CoinData>
                    <CoinData>{'$ ' + marketCap.toLocaleString()}</CoinData>
                </div>
            </div>
            <div css={tw`mt-50px`}>
            {
                chartData ? (
                    <ResponsiveContainer width='100%' height={500}>
                        <AreaChart width={100} data={chartData} css={css`width: 100% !important;`}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Area type="monotone" dataKey={getPrice} dot={false} strokeWidth={1} stroke={process.env.BLUE} fill={process.env.LIGHT_BLUE} />
                            <XAxis dataKey={getDate} tickFormatter={formatXAxis} interval={activeTickInterval} tick={{fontSize: 14}} />
                            <YAxis dataKey={getPrice} tick={{fontSize: 14}} tickFormatter={formatYAxis} />
                            <Tooltip content={<CustomTooltip />} />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : null
            }
            <div css={tw`flex w-full justify-between`}>
                {
                    intervals.map((interval, index) => (
                        <div css={tw`text-center bg-green`} onClick={() => {
                            setInterval(interval.days)
                            setTickInterval(interval.tickInterval)
                        }}>
                            {interval.interval}
                        </div>            
                    ))
                }
            </div>
            </div>
        </div>
	)
}

export {ExpandedCoin}
