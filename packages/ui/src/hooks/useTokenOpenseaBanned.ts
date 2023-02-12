import { useEffect, useState } from 'react'

export default function (contract?: string, tokenId?: number | string) {
  const [isBanned, setIsBanned] = useState<boolean>(false)

  useEffect(() => {
    if (contract && tokenId) {

    } else {
      setIsBanned(false)
    }
  }, [contract, tokenId])

  return isBanned
}
