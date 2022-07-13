import {
  crimsonDark,
  indigoDark,
  slateDark,
  indigoDarkA,
  blackA,
} from '@radix-ui/colors'

import { ReservoirKitTheme, sharedThemeConfig } from './ReservoirKitTheme'

const darkTheme = (overrides?: ReservoirKitTheme): any => {
  let sharedTheme = sharedThemeConfig(overrides)

  return {
    colors: {
      ...crimsonDark,
      ...indigoDark,
      ...indigoDarkA,
      ...slateDark,
      ...blackA,

      // accent colors
      accentBase: '$indigo1',
      accentBgSubtle: '$indigo2',
      accentBg: '$indigo3',
      accentBgHover: '$indigo4',
      accentBgActive: '$indigo5',
      accentLine: '$indigo6',
      accentBorder: '$indigo7',
      accentBorderHover: '$indigo8',
      accentSolid: overrides?.primaryColor || '$indigo9',
      accentSolidHover:
        overrides?.primaryHoverColor || overrides?.primaryColor || '$indigo10',
      accentText: '$indigo11',
      accentTextContrast: '$indigo12',

      // neutral colors
      neutralBase: '$slate1',
      neutralBgSubtle: '$slate2',
      neutralBg: '$slate3',
      neutralBgHover: '$slate4',
      neutralBgActive: '$slate5',
      neutalLine: '$slate6',
      neutralBorder: '$slate7',
      neutralBorderHover: '$slate8',
      neutralSolid: '$slate9',
      neutralSolidHover: '$slate10',
      neutralText: '$slate11',
      neutralTextContrast: '$slate12',

      // secondary colors
      secondaryBase: '$indigoA1',
      secondaryBgSubtle: '$indigoA2',
      secondaryBg: '$indigoA3',
      secondaryBgHover: '$indigoA4',
      secondaryBgActive: '$indigoA5',
      secondaryLine: '$indigoA6',
      secondaryBorder: '$indigoA7',
      secondaryBorderHover: '$indigoA8',
      secondarySolid: '$indigoA9',
      secondarySolidHover: '$indigoA10',
      secondaryText: '$indigoA11',
      secondaryTextContrast: '$indigoA12',

      // general colors
      borderColor: overrides?.borderColor || '$neutralBorder',
      textColor: overrides?.textColor || '$neutralTextContrast',
      focusColor: '$neutralTextContrast',
      errorText: '$crimson12',
      errorAccent: '$crimson10',

      // component colors
      inputBackground: '$neutralBgHover',
      overlayBackground: overrides?.overlayBackground || '$blackA10',
      headerBackground: overrides?.headerBackground || '$neutralBgHover',
      footerBackground: overrides?.footerBackground || '$neutralBgHover',
      contentBackground: overrides?.contentBackground || '$neutralBgSubtle',
    },
    ...sharedTheme,
  }
}
export default darkTheme
