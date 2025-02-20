import { NextPage } from 'next'
import { CartPopover, useDynamicTokens } from '@nftearth/reservoir-kit-ui'
import { useState } from 'react'
import ThemeSwitcher from 'components/ThemeSwitcher'
import { useModal } from 'connectkit'

const DEFAULT_COLLECTION_ID =
  process.env.NEXT_PUBLIC_DEFAULT_COLLECTION_ID ||
  '0x99030c3f880a468ed74806fb2785afd2da54a2f4'

const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

const CartPage: NextPage = () => {
  const { setOpen } = useModal()
  const [collectionId, setCollectionId] = useState(DEFAULT_COLLECTION_ID)
  const {
    data: tokens,
    remove,
    add,
  } = useDynamicTokens(
    collectionId
      ? {
          collection: collectionId,
          limit: 100,
          includeDynamicPricing: true,
        }
      : false
  )

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        gap: 12,
        padding: 24,
        flexDirection: 'column',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
      }}
    >
      <CartPopover
        trigger={<button>Cart</button>}
        onConnectWallet={() => {
          setOpen(true)
        }}
      />
      <div>
        <label>Collection Id: </label>
        <input
          placeholder="Collection Id"
          type="text"
          value={collectionId}
          onChange={(e) => setCollectionId(e.target.value)}
          style={{ width: 250 }}
        />
      </div>
      {tokens.map((token) => {
        return (
          <div key={token?.token?.tokenId} style={{ display: 'flex', gap: 12 }}>
            <input
              type="checkbox"
              checked={token.isInCart}
              onChange={() => {}}
              onClick={() => {
                if (!token?.token || !token.token.collection?.id || !CHAIN_ID) {
                  return
                }

                if (token.isInCart) {
                  remove([
                    `${token.token.collection.id}:${token.token.tokenId}`,
                  ])
                } else {
                  add([token], Number(CHAIN_ID))
                }
              }}
            />
            <div>
              <div>
                Name: {token?.token?.name} - {token?.token?.tokenId}
              </div>
              <div>Price: {token.market?.floorAsk?.price?.amount?.decimal}</div>
            </div>
          </div>
        )
      })}
      <ThemeSwitcher />
    </div>
  )
}

export default CartPage
