import React, { FunctionComponent, useState, useEffect } from "react"
import useSWR from 'swr'
import fetch from '../lib/fetch'
import tw from 'twin.macro'
import {H1, Paragraph, Logo} from '../components/Typography'
import {DynamicLink} from '../lib/helpers'
import {FlexContainer} from '../components/Layout/FlexContainer'
import {FlexColumn} from '../components/Layout/FlexColumn'
import {Container} from '../components/Layout/Container'
import CoinsTable from "../components/Partials/CoinsTable"
import { Button } from "../components/Partials/Buttons"
import _ from 'lodash'
import { SearchField } from "../components/Partials/SearchField"
import {fetchCoins} from "../lib/helpers"
import { Footer } from "../components/Partials/Footer"

type Props = {}


const Home: FunctionComponent<Props> = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [coins, setCoins] = useState([])
  const [allCoins, setAllCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState(false)
  const [searchedIds, setSearchedIds] = useState(false)
  const [hasMoreResults, setHasMoreresults] = useState(false)

  const searchFor = (val) => {
    const foundCoinsArr = []
    
    const filteredCoins = _.filter(allCoins, (o) => {
      if(o.name.toLowerCase().includes(val.toLowerCase()) || o.symbol.toLowerCase().includes(val.toLowerCase())) {
        return foundCoinsArr.push(o.id)
      }
    })    

    let foundCoins 

    if(foundCoinsArr.length > 0) {
      foundCoins = foundCoinsArr.join()
    }
    
    if(val && val !== '') {
      //Search for input coins
      setSearching(true)
      setSearchedIds(foundCoins)
      
      fetchCoins(1, setLoading, setCoins, setSearching, setError, foundCoins, true, searchedIds, setHasMoreresults, hasMoreResults)
    } else {
      //Fetch all coins
      setSearchedIds(false)
      fetchCoins(1, setLoading, setCoins, setSearching, setError, false, true, false, setHasMoreresults, hasMoreResults)
      setSearching(true)
      setCurrentPage(1)
    }
  }
  
  useEffect(() => { //On page load
    setLoading(true)

    fetchCoins(currentPage, setLoading, setCoins, setSearching, setError, false, false, searchedIds, setHasMoreresults, hasMoreResults)
  }, [currentPage])

  useEffect(() => {
    fetch(`${process.env.API_URL}coins/list`).then(response => {
      if(Array.isArray(response) && response.length > 0) {
        setAllCoins(response)
      }
    })
  }, [])
  
  
  return (
    <Container css={tw`pb-30px`}>
      <FlexContainer containerClasses={tw`flex justify-center`}>
        <FlexColumn containerClasses={tw`w-full pt-30px pb-30px smd:pb-60px smd:flex smd:justify-between text-center smd:text-left`}>
          <Logo css={tw`w-full smd:w-auto mb-40px smd:mb-0`}>TopCryptos.<span css={tw`text-blue`}>today</span></Logo>
          <SearchField searchFor={searchFor} containerClasses={tw`w-full`} />
        </FlexColumn>
        <FlexColumn containerClasses={tw`w-full text-center flex justify-center`}>
          <H1 css={tw`mb-40px smd:mb-80px max-w-700`}>Top cryptocurrencies by market capitalization</H1>
        </FlexColumn>
        {
          !error ? (
            <FlexColumn containerClasses={tw`w-full text-right mb-10px`}>
              <Paragraph>
                Data provided by <DynamicLink href='https://www.coingecko.com/' target="_blank">CoinGecko</DynamicLink>
              </Paragraph>
            </FlexColumn>
          ) : null
        }
        <FlexColumn containerClasses={tw`flex flex-wrap justify-center w-full px-0 smd:px-15px`}>
          {
            <CoinsTable coins={coins} error={error} loading={loading} searching={searching}/>
          }
        </FlexColumn>
        {
          hasMoreResults ? (
            <FlexColumn containerClasses={tw`flex justify-center mt-30px`}>
              <Button label="Load More" noHref loading={loading ? true : false} onClick={() => {
                setCurrentPage(prevPage => prevPage + 1)            
              }} />
            </FlexColumn>
          ) : null
        }
      </FlexContainer>
      <Footer />
    </Container>
  )
}

export default Home