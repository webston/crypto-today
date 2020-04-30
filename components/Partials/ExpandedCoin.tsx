import React, { FunctionComponent } from "react"
import tw from 'twin.macro'
import {css} from "@emotion/core"
import { CoinIdentity } from "./CoinIdentity"
import { Paragraph, CoinData } from "../Typography"
import { PriceChange } from "../../lib/helpers"

type Props = {
    image?: string,
    symbol?: string,
    name?: string,
    marketCap?: number,
    currentPrice?: number,
    dayChange?: number,
}

const ExpandedCoin: FunctionComponent<Props> = ({image, symbol, name, marketCap, currentPrice, dayChange}) => {
	return ( 
		<div css={tw`w-full p-5`}>
            <CoinIdentity image={image} symbol={symbol} name={name} />
            <div css={tw`flex justify-between mt-30px`}>
                <div>
                    <CoinData css={tw`font-bold`}>Current Price</CoinData>
                    <CoinData>{'$ ' + currentPrice}</CoinData>
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
        </div>
	)
}

export {ExpandedCoin}
