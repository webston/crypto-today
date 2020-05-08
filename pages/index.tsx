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

type Props = {}


const Home: FunctionComponent<Props> = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [coins, setCoins] = useState([])
  const [allCoins, setAllCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const searchFor = (val) => {
    const filteredCoins = _.filter(allCoins, (o) => {
      if(o.name.toLowerCase().includes(val.toLowerCase()) || o.symbol.toLowerCase().includes(val.toLowerCase())) {
        return o
      }
    })

    console.log(filteredCoins)
  }

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.API_URL}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${currentPage}&sparkline=true`).then(response => {
      if(Array.isArray(response) && response.length > 0) {
        setLoading(false); setCoins(coins => [...coins, ...response])
      } else {
        setError(true)
      }
    })
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
            <CoinsTable coins={coins} error={error}/>
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