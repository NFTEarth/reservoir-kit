import React from 'react'

import {
  Flex,
  Box,
  Input,
  FormatCurrency,
  FormatEth,
  Text,
} from '../../primitives'

import { EthLogo } from '../../primitives/FormatEth'

type MarketPlaceInputProps = {
  name: string
  imgURL: string
  fee: number
  price: number
  // without rounding
  truePrice: number
  ethUsdPrice: number
  onChange: (e: any) => void
}

const MarketplacePriceInput = ({
  name,
  imgURL,
  fee,
  price,
  truePrice,
  ethUsdPrice,
  onChange,
  ...props
}: MarketPlaceInputProps) => {
  let profit = (1 - (fee || 0)) * Number(truePrice)

  return (
    <Flex {...props} align="center">
      <Box css={{ mr: '$2' }}>
        <img src={imgURL} style={{ height: 32, width: 32, borderRadius: 4 }} />
      </Box>
      <Flex align="center">
        <EthLogo width={10} />
        <Text style="body1" color="subtle" css={{ ml: '$1', mr: '$4' }} as="p">
          ETH
        </Text>
      </Flex>
      <Box css={{ flex: 1 }}>
        <Input type="number" value={price} onChange={onChange} />
      </Box>
      <Flex direction="column" align="end" css={{ ml: '$3' }}>
        <FormatEth amount={profit} textStyle="h6" logoWidth={12} />
        <FormatCurrency
          amount={profit * ethUsdPrice}
          style="subtitle2"
          color="subtle"
        />
      </Flex>
    </Flex>
  )
}

export default MarketplacePriceInput
