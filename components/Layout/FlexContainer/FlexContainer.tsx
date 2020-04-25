import React, { FunctionComponent } from "react"
import tw from 'twin.macro'
import {css} from "@emotion/core"

type Props = {
	containerClasses?: any
}

const FlexContainer: FunctionComponent<Props> = ({containerClasses, children}) => {
	let initialStyles = tw`flex flex-wrap`;

	return ( 
		<div css={css`${initialStyles} ${containerClasses}`}>
			{children}
		</div>
	)
}

export {FlexContainer}
