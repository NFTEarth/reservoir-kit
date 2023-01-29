import { useEffect, useState } from 'react'

export default function (contract?: string, token?: number | string) {
  const [isBanned, setIsBanned] = useState<boolean>(false)

  useEffect(() => {
    if (contract && token) {

    } else {
      setIsBanned(false)
    }
  }, [contract, token])

  return isBanned
}
