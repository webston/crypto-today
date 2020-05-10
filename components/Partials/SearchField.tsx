import React, { FunctionComponent, useState } from "react"
import { DynamicLink } from "../../lib/helpers"
import tw from "twin.macro"
import { css } from "@emotion/core"
import {DebounceInput} from 'react-debounce-input';

type Props = {
    searchFor: any
}

const SearchField: FunctionComponent<Props> = ({searchFor}) => {
    return (
        <div>
            <form>
                <DebounceInput
                    css={tw`hocus:shadow-none`}
                    minLength={2}
                    debounceTimeout={300}
                    onChange={event => searchFor(event.target.value)} />
            </form>
        </div>
    )
}

export {SearchField}
