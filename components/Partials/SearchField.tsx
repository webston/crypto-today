import React, { FunctionComponent, useState } from "react"
import { DynamicLink } from "../../lib/helpers"
import tw from "twin.macro"
import { css } from "@emotion/core"
import {DebounceInput} from 'react-debounce-input';
import {BsSearch} from 'react-icons/bs'

type Props = {
    searchFor: any
}

const SearchField: FunctionComponent<Props> = ({searchFor}) => {
    return (
        <div css={tw`inline-block max-w-300 w-full`}>
            <form css={tw`inline-block w-full`}>
                <div css={tw`float-left relative w-full`}> 
                    <DebounceInput
                        css={[tw`hocus:shadow-none hocus:outline-none hocus:border-blue font-roboto text-14 smd:text-16 border border-gray-300 rounded-full pl-3 pr-40px py-8px max-w-300 w-full`, css`transition: all 0.3s;`]}
                        minLength={2}
                        placeholder={"Search by coin ID or name"}
                        debounceTimeout={400}
                        onChange={event => searchFor(event.target.value)} />
                    <BsSearch css={tw`absolute top-12px right-16px`} />
                </div>
            </form>
        </div>
    )
}

export {SearchField}
