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
  const data = useSWR(`${process.env.API_URL}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true`, fetch)

  const coins = data.data
  const error = data.error
  
  return (
    <Container css={tw`py-100px`}>
      <FlexContainer containerClasses={tw`flex justify-center`}>
        {
          !error ? (
            <FlexColumn containerClasses={tw`w-full text-right mb-10px`}>
              <Paragraph>
                Powered by <DynamicLink href='https://www.coingecko.com/' target="_blank">CoinGecko API</DynamicLink>
              </Paragraph>
            </FlexColumn>
          ) : null
        }
        <FlexColumn containerClasses={tw`flex flex-wrap justify-center w-full`}>
          {
            <CoinsTable coins={coins} error={error}/>
          }
        </FlexColumn>
      </FlexContainer>
    </Container>
  )
}

export default Home