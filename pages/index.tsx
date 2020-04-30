import React, { FunctionComponent } from "react"
import useSWR from 'swr'
import fetch from '../lib/fetch'
import tw from 'twin.macro'
import {FlexContainer} from '../components/Layout/FlexContainer'
import {FlexColumn} from '../components/Layout/FlexColumn'
import {Container} from '../components/Layout/Container'
import CoinsTable from "../components/Partials/CoinsTable"

type Props = {}

const Home: FunctionComponent<Props> = () => {
  const {data, error} = useSWR<any>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false', fetch)
  
  return (
    <Container>
      <FlexContainer containerClasses={tw``}>
        <FlexColumn containerClasses={tw`flex flex-wrap justify-center w-full py-100px`}>
          {
            <CoinsTable data={data}/>
          }
        </FlexColumn>
      </FlexContainer>
    </Container>
  )
}

export default Home