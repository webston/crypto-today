import React, { FunctionComponent } from "react"
import { DynamicLink } from "../../lib/helpers"
import tw from "twin.macro"
import { css } from "@emotion/core"
import BeatLoader from  "react-spinners/BeatLoader"

type Props = {
    onClick?: any,
    noHref?: boolean,
    children?: any,
    label: string,
    loading?: boolean
}

const Button: FunctionComponent<Props> = ({onClick, noHref, children, label, loading}) => {
    const buttonStyle = [tw`rounded bg-blue hocus:cursor-pointer text-14 smd:text-16 px-4 py-3 font-roboto hocus:bg-opacity-blue text-white`, css`transition: all 0.3s; > div {display: flex; justify-content: center; padding-top: 5px; padding-bottom: 5px;}`]

    if(noHref) {
        return (
            <div css={buttonStyle} onClick={onClick}>
                {
                    loading ? (<BeatLoader color={"#FFFFFF"} size={10} />) : label
                }
            </div>
        )
    }
}

export {Button}
