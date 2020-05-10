import React, { FunctionComponent, useState, useEffect } from "react"
import useSWR from 'swr'
import fetch from '../lib/fetch'
import tw from 'twin.macro'
import {Paragraph} from '../components/Typography'
import {DynamicLink} from '../lib/helpers'
import {FlexContainer} from '../components/Layout/FlexContainer'
import {FlexColumn} from '../components/Layout/FlexColumn'
import {Container} from '../components/Layout/Container'
import CoinsTable from "../components/Partials/CoinsTable"
import { Button } from "../components/Partials/Buttons"
import _ from 'lodash'
import { SearchField } from "../components/Partials/SearchField"
import {fetchCoins} from "../lib/helpers"

type Props = {}


const Home: FunctionComponent<Props> = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [coins, setCoins] = useState([])
  const [allCoins, setAllCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState(false)

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
      fetchCoins(1, setLoading, setCoins, setSearching, setError, foundCoins, true)
    } else {
      //Fetch all coins
      fetchCoins(1, setLoading, setCoins, setSearching, setError, false, true)
      setSearching(true)
      setCurrentPage(1)
    }
  }
  
  useEffect(() => {
    setLoading(true)
    fetchCoins(currentPage, setLoading, setCoins, setSearching, setError, false, false)
  }, [currentPage])

  useEffect(() => {
    fetch(`${process.env.API_URL}coins/list`).then(response => {
      if(Array.isArray(response) && response.length > 0) {
        setAllCoins(response)
      }
    })
  }, [])
  
  
  return (
    <Container css={tw`py-100px`}>
      <FlexContainer containerClasses={tw`flex justify-center`}>
        <FlexColumn>
          <SearchField searchFor={searchFor} />
        </FlexColumn>
        {
          !error ? (
            <FlexColumn containerClasses={tw`w-full text-right mb-10px`}>
              <Paragraph>
                API Provided by <DynamicLink href='https://www.coingecko.com/' target="_blank">CoinGecko</DynamicLink>
              </Paragraph>
            </FlexColumn>
          ) : null
        }
        <FlexColumn containerClasses={tw`flex flex-wrap justify-center w-full`}>
          {
            <CoinsTable coins={coins} error={error} loading={loading} searching={searching}/>
          }
        </FlexColumn>
        <FlexColumn containerClasses={tw`flex justify-center mt-30px`}>
          <Button label="Load More" noHref loading={loading ? true : false} onClick={() => {
            setCurrentPage(prevPage => prevPage + 1)            
          }} />
        </FlexColumn>
      </FlexContainer>
    </Container>
  )
}

export default Home