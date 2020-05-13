import React, { FunctionComponent } from "react"
import tw from 'twin.macro'
import {css} from "@emotion/core"

type Props = {
    image?: string,
    symbol?: string,
    name?: string,
}

const CoinIdentity: FunctionComponent<Props> = ({image, symbol, name}) => {
	return ( 
        <div css={tw`flex items-center`}>
            <img src={image} width={20} css={[tw`mr-5px smd:mr-15px object-contain`, css`height: 24px;`]} alt="Coin Logo" />
            <span css={tw`mr-5px smd:mr-15px font-bold uppercase`}>{symbol}</span>
            <span css={tw`hidden smd:block`}>{name}</span>
        </div>
	)
}

export {CoinIdentity}
