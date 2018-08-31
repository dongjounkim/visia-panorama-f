const theme = {
    colors: {
        white: 'rgb(247, 246, 244)',
        black: 'rgb(35, 30, 26)',

        dGray: 'rgb(72, 84, 97)',
        gray: 'rgb(126, 139, 150)',

        skin: 'rgb(241, 223, 209)',
        yellow: 'rgb(241, 224, 142)',
        lBrown: 'rgb(216, 179, 154)',
        brown: 'rgb(209, 166, 124)',
        dBrown: 'rgb(204, 162, 105)',
    },

    colorsRange: [
        'rgb(209, 166, 124)', 
        'rgb(241, 223, 209)', 
        'rgb(216, 179, 154)'
    ],

    defs: [
        {
            id: 'authorsF',
            type: 'patternSquares',
            background: 'inherit',
            color: 'rgb(209, 166, 124)',
            background: 'rgb(209, 166, 124)',
            size: 4,
            padding: 0
        },
        {
            id: 'authorsM',
            type: 'patternSquares',
            background: 'inherit',
            color: 'rgb(241, 223, 209)',
            background: 'rgb(241, 223, 209)',
            size: 4,
            padding: 0
        },
        {
            id: 'authorsNA',
            type: 'patternSquares',
            background: 'inherit',
            color: 'rgb(216, 179, 154)',
            background: 'rgb(216, 179, 154)',
            size: 4,
            padding: 0
        },
        {
            id: 'bubbleChartDepth0',
            type: 'patternSquares',
            background: 'inherit',
            color: 'rgba(241, 223, 209, 0.2)',
            background: 'rgba(241, 223, 209, 0.2)',
            size: 4,
            padding: 0
        },
        {
            id: 'bubbleChartDepth2',
            type: 'patternSquares',
            background: 'inherit',
            color: 'rgb(247, 246, 244)',
            background: 'rgb(247, 246, 244)',
            size: 4,
            padding: 0
        }
    ],

    fonts : {
        size: '0.9rem',
        bigSize: '0.9rem*2'
    }
};

export default theme;