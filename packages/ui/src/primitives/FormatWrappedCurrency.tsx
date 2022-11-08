import React, { FC, ComponentProps } from 'react'
import FormatCrypto from './FormatCrypto'
import wrappedContracts from '../constants/wrappedContracts'
import { useNetwork } from 'wagmi'
import FormatCryptoCurrency from './FormatCryptoCurrency'

type FormatWEthProps = {
  logoWidth?: number
}

type Props = ComponentProps<typeof FormatCrypto> & FormatWEthProps

const FormatWrappedCurrency: FC<Props> = ({ logoWidth, ...props }) => {
  const { chain } = useNetwork()
  const contractAddress =
    chain?.id !== undefined && chain.id in wrappedContracts
      ? wrappedContracts[chain.id]
      : wrappedContracts[1]

  return <FormatCryptoCurrency {...props} address={contractAddress} />
}

export default FormatWrappedCurrency
