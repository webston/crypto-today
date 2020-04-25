import React from "react"
import tw from 'twin.macro'
import {css} from "@emotion/core"

const FlexColumn = ({children, containerClasses}) => {
	let initialStyles = tw`px-20px smd:px-20px mdl:px-15px`;

	return (
		<div css={css`${initialStyles} ${containerClasses}`}>
			{children}
		</div>
	)
}

export default FlexColumn
