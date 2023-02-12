import { constants } from 'ethers'
import { goerli, mainnet, useNetwork } from 'wagmi'
import { optimism, arbitrum } from '@wagmi/core/chains'

export default function () {
  const { chain: activeChain, chains } = useNetwork()

  let chain = chains.find((chain) => activeChain?.id === chain.id)

  if (!chain && chains.length > 0) {
    chain = chains[0]
  } else {
    chain = activeChain
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
