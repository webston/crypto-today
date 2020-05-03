import React, { FunctionComponent, useEffect } from "react"
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
    const coin = useSWR(`${process.env.API_URL}coins/${id}/market_chart?vs_currency=usd&days=180`, fetch)
    let chartData
    
    if(coin.data) {
        chartData = coin.data.prices
    }
    
    const getDate = (x) => { return x[0] }
    const getPrice = (x) => { return x[1] }

    const formatXAxis = (tickItem) => {
        return moment(tickItem).format('MMM YY')
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
    };
    
    
	return ( 
		<div css={tw`w-full p-3`}>
            <div css={tw`flex justify-between`}>
                <div>
                    {
                        !coin ? (
                            <Skeleton/>
                        ) : <CoinIdentity image={image} symbol={symbol} name={name} />
                    }
                </div>
                <div>
                    {
                        !coin ? (
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
                            <XAxis dataKey={getDate} tickFormatter={formatXAxis} interval={30} tick={{fontSize: 14}} />
                            <YAxis dataKey={getPrice} tick={{fontSize: 14}} tickFormatter={formatYAxis} />
                            <Tooltip content={<CustomTooltip />} />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : null
            }
            </div>
        </div>
	)
}

export {ExpandedCoin}
