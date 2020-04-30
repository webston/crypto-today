import React, { FunctionComponent } from "react"
import useSWR from 'swr'
import fetch from '../lib/fetch'
import tw from 'twin.macro'
import {Paragraph} from '../components/Typography'
import {DynamicLink} from '../lib/helpers'
import {FlexContainer} from '../components/Layout/FlexContainer'
import {FlexColumn} from '../components/Layout/FlexColumn'
import {Container} from '../components/Layout/Container'
import CoinsTable from "../components/Partials/CoinsTable"

type Props = {}

const Home: FunctionComponent<Props> = () => {
  const {data, error} = useSWR<any>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false', fetch)
  
  return (
    <Container css={tw`py-100px`}>
      <FlexContainer containerClasses={tw`flex justify-center`}>
        <FlexColumn containerClasses={tw`w-full max-w-700 text-right mb-10px`}>
          <Paragraph>
            Powered by <DynamicLink href='https://www.coingecko.com/'>CoinGecko API</DynamicLink>
          </Paragraph>
        </FlexColumn>
        <FlexColumn containerClasses={tw`flex flex-wrap justify-center w-full max-w-700`}>
          {
            <CoinsTable data={data} error={error}/>
          }
        </FlexColumn>
      </FlexContainer>
    </Container>
  )
}

export default Home