import { getNativeOrderbook, paths } from '@nftearth/reservoir-sdk'
import getLocalMarketplaceData from '../lib/getLocalMarketplaceData'
import { useEffect, useState } from 'react'
import useReservoirClient from './useReservoirClient'
import useSWRImmutable from 'swr/immutable'

export type Marketplace = NonNullable<
  paths['/admin/get-marketplaces']['get']['responses']['200']['schema']['marketplaces']
>[0] & {
  isSelected: boolean
  price: number | string
  truePrice: number | string
}

export default function (
  listingEnabledOnly?: boolean,
  royaltyBps?: number,
  chainId?: number
): [Marketplace[], React.Dispatch<React.SetStateAction<Marketplace[]>>] {
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([])
  const client = useReservoirClient()
  const chain =
    chainId !== undefined
      ? client?.chains.find((chain) => chain.id === chainId)
      : client?.currentChain()
  const nativeOrderbook = getNativeOrderbook(chain?.id)
  const path = new URL(`${chain?.baseApiUrl}/admin/get-marketplaces`)

  const { data } = useSWRImmutable<
    paths['/admin/get-marketplaces']['get']['responses']['200']['schema']
  >([path.href, chain?.apiKey, client?.version], null)

  useEffect(() => {
    if (data && data.marketplaces) {
      let updatedMarketplaces: Marketplace[] =
        data.marketplaces as Marketplace[]
      if (listingEnabledOnly) {
        updatedMarketplaces = updatedMarketplaces.filter(
          (marketplace) =>
            marketplace.listingEnabled && marketplace.orderbook !== 'x2y2'
        )
      }
      updatedMarketplaces.forEach((marketplace) => {
        if (marketplace.orderbook === nativeOrderbook) {
          const data = getLocalMarketplaceData()
          marketplace.name = data.title
          marketplace.feeBps = client?.marketplaceFee
            ? client.marketplaceFee
            : 0
          marketplace.fee = {
            bps: client?.marketplaceFee || 0,
            percent: (client?.marketplaceFee || 0) / 100,
          }
          if (data.icon) {
            marketplace.imageUrl = data.icon
          }
        }
        if (marketplace.orderbook === 'opensea') {
          const osFee =
            royaltyBps && royaltyBps >= 50 ? 0 : 50 - (royaltyBps || 0)
          marketplace.fee = {
            bps: osFee,
            percent: osFee / 100,
          }
          marketplace.feeBps = osFee
        }
        marketplace.price = 0
        marketplace.truePrice = 0
        marketplace.isSelected = marketplace.orderbook === nativeOrderbook
      })
      setMarketplaces(updatedMarketplaces)
    }
  }, [data, listingEnabledOnly, royaltyBps])

  return [marketplaces, setMarketplaces]
}
