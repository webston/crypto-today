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
  }
}

const fetchCoins = (currentPage, setLoading, setCoins, setSearching, setError, ids, clean, searchedIds, setHasMoreResults, hasMoreResults) => {
  setLoading(true)

  let searchIds = ''

  if(ids || searchedIds) {
    searchIds = '&ids=' + ids

    if(!ids) {
      searchIds = '&ids=' + searchedIds
    }
  }
  
  fetch(`${process.env.API_URL}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&sparkline=true&page=${currentPage}${searchIds}`).then(response => {     
    if(Array.isArray(response) && response.length > 0) {
      setSearching(false); setLoading(false); setCoins(prevCoins => {
        return ids || (!ids && clean) ? response : [...prevCoins, ...response]
      })
    } else {
      setError(true)
    }
  })

  fetch(`${process.env.API_URL}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&sparkline=true&page=${currentPage + 1}${searchIds}`).then(response => {
    if(Array.isArray(response) && response.length > 0) {
      setHasMoreResults(true)
    } else {
      setHasMoreResults(false)
    }
  })
}

export {DynamicLink, PriceChange, fetchCoins}