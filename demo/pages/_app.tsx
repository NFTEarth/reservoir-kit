import type { AppProps } from 'next/app'
import { darkTheme, globalReset } from 'stitches.config'
import '@rainbow-me/rainbowkit/styles.css'
import { ThemeProvider } from 'next-themes'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { WagmiConfig, createClient, configureChains, chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import '../fonts.css'
import {
  ReservoirKitProvider,
  darkTheme as defaultTheme,
  lightTheme,
} from '@reservoir0x/reservoir-kit-ui'

const { chains, provider } = configureChains(
  [chain.mainnet, chain.rinkeby],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Reservoir Kit',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

// decent
// {
//   font: 'ABC Monument Grotesk',
//   primaryColor: 'black',
//   primaryHoverColor: 'purple',
//   headerBackground: 'rgb(246, 234, 229)',
//   contentBackground: '#fbf3f0',
//   footerBackground: 'rgb(246, 234, 229)',
//   textColor: 'rgb(55, 65, 81)',
//   borderColor: 'rgba(0,0,0, 0)',
//   overlayBackground: 'rgba(31, 41, 55, 0.75)',
// }

function MyApp({ Component, pageProps }: AppProps) {
  globalReset()

  return (
    <ReservoirKitProvider
      options={{ apiBase: 'https://api-rinkeby.reservoir.tools' }}
      theme={defaultTheme()}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        value={{
          dark: darkTheme.className,
          light: 'light',
        }}
      >
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            {/* @ts-ignore */}
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </ReservoirKitProvider>
  )
}

export default MyApp
