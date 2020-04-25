import Head from 'next/head'
import tw from 'twin.macro'
import {FlexContainer} from '../components/Layout'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Top Cryptos Today</title>
      </Head>

      <FlexContainer twClasses={tw`bg-black text-white`}>
      </FlexContainer>
      <main>

      </main>
    </div>
  )
}
