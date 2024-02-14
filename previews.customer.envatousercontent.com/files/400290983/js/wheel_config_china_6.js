// 6 sectors china

var wheelConfig_china_6 = {
    assetPath : 'china/',
    fontName: 'roboto_72',
    centerOffsetX: 0,
    centerOffsetY: -160,
	prizeTextTint : 0xFFFFFF,
    sectorsTextTint : 0xFFFFFF,

    // sectors config
    sectors: [
        {
            win: 100,
            text: '$100',
            isBigWin : false
        },
        {
            win: 200,
            text: '$200',
            isBigWin : false
        },
        {
            win: 300,
            text: '$300',
            isBigWin : false
        },
        {
            win: 400,
            text: '$400',
            isBigWin : false
        },
        {
            win:500,
            text: '$500',
            isBigWin : false
        },
        {
            win: 600,
            text: '$600',
            isBigWin : true
        }
    ],

    sprites: [
        {
            fileName: 'Background.png',   // filename or null
            name: 'background',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 0
        },
        {
            fileName: 'SpinButton.png',   
            name: 'spinbutton',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 790
        },
        {
            fileName: 'SpinButtonHover.png',
            name: 'spinbutton_hover',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 790
        },
        {
            fileName: 'LightSector_6.png',
            name: 'lightsector',
            originX: 0.5,
            originY: 1,
            offsetX: 0,
            offsetY: 0
        },
        {
            fileName: 'Pointer.png',
            name: 'pointer',
            originX: 0.5,
            originY: 0.4,
            offsetX: 0,
            offsetY: 0
        },
        {
            fileName: null,
            name: 'centerpin',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 0
        },
        {
            fileName: null,
            name: 'spinarrow',
            originX: 0.5,
            originY: 0.5,
            offsetX: 240,
            offsetY: -85
        },
        {
            fileName: 'Wheel_6.png', //5
            name: 'wheel',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 0
        },
        {
            fileName: 'WheelBorder.png',
            name: 'wheelborder',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 18
        }

    ],

    // wheel spin duration range, in milliseconds
    rotationTimeRange: {
        min: 3000,
        max: 4000
    },

    // wheel rounds before it stops
    wheelRounds: {
        min: 3,
        max: 4
    },

    // degrees the wheel will rotate in the opposite direction before it stops
    backSpin: {
        min: 1,
        max: 4
    },
    lightTweenDuration : 500
}





   

