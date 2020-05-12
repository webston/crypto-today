import React, { FunctionComponent, useState, useEffect, useRef } from 'react'
import tw from 'twin.macro'
import {css} from '@emotion/core'
import Skeleton from 'react-loading-skeleton';
import _ from 'lodash'
import { ExpandedCoin } from './ExpandedCoin';
import { CoinIdentity } from './CoinIdentity';
import { PriceChange } from '../../lib/helpers';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Scroll from 'react-scroll';
import { motion } from 'framer-motion';
import TrackVisibility from 'react-on-screen'

const scroller = Scroll.scroller
const Element = Scroll.Element

const scrollToRef = (ref) => {  

  console.log(ref)
  
  let scroll = Scroll.animateScroll

  if(ref && ref.current) {
    scroller.scrollTo('coinData', {
      duration: 500,
      smooth: true,
      offset: -10
    })
  }
}


type Props = {
  coins: any,
  error: any,
  loading: boolean,
  searching: boolean
}

const TableHeading = tw.th`px-3 smd:px-4 lg:px-5 py-3 border-b text-14 smd:text-16`
const TableItem = tw.td`px-3 smd:px-4 lg:px-5 py-3 border-b text-14 smd:text-16`

const tableHeadItems = ['#', 'Name', 'Market Cap', 'Current Price', '24h Change', '7d Price Graph']

const CoinsTable: FunctionComponent<Props> = ({coins, error, loading, searching}) => {
  const [expandedCoins, openCoin] = useState([])  
  
  useEffect(() => {
    openCoin([])
  }, [coins])

  if(error)  {
    return (<div>There has been an error. Please try again later.</div>)
  } else {
    return (
      <table css={[tw`table-auto border smd:rounded border-separate w-full bg-white font-roboto shadow-sm`, css`border-spacing: 0;`]}>
        <thead>
          <tr css={tw`border-b text-left`}>
            {tableHeadItems.map((headItem, index) => <TableHeading css={
              [
                headItem === '#' ? tw`smd:w-67px` : null,
                headItem === 'Name' ? tw`pl-0 smd:w-200px lg:w-auto` : null,
                headItem === 'Market Cap' ? tw`hidden md:table-cell` : null,
                headItem === '7d Price Graph' ? tw`hidden smd:table-cell` : null,
              ]
            } key={index}>{headItem}</TableHeading>)}
          </tr>
        </thead>
        <tbody>
        { /* Loading Skeleton */
          searching || loading && !coins || coins.length < 1 ? 
            _.times(10, (index) => {
              return(
                <tr key={index}>
                  {
                    _.times(6, (index) => {                    
                      return (
                        <TableItem key={index} css={
                          [
                            index === 1 ? tw`pl-0` : null,
                            index === 2 ? tw`hidden md:table-cell` : null,
                            index === 4 ? tw`hidden smd:table-cell` : null]
                          }>
                          <div css={tw`smd:py-12px`}>
                            <Skeleton/>
                          </div>
                        </TableItem>
                      )
                    })
                  }
                </tr>   
              )
            })
          :
            coins.map((coin, index) => {              
              let activeCoin = false 

              let currentCoinIndex = coin.symbol 
                
              if(expandedCoins && expandedCoins.length > 0 && expandedCoins.includes(currentCoinIndex)) {
                activeCoin = true
              }
              
              return (
                <tr css={[tw`border-b w-full`, css`transition: all 0.3s; max-height: 100px;`, activeCoin ? css`max-height: 300px;` : tw`hocus:bg-gray-100 hocus:cursor-pointer`]} key={index} onClick={() => {
                  if(expandedCoins && !expandedCoins.includes(currentCoinIndex)) {
                    openCoin(prevCoins => [...prevCoins, currentCoinIndex])
                    
                    // setTimeout(() => {executeScroll()}, 500)
                  }
                }}>
                  <TableItem css={[
                      css`transition: all 0.3s;`, 
                      activeCoin ? tw`bg-gray-100` : null
                    ]} colSpan={activeCoin ? 6 : null}>
                    {
                      activeCoin && coin ? (
                        <motion.div initial={{ opacity: 0}} animate={{ opacity: 1}}>
                          <Element name="coinData" className="element"></Element>
                          <div>
                            <ExpandedCoin 
                            id={coin.id} 
                            openCoin={openCoin} 
                            image={coin.image} 
                            symbol={coin.symbol} 
                            name={coin.name} 
                            marketCap={coin.market_cap} 
                            currentPrice={coin.current_price} 
                            dayChange={coin.price_change_percentage_24h} 
                            coinIndex={currentCoinIndex}
                            />
                          </div>
                        </motion.div>
                      ) : index + 1
                    }
                  </TableItem>

                  {
                    !activeCoin && coin ? (
                      <>
                        <TableItem css={tw`pl-0`}>
                          <CoinIdentity image={coin.image} symbol={coin.symbol} name={coin.name} />
                        </TableItem>
                        <TableItem css={tw`hidden md:table-cell`}>
                          $ {coin.market_cap ? coin.market_cap.toLocaleString() : null}
                        </TableItem>
                        <TableItem>
                          $ {coin.current_price}
                        </TableItem>
                        <TableItem>
                          {
                            PriceChange(coin.price_change_percentage_24h)
                          }
                        </TableItem>
                        <TableItem css={tw`hidden smd:table-cell`}>
                          <div css={[tw`h-40px`, css`svg {height: 40px;}`]}>
                            <Sparklines data={coin.sparkline_in_7d.price} width={100} height={40}>
                              <SparklinesLine style={{fill: process.env.LIGHT_BLUE, strokeWidth: 1, stroke: '#1771F1'}} />
                            </Sparklines>
                          </div>
                        </TableItem>
                      </>
                    ) : null
                  }
                </tr>
              )
            })
        }
        </tbody>
      </table>
    )
  }
}

export default CoinsTable