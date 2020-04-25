import React from "react"
import tw from 'twin.macro'
import {css} from "@emotion/core"

const FlexContainer = ({children, twClasses}) => {
	let initialStyles = tw`flex flex-wrap`;

	return ( 
		<div css={css`${initialStyles} ${twClasses}`}>
			{children}
		</div>
	)
}

export {FlexContainer}
