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
        <div css={tw`flex`}>
            <img src={image} width={20} css={[tw`mr-15px object-contain`, css`height: 24px;`]} />
            <span css={tw`mr-15px font-bold uppercase`}>{symbol}</span>
            <span>{name}</span>
        </div>
	)
}

export {CoinIdentity}
