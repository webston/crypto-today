import { FunctionComponent, useState } from 'react'
import tw from 'twin.macro'
import {css} from '@emotion/core'
import Skeleton from 'react-loading-skeleton';
import _ from 'lodash'
import { ExpandedCoin } from './ExpandedCoin';
import { CoinIdentity } from './CoinIdentity';
import { PriceChange } from '../../lib/helpers';

type Props = {
  data: any,
  error: any
}

const TableHeading = tw.th`px-5 py-3 border-b`
const TableItem = tw.td`px-5 py-3 border-b`

const tableHeadItems = ['#', 'Name', 'Last Price', '24h Change']

const CoinsTable: FunctionComponent<Props> = ({data, error}) => {
  const [expandedCoin, openCoin] = useState(null)

  if(error)  {
    return (<div>There has been an error. Please try again later.</div>)
  } else {
    return (
      <table css={[tw`table-auto border rounded border-separate w-full font-roboto`, css`border-spacing: 0;`]}>
        <thead>
          <tr css={tw`border-b text-left`}>
            {tableHeadItems.map((headItem, index) => <TableHeading key={index}>{headItem}</TableHeading>)}
          </tr>
        </thead>
        <tbody>
        { /* Loading Skeleton */
          !data ? 
            _.times(10, (index) => {
              return(
                <tr key={index}>
                  {
                    _.times(4, (index) => {                    
                      return (
                        <TableItem key={index}><Skeleton/></TableItem>
                      )
                    })
                  }
                </tr>   
              )
            })
          :
            data.map((coin, index) => {
              console.log(coin);
              
              let activeCoin = false 

              if(expandedCoin === index + 1) {
                activeCoin = true
              }

              return (
                <tr css={[tw`border-b w-full hocus:cursor-pointer hocus:bg-gray-100`, css`transition: all 0.3s; max-height: 100px;`, activeCoin ? css`max-height: 300px;` : null]} key={index} onClick={() => {
                  !expandedCoin || expandedCoin !== index + 1 ? openCoin(index + 1) : openCoin(null)
                }}>
                  <TableItem css={[css`transition: all 0.3s;`, activeCoin ? tw`bg-gray-100` : null, activeCoin ? css`max-height: 200px;` : css`max-height: 100px`]} colSpan={activeCoin ? 4 : null}>
                    {
                      activeCoin ? (
                        <ExpandedCoin image={coin.image} symbol={coin.symbol} name={coin.name} marketCap={coin.market_cap} currentPrice={coin.current_price} dayChange={coin.price_change_percentage_24h} />
                      ) : index + 1
                    }
                  </TableItem>

                  {
                    !activeCoin ? (
                      <>
                        <TableItem>
                          <CoinIdentity image={coin.image} symbol={coin.symbol} name={coin.name} />
                        </TableItem>
                        <TableItem>
                          $ {coin.current_price}
                        </TableItem>
                        <TableItem>
                          {
                            PriceChange(coin.price_change_percentage_24h)
                          }
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