import React, { FunctionComponent } from "react"
import tw from 'twin.macro'
import {css} from "@emotion/core"

type Props = {
	containerClasses?: any
}

const FlexComponentWrapper: FunctionComponent<Props> = ({containerClasses, children}) => {
	let initialStyles = tw`w-full`

	let sectionPadding = tw`my-40px md:my-50px`

	return (
		<div css={css`${initialStyles} ${sectionPadding} ${containerClasses}`}>
			{children}
		</div>
	)
}

export {FlexComponentWrapper}
