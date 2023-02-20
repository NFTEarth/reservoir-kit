import { paths, setParams } from '@nftearth/reservoir-sdk'
import { SWRInfiniteConfiguration } from 'swr/infinite'
import { useInfiniteApi, useReservoirClient } from './'

type TokenDetailsResponse =
  paths['/tokens/{token}/activity/v4']['get']['responses']['200']['schema']
type TokensQuery = paths['/tokens/{token}/activity/v4']['get']['parameters']['query']
type Token = paths['/tokens/{token}/activity/v4']['get']['parameters']['path']["token"]

export default function (
  token: Token,
  options?: TokensQuery | false,
  swrOptions: SWRInfiniteConfiguration = {}
) {
  const client = useReservoirClient()

  const response = useInfiniteApi<TokenDetailsResponse>(
    (pageIndex, previousPageData) => {
      if (!options) {
        return null
      }

      const url = new URL(`${client?.apiBase}/tokens/${token}/activity/v4`)
      let query: TokensQuery = { ...options }

      if (previousPageData && !previousPageData.continuation) {
        return null
      } else if (previousPageData && pageIndex > 0) {
        query.continuation = previousPageData.continuation
      }

      setParams(url, query)
      return [url.href, client?.apiKey, client?.version]
    },
    {
      revalidateOnMount: true,
      revalidateFirstPage: false,
      ...swrOptions,
    }
  )

  const activities = response.data?.flatMap((page) => page.activities) ?? []

  return {
    ...response,
    data: activities,
  }
}
