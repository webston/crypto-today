import tw from 'twin.macro'
import { css, keyframes } from '@emotion/core'
import isExternal from 'is-url-external';
import {useRouter} from 'next/router'
import Link from 'next/link'
import Url from 'url-parse'


const DynamicLink = ({href, children}): any => {
    if(typeof window === 'undefined') {
  		return null
    }
      
    return (
        <a href={href} css={tw`text-blue`}>
          {children}
        </a>
    )
}

const PriceChange = (percentage): any => {
  return (
    percentage < 0 ? 
      <span css={tw`text-red-500`}>{percentage.toFixed(2) + ' %'}</span> : 
      <span css={tw`text-green-500`}>{'+' + percentage.toFixed(2) + ' %'}</span>
  )
}

export {DynamicLink, PriceChange}