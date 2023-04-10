export { executeSteps } from './executeSteps'
export { setParams } from './params'
export { pollUntilOk, pollUntilHasData } from './pollApi'
export { isOpenSeaBanned } from './isOpenSeaBanned'
export { request } from './request'

export const getNativeOrderbook = (chainId: number | undefined) => {
  if (chainId === 1101) {
    return 'nftearth'
  }

  return 'reservoir'
}

export const getNativeOrderkind = (chainId: number | undefined) => {
  if (chainId === 1101) {
    return 'nftearth'
  }

  return 'seaport'
}
