import tw from 'twin.macro'
import { css, keyframes } from '@emotion/core'
import isExternal from 'is-url-external';
import {useRouter} from 'next/router'
import Link from 'next/link'
import Url from 'url-parse'
import fetch from '../lib/fetch'


const DynamicLink = ({href, children, target}): any => {
    if(typeof window === 'undefined') {
  		return null
    }
      
    return (
        <a href={href} css={tw`text-blue`} target={target}>
          {children}
        </a>
    )
}

const PriceChange = (percentage): any => {  
  if(percentage) {
    return (
      percentage < 0 ? 
        <span css={tw`text-red`}>{percentage.toFixed(2) + ' %'}</span> : 
        <span css={tw`text-green`}>{'+' + percentage.toFixed(2) + ' %'}</span>
    )
  } else {
    return (
      <span>-</span>
    )
  }
}

const fetchCoins = (currentPage, setLoading, setCoins, setSearching, setError, ids, clean) => {
  setLoading(true)

  let searchIds

  if(ids) {
    searchIds = '&ids=' + ids
  }
  
  fetch(`${process.env.API_URL}coins/markets?vs_currency=usd&${searchIds}order=market_cap_desc&per_page=50&page=${currentPage}&sparkline=true`).then(response => {     
    if(Array.isArray(response) && response.length > 0) {
      setSearching(false); setLoading(false); setCoins(prevCoins => {
        return ids || (!ids && clean) ? response : [...prevCoins, ...response]
      })
    } else {
      setError(true)
    }
  })
}

export {DynamicLink, PriceChange, fetchCoins}