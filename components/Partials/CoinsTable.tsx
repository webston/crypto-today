import { FunctionComponent } from 'react'
import tw from 'twin.macro'
import {css} from '@emotion/core'
import Skeleton from 'react-loading-skeleton';
import _ from 'lodash'

type Props = {
  data: any
}

const TableHeading = tw.th`px-5 py-3 border-b`
const TableItem = tw.td`px-5 py-3 border-b`

const tableHeadItems = ['#', 'Name', 'Last Price', '24h Change']

const CoinsTable: FunctionComponent<Props> = ({data}) => (
    <table css={[tw`table-auto border rounded border-separate w-full max-w-700`, css`border-spacing: 0;`]}>
      <thead>
        <tr css={tw`border-b text-left`}>
          {tableHeadItems.map((headItem, index) => <TableHeading key={index}>{headItem}</TableHeading>)}
        </tr>
      </thead>
      <tbody>
      {
        !data ? 
          _.times(10, () => {
            return(
              <tr>
                {
                  _.times(4, () => {
                    return (
                      <TableItem><Skeleton/></TableItem>
                    )
                  })
                }
              </tr>   
            )
          })
        :
          data.map((coin, index) => 
            <tr css={[tw`border-b w-full hocus:cursor-pointer hocus:bg-gray-100`, css`transition: all 0.3s;`]}>
              <TableItem css={tw`pr-0`}>
                {index + 1}
              </TableItem>
              <TableItem css={tw`flex `}>
                <img src={coin.image} width="20px" css={tw`mr-15px object-contain`} />
                <span css={tw`mr-15px font-bold uppercase`}>{coin.symbol}</span>
                <span>{coin.name}</span>
              </TableItem>
              <TableItem>
                $ {coin.current_price}
              </TableItem>
              <TableItem>
                {
                  coin.price_change_percentage_24h < 0 ? 
                  <span css={tw`text-red-500 p-2 `}>{coin.price_change_percentage_24h.toFixed(2) + ' %'}</span> : 
                  <span css={tw`text-green-500 p-2 `}>{'+' + coin.price_change_percentage_24h.toFixed(2) + ' %'}</span>
                }
              </TableItem>
            </tr>) 
      }
      </tbody>
    </table>
)

export default CoinsTable