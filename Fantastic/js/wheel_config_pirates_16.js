// 16 sectors pirates

var wheelConfig_pirates_16 = {
  assetPath: 'pirates/',
  fontName: 'roboto_72',
  centerOffsetX: 0,
  centerOffsetY: -160,
  prizeTextTint: 0x242423,
  sectorsTextTint: 0x242423,

  // sectors config
  sectors: [
    {
      win: 100,
      text: '$100',
      isBigWin: false,
    },
    {
      win: 200,
      text: '$200',
      isBigWin: false,
    },
    {
      win: 300,
      text: '$300',
      isBigWin: false,
    },
    {
      win: 400,
      text: '$400',
      isBigWin: false,
    },
    {
      win: 500,
      text: '$500',
      isBigWin: false,
    },
    {
      win: 600,
      text: '$600',
      isBigWin: false,
    },
    {
      win: 700,
      text: '$700',
      isBigWin: false,
    },
    {
      win: 800,
      text: '$800',
      isBigWin: false,
    },
    {
      win: 900,
      text: '$900',
      isBigWin: false,
    },
    {
      win: 1000,
      text: '$1000',
      isBigWin: false,
    },
    {
      win: 1100,
      text: '$1100',
      isBigWin: false,
    },
    {
      win: 1200,
      text: '$1200',
      isBigWin: false,
    },
    {
      win: 1300,
      text: '$1300',
      isBigWin: false,
    },
    {
      win: 1400,
      text: '$1400',
      isBigWin: false,
    },
    {
      win: 1500,
      text: '$1500',
      isBigWin: false,
    },
    {
      win: 1600,
      text: '$1600',
      isBigWin: true,
    },
  ],

  sprites: [
    {
      fileName: 'Background.png', // filename or null
      name: 'background',
      originX: 0.5,
      originY: 0.5,
      offsetX: 0,
      offsetY: 0,
    },
    {
      fileName: 'SpinButton.png',
      name: 'spinbutton',
      originX: 0.5,
      originY: 0.5,
      offsetX: 0,
      offsetY: 790,
    },
    {
      fileName: 'SpinButtonHover.png',
      name: 'spinbutton_hover',
      originX: 0.5,
      originY: 0.5,
      offsetX: 0,
      offsetY: 790,
    },
    {
      fileName: 'LightSector_16.png',
      name: 'lightsector',
      originX: 0.5,
      originY: 1,
      offsetX: 0,
      offsetY: 0,
    },
    {
      fileName: 'Pointer.png',
      name: 'pointer',
      originX: 0.5,
      originY: 0.3,
      offsetX: 0,
      offsetY: -300,
    },
    {
      fileName: 'CenterPin.png',
      name: 'centerpin',
      originX: 0.5,
      originY: 0.5,
      offsetX: 0,
      offsetY: 30,
    },
    {
      fileName: null,
      name: 'spinarrow',
      originX: 0.5,
      originY: 0.5,
      offsetX: 240,
      offsetY: -85,
    },
    {
      fileName: 'Wheel_16.png',
      name: 'wheel',
      originX: 0.5,
      originY: 0.5,
      offsetX: 0,
      offsetY: 0,
    },
    {
      fileName: 'WheelBorder.png',
      name: 'wheelborder',
      originX: 0.5,
      originY: 0.5,
      offsetX: 3,
      offsetY: -2,
    },
  ],

  // wheel spin duration range, in milliseconds
  rotationTimeRange: {
    min: 3000,
    max: 4000,
  },

  // wheel rounds before it stops
  wheelRounds: {
    min: 3,
    max: 4,
  },

  // degrees the wheel will rotate in the opposite direction before it stops
  backSpin: {
    min: 1,
    max: 4,
  },
  lightTweenDuration: 500,
};
