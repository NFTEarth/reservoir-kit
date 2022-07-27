import { Box, Flex } from '../../primitives'
import React, { FC, ComponentPropsWithoutRef } from 'react'
import { styled, keyframes } from '../../../stitches.config'

type Props = {
  fromImg: string
  toImg: string
} & ComponentPropsWithoutRef<typeof Flex>

const Img = styled('img', {
  width: 56,
  height: 56,
  borderRadius: 4,
})

const ProgressDot = styled(Box, {
  borderRadius: '50%',
  width: 5,
  height: 5,
})

const loadingStart = keyframes({
  '0%': { transform: 'scale(0.8)', backgroundColor: '$neutralSolid' },
  '20%': { transform: 'scale(1)', backgroundColor: '$accentText' },
  '100%': { transform: 'scale(0.8)', backgroundColor: '$neutralSolid' },
})

const loadingMiddle = keyframes({
  '0%': { transform: 'scale(0.8)', backgroundColor: '$neutralSolid' },
  '20%': { transform: 'scale(0.8)', backgroundColor: '$neutralSolid' },
  '40%': { transform: 'scale(1)', backgroundColor: '$accentText' },
  '100%': { transform: 'scale(0.8)', backgroundColor: '$neutralSolid' },
})

const loadingEnd = keyframes({
  '0%': { transform: 'scale(0.8)', backgroundColor: '$neutralSolid' },
  '40%': { transform: 'scale(0.8)', backgroundColor: '$neutralSolid' },
  '60%': { transform: 'scale(1)', backgroundColor: '$accentText' },
  '100%': { transform: 'scale(0.8)', backgroundColor: '$neutralSolid' },
})

const ListingTransactionProgress: FC<Props> = ({
  fromImg,
  toImg,
  ...props
}) => {
  return (
    <Flex {...props} align="center">
      <Img src={fromImg} />
      <Flex css={{ gap: '$1', mx: 23 }}>
        <ProgressDot
          css={{ animation: `${loadingStart} 1s ease-in-out infinite` }}
        />
        <ProgressDot
          css={{ animation: `${loadingMiddle} 1s ease-in-out infinite` }}
        />
        <ProgressDot
          css={{ animation: `${loadingEnd} 1s ease-in-out infinite` }}
        />
      </Flex>
      <Img src={toImg} />
    </Flex>
  )
}

export default ListingTransactionProgress
