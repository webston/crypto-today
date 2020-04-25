import React from "react"
import tw from 'twin.macro'
import {css} from "@emotion/core"
import {MQ} from '../lib/helpers'

const FlexComponentWrapper = ({children, containerClasses}) => {	
	let initialStyles = tw`w-full`

	let sectionPadding = tw`my-40px md:my-50px mdl:my-90px`

	return (
		<div css={css`${initialStyles} ${sectionPadding} ${containerClasses}`}>
			{children}
		</div>
	)
}

export default FlexComponentWrapper
