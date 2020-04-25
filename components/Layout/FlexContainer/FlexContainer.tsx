import React from "react"
import tw from 'twin.macro'
import {css} from "@emotion/core"

const FlexContainer = ({children, containerClasses}) => {
	let initialStyles = tw`flex flex-wrap`;

	return ( 
		<div css={css`${initialStyles} ${containerClasses}`}>
			{children}
		</div>
	)
}

export {FlexContainer}
