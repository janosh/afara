export const colors = {
  blue: `#0039c1`,
  darkBlue: `#002e9d`,
  darkerBlue: `#061725`,
  lightBlue: `#42a7ff`,

  green: `#81ad46`,
  darkGreen: `#4d8711`,
  darkerGreen: `#3c660f`,
  lightGreen: `#0fc5b6`,
  lighterGreen: `#caef76`,

  yellow: `#ffac4d`,
  lightYellow: `#d6ff00`,
  darkYellow: `#ffca35`,

  orange: `#ecb517`,
  darkOrange: `#d88100`,
  lightOrange: `#ffca29`,

  red: `#de4931`,

  lighterGray: `#fafafa`,
  lightGray: `#e2e2e2`,
  gray: `#2b363f`,
  darkGray: `#1d242a`,
  darkerGray: `#1d2023`,
}

export const colorsByMode = {
  light: {
    textColor: `black`,
    linkColor: colors.blue,
    hoverColor: colors.lightBlue,
    bodyBg: `white`,
    accentBg: `white`,
    lighterBg: colors.lighterGray,
    lightBg: colors.lightGray,
    shadow: colors.gray,
    borderColor: colors.lightBlue,
    headingColor: colors.lightBlue,
    headerBg: colors.darkOrange,
    headerColor: `white`,
    transparent: `rgba(255, 255, 255, 0.8)`,
  },
  dark: {
    textColor: `white`,
    linkColor: colors.lightBlue,
    hoverColor: colors.green,
    bodyBg: colors.darkerBlue,
    accentBg: `black`,
    lighterBg: colors.darkerGray,
    lightBg: colors.darkGray,
    shadow: `black`,
    borderColor: colors.darkGreen,
    headingColor: colors.lightGreen,
    headerBg: colors.darkGray,
    headerColor: colors.lightBlue,
    transparent: `rgba(0, 0, 0, 0.5)`,
  },
}
