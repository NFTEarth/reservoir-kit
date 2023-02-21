import { getClient } from '@nftearth/reservoir-sdk'
import { constants } from 'ethers'
import { Chain, goerli, mainnet, useNetwork } from 'wagmi'
import { optimism, arbitrum } from '@wagmi/core/chains'

export default function (chainId?: number) {
  const { chains } = useNetwork()
  return getChainCurrency(chains, chainId)
}

export const getChainCurrency = (chains: Chain[], chainId?: number) => {
  const client = getClient()
  const reservoirChain = chainId
    ? client.chains.find((chain) => chain.id === chainId)
    : client.currentChain()

  let chain = chains.find((chain) => reservoirChain?.id === chain.id)

  if (!chain && chains.length > 0) {
    chain = chains[0]
  }

  const ETHChains: number[] = [mainnet.id, optimism.id, arbitrum.id, goerli.id]

  if (!chain || !chain.nativeCurrency || ETHChains.includes(chain.id)) {
    return {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      address: constants.AddressZero,
      chainId: chain?.id || mainnet.id,
    }
  } else {
    return {
      ...chain.nativeCurrency,
      address: constants.AddressZero,
      chainId: chain.id,
    }
  }
}
