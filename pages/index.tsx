import Head from 'next/head'
import tw from 'twin.macro'
import {FlexContainer} from '../components/Layout/FlexContainer'
import {FlexColumn} from '../components/Layout/FlexColumn'
import { Container } from '../components/Layout/Container'

export default function Home() {
  return (
    <Container>
      <FlexContainer containerClasses={tw`bg-black text-white`}>
        <FlexColumn containerClasses={tw``}>

        </FlexColumn>
      </FlexContainer>
    </Container>
  )
}
