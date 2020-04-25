import React, { FunctionComponent } from "react"
import tw from 'twin.macro'
import {css} from "@emotion/core"

type Props = {
	containerClasses?: any
}

const FlexColumn: FunctionComponent<Props> = ({containerClasses, children}) => {
	let initialStyles = tw`px-20px`;
	
	return (
		<div css={css`${initialStyles} ${containerClasses}`}>
			{children}
		</div>
	)
}

export {FlexColumn}
