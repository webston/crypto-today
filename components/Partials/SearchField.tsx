import React, { FunctionComponent, useState } from "react"
import { DynamicLink } from "../../lib/helpers"
import tw from "twin.macro"
import { css } from "@emotion/core"

type Props = {
    searchFor: any
}

const SearchField: FunctionComponent<Props> = ({searchFor}) => {
    return (
        <div>
            <form>
                <input type="text" css={tw`hocus:shadow-none`} onChange={val => setTimeout(searchFor(val.target.value), 1000)} />
            </form>
        </div>
    )
}

export {SearchField}
