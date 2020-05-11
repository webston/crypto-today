import React, { FunctionComponent } from "react"
import { DynamicLink, MQ } from "../../lib/helpers"
import tw from "twin.macro"
import { css } from "@emotion/core"
import BeatLoader from  "react-spinners/BeatLoader"
import { FlexColumn } from "../Layout/FlexColumn"
import { FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FlexContainer } from "../Layout/FlexContainer"
import { Paragraph } from "../Typography"

type Props = {
}

const Footer: FunctionComponent<Props> = () => {
    const socialMediaIconsStyling = [tw`text-20 text-gray-600 hocus:text-blue`, css`transition: all 0.3s;`]
    return (
        <FlexContainer containerClasses={tw`mt-100px`}>
            <FlexColumn containerClasses={tw`w-full`}>
                <div css={tw`flex flex-wrap justify-center mb-20px`}>
                    <a href="https://twitter.com/harryChakryan" target="_blank">
                        <FaTwitter css={[tw`mr-10px`, socialMediaIconsStyling]} />
                    </a>
                    <a href="https://www.linkedin.com/in/harrychakryan/" target="_blank">
                        <FaLinkedinIn css={[tw`text-20`, socialMediaIconsStyling]}/>
                    </a>
                </div>
                <Paragraph css={tw`text-center`}>
                    Made by Harry Chakryan
                </Paragraph>
            </FlexColumn>
        </FlexContainer>
    )
}

export {Footer}
