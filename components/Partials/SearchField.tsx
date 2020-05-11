import React, { FunctionComponent, useState } from "react"
import { DynamicLink } from "../../lib/helpers"
import tw from "twin.macro"
import { css } from "@emotion/core"
import {DebounceInput} from 'react-debounce-input';
import {BsSearch} from 'react-icons/bs'

type Props = {
    searchFor: any,
    containerClasses?: any
}

const SearchField: FunctionComponent<Props> = ({searchFor, containerClasses}) => {
    return (
        <div css={[tw`inline-block max-w-300 w-full`, containerClasses]}>
            <form css={tw`inline-block w-full`}>
                <div css={[tw`float-left relative w-full`, css`
                &:hover input, input:focus, input:active {
                    box-shadow: none; outline: none !important; border: 1px solid ${process.env.BLUE}
                }`]}> 
                    <DebounceInput
                        css={[tw`font-roboto text-14 appearance-none smd:text-16 border border-gray-300 rounded-full pl-3 pr-40px py-8px max-w-300 w-full`, css`transition: all 0.3s;`]}
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
