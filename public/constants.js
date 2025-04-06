const moves = ['R', 'R2', 'R\'', 'F', 'F2', 'F\'', 'U', 'U2', 'U\''];

const METHODS = {
    CLL: 'CLL',
    EG1: 'EG-1',
    EG2: 'EG-2',
    LEG1: 'LEG-1',
    TCLLP: 'TCLL+',
    TCLLM: 'TCLL-',
    LS1: 'LS1',
    LS2: 'LS2',
    LS3: 'LS3',
    LS4: 'LS4',
    LS5: 'LS5',
    LS6: 'LS6',
    LS7: 'LS7',
    LS8: 'LS8',
    LS9: 'LS9'
};

const getMethodGroup = (method) => {
    switch (method) {
        case METHODS.CLL:
        case METHODS.EG1:
        case METHODS.EG2:
        case METHODS.LEG1:
            return 'EG';
        case METHODS.TCLLP:
        case METHODS.TCLLM:
            return 'TCLL'
        case METHODS.CLL:
        case METHODS.LS1:
        case METHODS.LS2:
        case METHODS.LS3:
        case METHODS.LS4:
        case METHODS.LS5:
        case METHODS.LS6:
        case METHODS.LS7:
        case METHODS.LS8:
        case METHODS.LS9:
            return 'LS';
        default:
            return ''
    }
}

const COLORS = {
    WHITE: 'w',
    YELLOW: 'y',
    BLUE: 'b',
    GREEN: 'g',
    ORANGE: 'o',
    RED: 'r',
};

const OPPOSITE_COLOR = {
    [COLORS.WHITE]: COLORS.YELLOW,
    [COLORS.YELLOW]: COLORS.WHITE,
    [COLORS.BLUE]: COLORS.GREEN,
    [COLORS.GREEN]: COLORS.BLUE,
    [COLORS.RED]: COLORS.ORANGE,
    [COLORS.ORANGE]: COLORS.RED
};

const METHOD_DATA = {
    CLL: [
        {
            NICKNAME: 'PBL',
            OLL: [0, 1, 2, 3],
            WRAPPER: [8, 9, 20, 21, 12, 13, 16, 17],
            0: [""],
            1: ["F R U' R' U' R U R' F' R U R' U' R' F R F'", "R U R U' R' F R' F' R U R' U' R' F R F'", "R U2 R' U2 R' F R F' R U' R' F R' F' R"],
            2: ["R U R' F' R U R' U' R' F R2 U' R'", "U' R' U R' F2 R F' R' F2 R2"],
            3: ["U2 R U R' F' R U R' U' R' F R2 U' R'", "U R' U R' F2 R F' R' F2 R2"],
            4: ["U' R U R' F' R U R' U' R' F R2 U' R'", "U2 R' U R' F2 R F' R' F2 R2"],
            5: ["U R U R' F' R U R' U' R' F R2 U' R'", "R' U R' F2 R F' R' F2 R2"]
        },
        {
            NICKNAME: 'Sune',
            OLL: [2, 9, 13, 21],
            WRAPPER: [8, 20, 3, 12, 1, 16, 0, 17],
            0: ["R U R' U R U2 R'", "U' R' U2 R U R' U R"],
            1: ["U' R' F R2 F' U' R' U' R2 U R'", "U2 R U R' U R' F R F' R U2 R'"],
            2: ["F R' F' R U2 R U2 R'", "R U' R2 U R U F R' F' R U R'", "U2 R2 U R2 F' U' F R2 U' R2"],
            3: ["R U' R' F R' F' R", "U2 R2 U R' U' R' F R F' R'", "U F U' F' R U' R' F"],
            4: ["U2 R U' R U' R' U R' U' F R' F'", "R U2 R' F R U2 R' U R U' R' F", "U R' F' R2 U R' F' R' F R2 U' R'"],
            5: ["R' F2 R U2 R U' R' F", "F R' F' R U R U2 R' F R' F' R", "U R2 U' R2 F R' F' R2 U R2"]
        },
        {
            NICKNAME: 'Anti-Sune',
            OLL: [0, 8, 12, 20],
            WRAPPER: [17, 3, 9, 1, 21, 13, 16, 2],
            0: ["R' U' R U' R' U2 R", "U R U2 R' U' R U' R'", "U2 R' F' R U' R' F2 R"],
            1: ["R U2 R' F R' F' R U' R U' R'", "U2 R' U R U' R2 F R F' R U R' U' R", "U' R U' R2 U R U F R2 F' R", "U2 R' F R' F' R U R U' R2 F R F' R", "U2 R U' R' U R U R2 F R F' U2 R U R'"],
            2: ["U2 F' R U R' U2 R' F2 R", "U2 R' F R2 F' U' R' U' R F R' F' R", "U2 R2 U' R2 F R F' R2 U R2"],
            3: ["U2 R' F R F' R U R'", "U R F R' F' R U R U' R2"],
            5: ["U R U R2 F' R F R U' R2 F R", "U2 R' F2 R F' R' F2 R U' R' F R F'", "F R F' U R U' R U R' U R'", "R2 F R U2 R U' R' U2 F' R", "R U R' U' R' F R F' R U2 R' U' R U' R'"],
            4: ["U2 R U2 R' U2 R' F R F'", "U' R U' R' F R F' U' R' U' R2 U R'", "U' R2 U R2 F' U F R2 U' R2"]
        },
        {
            NICKNAME: 'Pi',
            OLL: [9, 12, 16, 17],
            WRAPPER: [2, 20, 3, 1, 21, 0, 13, 8],
            0: ["R U' R2 U R2 U R2 U' R", "R' U R2 U' R2 U' R2 U R'", "F R U R' U' R U R' U' F'", "U2 F U R U' R' U R U' R' F'", "R U2 R2 U' R2 U' R2 U2 R", "R U2 R' U R U' R' U2 R U' R'"],
            1: ["U' R' U' R' F R F' R U' R' U2 R", "U2 R U R' U R U' B U' B' R'", "U R' U2 R U R' F R' F' R U R", "U2 R2 U' R2 F R2 F' R2 U R2", "R U' R' U2 R' F R F' U2 R U R'", "U2 R U' R' U2 F R' F' R U2 R U R'"],
            3: ["U2 R' F R F' R U' R' U' R U' R'", "R U' R' F R' F R U R' F R"],
            2: ["U' R U' R U' R' U R' F R2 F'", "U F R2 U' R2 U R2 U R2 F'", "U' F R' F' R U' R U R' U R' F R F'", "F R' F' R U2 R U R' F R' F' R"],
            4: ["R U2 R' U' R U R' U2 R' F R F'", "U F' R U R' U2 R' F R U' R' F2 R"],
            5: ["U F R' F' R U2 R U' R' U R U2 R'", "U2 R' F2 R U R' F' R U2 R U' R' F", "R U' R' F R' F' R U' R U' R' F R' F' R", "R' F2 R F' U2 R U' R' U' F"]
        },
        {
            NICKNAME: 'U',
            OLL: [1, 3, 16, 17],
            WRAPPER: [2, 9, 20, 21, 12, 0, 13, 8],
            1: ["F R U R' U' F'", "R' U' F R' F' R U R", "U2 F U R U' R' F'", "U2 R' U' R' F R F' U R", "U' R F R F' U' R'"],
            0: ["U R' U' R2 U R' U2 R U2 R' U R'", "U' R U R2 U' R U2 R' U2 R U' R", "R2 F2 R U R U2 R2 F' R U' R", "R' F R F' R' F R F' R U R' U' R U R'", "U' R2 F2 R U R' F U' R U R2", "F2 R2 U' R' F R' F U' F", "R2 F2 R U R' F R2 U2 R' U' R"],
            3: ["U' F R U R' U2 F' R U' R' F", "z' U2 R' U' R2 U' R' U' R U' R'", "U2 R U R' U R U' R U' R' F R' F'", "U2 F' R U R' U' R' F R2 U R' U R U2 R'"],
            2: ["F R' F' R U' R U' R' U2 R U' R'", "U x R U' R U' R' U R' F' R"],
            4: ["U R U' R2 F R F' R U R' U' R U R'", "U' R U2 R' U R' F2 R F' R' F2 R", "U R2 U2 R U R' U F R F' R", "U2 R2 U' R' U R' F R F' R2 U' R'"],
            5: ["U R' U R' F R F' R U2 R' U R", "U' R2 U R' U' R' F R2 F' U' R'", "U' R2 U R' U' R2 U' y R' F2 R", "U R F' U' R' U' R2 U R' U' R' F R", "U2 F' R U R' U' R' F R2 U' R' F R' F' R"]
        },
        {
            NICKNAME: 'L',
            OLL: [0, 3, 8, 21],
            WRAPPER: [17, 9, 20, 12, 1, 13, 16, 2],
            4: ["F R U' R' U' R U R' F'", "U' R U R U' R' F R' F'", "U F' R U R' U' R' F R", "F R2 F' U2 R' U' R", "R' F R y' U R U' R'"],
            2: ["F R' F' R U R U' R'", "F R' F' R U R U' R'", "U2 L' U' L' U L F' L F", "F R' F' U' R' U R", "U2 R' U2 R U2 F R F'"],
            1: ["R U2 R2 F R F' R U2 R'", "U' R U2 R' F R' F' R2 U2 R'", "U2 R' U' R U R' F' R U R' U' R' F R2", "U2 R' F2 R F' R U R2 F2 R", "U R' F2 R2 U' R' F R' F2 R"],
            0: ["U R' U R' U2 R U' R' U R U' R2", "U2 R2 U R' U' R U R' U2 R U' R", "U R2 U' R U2 R' U2 R U' R2"],
            3: ["U' R U' R' U R U' R' F R' F' R2 U R'", "R U R' U' R' F R2 F' U' R' U' R", "U R U' R' F R' F' R2 U R' U' R' F R F'", "U' F R2 F' U' R' U' R2 U R' U' R'"],
            5: ["R' U' R U2 R' F R' F' R U' R", "U' R' F' R U R' U' R' F R2 U' R' U2 R", "U2 R' F R U' R' F R F' R U R2 F' R", "U' F R F' R U R2 U' R' F R F'", "U2 R U R' U R' F R F' U2 R' F R F'"]
        },
        {
            NICKNAME: 'T',
            OLL: [1, 3, 8, 13],
            WRAPPER: [17, 9, 20, 21, 12, 16, 0, 2],
            4: ["R U R' U' R' F R F'", "U2 F' L' F L' U' L U L", "F' U' F U R U R'", "U' F R' F' U2 R' U2 R"],
            5: ["U2 R' F' R U R U' R' F", "F R F' R U R' U' R'", "F R F' U' R' U' R", "U R U2 F R F' U2 R'", "R' U R U2 F R2 F'"],
            1: ["U F U' R U2 R' U' F2 R U R'", "R2 U2 R' U2 R' F R F' U' R'", "U2 R U2 R2 F R F' R U' R' U R U2 R'", "U' R U F R' F' R U2 R U2 R2"],
            0: ["U' R' U R' U2 R U2 R' U R2 U' R'", "U R' U R U2 R2 F' R U' R' F2 R2", "R U R' U R U2 R2 F' R U' R' F2 R", "U2 R' U R' F U' R U F2 R2"],
            2: ["U2 R U R' U2 R U R' U R' F R F'", "U' F R F' R U R' U R' U' R U' R'", "U R U2 R' U R U2 R' U R' F R F'"],
            3: ["U R' U R U2 R2 F R F' R", "R U2 R' U' R2 U' R' F R' F'", "U' R' F R U2 R2 F R U' R", "U' R' F R' F' R2 U2 R' U' R", "U R U R2 F R F' U R U R'"]
        },
        {
            NICKNAME: 'H',
            OLL: [8, 9, 12, 13],
            WRAPPER: [17, 20, 3, 1, 21, 16, 0, 2],
            0: ["R2 U2 R' U2 R2", "R2 U2 R U2 R2", "R U' R' U' R U' R' U R U R'", "U' R U R' U R U' R' U R U2 R'", "R U2 R' U' R U R' U' R U' R'"],
            1: ["U R U' R' F R' F' R2 U' R' F R' F' R", "U' R U' R' F R' F' R2 U' R' F R' F' R", "U R2 F' U2 F2 R2 F' R2", "U' R2 F' U2 F2 R2 F' R2", "x' U2 R U2 R2 F2 R U2", "U2 x' U2 R U2 R2 F2 R U2"],
            2: ["U' F R2 U' R2 U' R2 U R2 F'"],
            3: ["U F R2 U' R2 U' R2 U R2 F'"],
            4: ["U' R U R' U R U R' F R' F' R"],
            5: ["U R U R' U R U R' F R' F' R"]
        }
    ],
    EG1: [
        {
            NICKNAME: 'PBL',
            OLL: [0, 1, 2, 3],
            WRAPPER: [8, 9, 20, 21, 12, 13, 16, 17],
            0: ["y' R' U R' U' R' F R2 U' R' U' R U R' F' R2"],
            1: ["R U' R' U' R' F2 U' R U R"],
            2: ["U R2 U' R2 U2 F2 U' R2"],
            3: ["U' R2 U' R2 U2 F2 U' R2"],
            4: ["R2 U' R2 U2 F2 U' R2"],
            5: ["U2 R2 U' R2 U2 F2 U' R2"]
        },
        {
            NICKNAME: 'Sune',
            OLL: [2, 9, 13, 21],
            WRAPPER: [8, 20, 3, 12, 1, 16, 0, 17],
            0: ["U2 R U R' U F R U' R2 F' R", "U' F' L U2 F2 R U'", "U R U' R2 F' R F U R' F R"],
            1: ["R U R' F2 U F R U R'", "U2 F R2 U' R2 F U' F2 U' R"],
            2: ["U2 F R' F' R U R' F' R2 U R'", "U' R' F R U2 R U' R2 F2 R F'"],
            3: ["F' U R U' R' U F R U R'", "U' R U' R' F U' R' F R2 U R' F'", "R U R' F' U R U2 R' U2 R U R'"],
            4: ["R U' R' U R U' R' U F R U' R'"],
            5: ["R' F R2 U' R' U R U' R' F"]
        },
        {
            NICKNAME: 'Anti-Sune',
            OLL: [0, 8, 12, 20],
            WRAPPER: [17, 3, 9, 1, 21, 13, 16, 2],
            0: ["U R' F R2 U R' F' U' R U' R'", "U' B U' R2 F2 U' F"],
            1: ["U R U' R' F' U' F2 R U' R'"],
            2: ["F' R U R' U' R U R2 F' R"],
            3: ["R U' R' F' U' R U R' U' F", "U' R U R' F R U' R' U2 R' F R"],
            5: ["U' R U R' F' U' R U R' U' R U R'", "R' F2 R U' R U R' F' R U' R'"],
            4: ["U2 R U' R2 F R U' R' F R F'"]
        },
        {
            NICKNAME: 'Pi',
            OLL: [9, 12, 16, 17],
            WRAPPER: [2, 20, 3, 1, 21, 0, 13, 8],
            0: ["U2 F2 R U R' U2 R U R' U' F"],
            1: ["U' R U' R2 F R2 U' R'", "U' R U R2 F' R2 U R'", "U' R' F R2 U' R2 F R", "U' R' F' R2 U R2 F' R"],
            3: ["U' F R' F U' F2 R U R"],
            2: ["U' R U' R' U R U' R' F R U' R'"],
            4: ["U F U' R U2 R' F' R U R' F'", "R U' R2 F R U R U' R' U' R' F R F' "],
            5: ["F R U' R' F R U2 R' U F'", "U' R' F' R U' R' F R2 U R' F' R U R'"]
        },
        {
            NICKNAME: 'U',
            OLL: [1, 3, 16, 17],
            WRAPPER: [2, 9, 20, 21, 12, 0, 13, 8],
            1: ["R U R' U R U R2 F R2 U' R'", "R U' R2 F R2 U R' U' R U' R'"],
            0: ["U' y R' U R' U' R U' R' U' F2 R2"],
            3: ["U F' U2 R U2 R' U2 F", "U' R U' R2 F2 R F' U R U R'"],
            2: ["U2 R' F R F' R' F R2 U' R'", "R U' R' F R U' R2 F R "],
            4: ["U2 R' F R F' U R U' R' F R U' R'",],
            5: ["U' R' F R U' R' F R U' R U R' F'", "U' R' F R2 U' R' y' U R U R'"]
        },
        {
            NICKNAME: 'L',
            OLL: [0, 3, 8, 21],
            WRAPPER: [17, 9, 20, 12, 1, 13, 16, 2],
            4: ["R U' R' U R U' R2 F' R F", "U R U R' F' R U2 R' U2 R U R'"],
            2: ["U2 R' F R F' R' F R U R U2 R'", "U R' F R U' R' F R2 U R' F'"],
            1: ["R' U R2 U' R2 U' F R2 U' R'"],
            0: ["R' F R2 U R' F' R U2 R'", "R U2 R' F R U' R2 F' R", "U R U' R2 F' R F R' F2 R", "U R' F2 R F' R' F R2 U R'"],
            3: ["U R U R' F' R U R' U' F R' F' R"],
            5: ["U R' U2 F R U2 R U' R2 F"]
        },
        {
            NICKNAME: 'T',
            OLL: [1, 3, 8, 13],
            WRAPPER: [17, 9, 20, 21, 12, 16, 0, 2],
            4: ["U F R U' R2 F' R U R' F' R", "R U' R2 F R2 U R' U2 R' F R F'"],
            5: ["U F' R' F R2 U R' U' R U R'"],
            1: ["R' F R2 U' R' U' R' F2 R", "U2 R U' R2 F R U R U2 R'"],
            0: ["R2 B2 U' R' U' R U' R' U R'", "U' R' U F R2 U' R2 U' F U' R"],
            2: ["U2 R U R2 F' R F R' F' R", "R' F' R2 U R' F' R U R'"],
            3: ["U' R U' R' U2 F R U2 R' F"]
        },
        {
            NICKNAME: 'H',
            OLL: [8, 9, 12, 13],
            WRAPPER: [17, 20, 3, 1, 21, 16, 0, 2],
            0: ["R' F R2 U' R2 U' F U R"],
            1: ["F' U R U' R2 F2 R U' F"],
            2: ["U2 R U R' F' R U R' U' R U R'"],
            3: ["R U R' F' R U R' U' R U R'"],
            4: ["R' F R F' U2 F R U2 R' F", "R' U' R' F2 U F' R F'"],
            5: ["U2 R' F R F' U2 F R U2 R' F"]
        }
    ],
    EG2: [
        {
            NICKNAME: 'PBL',
            OLL: [0, 1, 2, 3],
            WRAPPER: [8, 9, 20, 21, 12, 13, 16, 17],
            0: ["F R2 U2 R' U R U2 R2 F R F' R' F'"],
            1: ["R2 F2 R2"],
            2: ["U R' U R' F2 R F' R", "U' R U' R F2 R' U R'"],
            3: ["U' R' U R' F2 R F' R", "U R U' R F2 R' U R'"],
            4: ["R' U R' F2 R F' R", "U2 R U' R F2 R' U R'"],
            5: ["U2 R' U R' F2 R F' R", "R U' R F2 R' U R'"]
        },
        {
            NICKNAME: 'Sune',
            OLL: [2, 9, 13, 21],
            WRAPPER: [8, 20, 3, 12, 1, 16, 0, 17],
            0: ["U' F U' R2 U' R' U2 R U' R2 F'"],
            1: ["R U R' U R U2 R B2 R2"],
            2: ["R U' R' F R' F' R' F2 R2"],
            3: ["U F R2 F' R2 F' R U' R"],
            4: ["F' R' U R' U2 F R' U R'"],
            5: ["R2 B2 R' U' R' F R' F' R"]
        },
        {
            NICKNAME: 'Anti-Sune',
            OLL: [0, 8, 12, 20],
            WRAPPER: [17, 3, 9, 1, 21, 13, 16, 2],
            0: ["U2 R' U R U' R2 F R F' R U R' U' R' F2 R2"],
            1: ["R' U' R U' R' U2 R' F2 R2"],
            2: ["U2 R' F R F' R U R B2 R2"],
            3: ["R' U2 R U' R2 F' R U' F R"],
            5: ["R2 B2 R2 F' R U R' U2 R' F2 R"],
            4: ["U2 R2 F2 R F R F' R U R'"]
        },
        {
            NICKNAME: 'Pi',
            OLL: [9, 12, 16, 17],
            WRAPPER: [2, 20, 3, 1, 21, 0, 13, 8],
            0: ["F U' R U2 R U' R' U R' F'"],
            1: ["R' U2 R2 U' R' F2 R2 F'"],
            3: ["U2 R' F' U R' F R2 U2 R' U R"],
            2: ["U R' F U' R U R' F2 U2 R"],
            4: ["U R' U' R' F2 R2 U R' F2 R"],
            5: ["U R' U2 R U' R2 F2 R F R"]
        },
        {
            NICKNAME: 'U',
            OLL: [1, 3, 16, 17],
            WRAPPER: [2, 9, 20, 21, 12, 0, 13, 8],
            1: ["F U' R U2 R U' R' U2 R' U' F'"],
            0: ["F R U R' U' F R2 B2"],
            3: ["U' R' U' R U R' F2 R U' R' U R"],
            2: ["U2 R' U R' F' R U' R U R' F2 R"],
            4: ["U' R U' R' U2 R B R' U2 R U' R'"],
            5: ["U' R' F R U2 R' U' R U2 R' F R"]
        },
        {
            NICKNAME: 'L',
            OLL: [0, 3, 8, 21],
            WRAPPER: [17, 9, 20, 12, 1, 13, 16, 2],
            4: ["R' U' R' F' R U' R U' R' F R"],
            2: ["U R2 B2 R' U R U' R' F R' F'"],
            1: ["R' U' F2 R U2 R' U2 F R"],
            0: ["U2 R' U' R U R' F' R U R' U' R' F' R2"],
            3: ["F R' F' R U R U' R B2 R2"],
            5: ["U F' R U R' U' R' F R' F2 R2"]
        },
        {
            NICKNAME: 'T',
            OLL: [1, 3, 8, 13],
            WRAPPER: [17, 9, 20, 21, 12, 16, 0, 2],
            4: ["F R F' R U R' U' R B2 R2"],
            5: ["R U R' U' R' F R F' R2 B2 R2"],
            1: ["U R' U R U2 R2 F' R U' R"],
            0: ["U' R2 B2 R2 F R U R' U' F'"],
            2: ["U R' U R U2 R2 F R F' R' F2 R2"],
            3: ["U2 R' U2 R' F2 R F2 R"]
        },
        {
            NICKNAME: 'H',
            OLL: [8, 9, 12, 13],
            WRAPPER: [17, 20, 3, 1, 21, 16, 0, 2],
            0: ["U R2 F U2 F2 R2 F' R2"],
            1: ["R2 U2 R' U2 F2 R2"],
            2: ["U2 R U2 B2 R' U R U' B R'"],
            3: ["R U2 B2 R' U R U' B R'"],
            4: ["U' R' U' R U2 R2 F' R U' F R"],
            5: ["U R' U' R U2 R2 F' R U' F R"],
        }
    ],
    LEG1: [
        {
            NICKNAME: 'PBL',
            OLL: [0, 1, 2, 3],
            WRAPPER: [8, 9, 20, 21, 12, 13, 16, 17],
            0: "R' U R' U' R' F R2 U' R' U' R U R' F' R2",
            1: "R2 U R2 U' R2 U R2 U' R2",
            2: "F2 U' R2 U2 B2 U' R2",
            3: "U2 F2 U' R2 U2 B2 U' R2",
            4: "U' F2 U' R2 U2 B2 U' R2",
            5: "U F2 U' R2 U2 B2 U' R2"
        },
        {
            NICKNAME: 'Sune',
            OLL: [2, 9, 13, 21],
            WRAPPER: [8, 20, 3, 12, 1, 16, 0, 17],
            0: "U2 R' F U2 R2 F R'",
            1: "U' R U R2 F' U F2 R2 F'",
            2: "U2 F R' F' R2 U2 R U' R2",
            3: "U R2 U' R2 F' R U2 R' U2 R' F",
            4: "U2 F2 R F' U R' F U' R2",
            5: "U' R U2 R U' R2 F R2 F'"
        },
        {
            NICKNAME: 'Anti-Sune',
            OLL: [0, 8, 12, 20],
            WRAPPER: [17, 3, 9, 1, 21, 13, 16, 2],
            0: "U2 x' R U' R2 U R2 B2 R'",
            1: "U R2 U R2 U' R U2 R' U' R U R'",
            2: "U' F R2 F' R2 U R' U2 R'",
            3: "U' F' R U2 R U2 R' F R2 U R2",
            5: "U2 R2 U R2 U2 R' F R F' R U' R'",
            4: "U2 R2 U R' U2 R2 F R F'"
        },
        {
            NICKNAME: 'Pi',
            OLL: [9, 12, 16, 17],
            WRAPPER: [2, 20, 3, 1, 21, 0, 13, 8],
            0: "U' R F R' F' U R U' R2 F R F'",
            1: "U' R U R' U' R U2 R U' R2",
            3: "U2 R F' U R' F2 U R F",
            2: "U' R2 U R' F R F' U R'",
            4: "U R U' R' F R F' R2 U2 R",
            5: "U R U R' U R2 U' R2 F R2 F'"
        },
        {
            NICKNAME: 'U',
            OLL: [1, 3, 16, 17],
            WRAPPER: [2, 9, 20, 21, 12, 0, 13, 8],
            1: "R U' R U R' U R U R2",
            0: "U' R F R' F' R U' R' F' U' F",
            3: "R2 U2 R' U' R' F R F' U R'",
            2: "U' F' U' F R2 U' R' U R U' R'",
            4: "U' R2 U R' U2 R' F' U' F",
            5: "U R2 U' R U2 R F R F'"
        },
        {
            NICKNAME: 'L',
            OLL: [0, 3, 8, 21],
            WRAPPER: [17, 9, 20, 12, 1, 13, 16, 2],
            4: "U' R U2 F R' F' R U2 R U R2",
            2: "U2 R U' R' U' R2 U' R2 F R F'",
            1: "R' U R' U R2 U' R U2 R'",
            0: "R' F U2 R2 F R U2 R U2 R2",
            3: "F' U F R U2 R U' R2",
            5: "U2 R' U2 R' F R2 F' U' R"
        },
        {
            NICKNAME: 'T',
            OLL: [1, 3, 8, 13],
            WRAPPER: [17, 9, 20, 21, 12, 16, 0, 2],
            4: "U R U R' U' F' R' U2 R U' F",
            5: "U R U' F R2 F' U R U' R2",
            1: "U2 R U2 R' U2 R U2 R U' R2",
            0: "U F R F' R' F R2 F' U R' U R",
            2: "U2 R U R' U' R U R2 F' U F",
            3: "U' R' F R2 F' R' U2 F R F'"
        },
        {
            NICKNAME: 'H',
            OLL: [8, 9, 12, 13],
            WRAPPER: [17, 20, 3, 1, 21, 16, 0, 2],
            0: "R F2 R F' R' F U' F",
            1: "R2 U' R U' R' U R' U' R U' R2",
            2: "U2 R U2 R U' F R F' R",
            3: "R U2 R U' F R F' R",
            4: "U2 R2 B2 R' U R' F' R U R' U' R U R'",
            5: "R2 B2 R' U R' F' R U R' U' R U R'"
        }
    ],
    TCLLP: [
        {
            NICKNAME: 'Hammer',
            OLL: [0, 17, 20, 21],
            WRAPPER: [2, 3, 9, 12, 1, 13, 16, 8],
            0: ["R' F R F' R' F R F'"],
            1: ["U' y' R' U' R' F R F' R U R' U' R"],
            2: ["U y' R' U' R U' R2 F R F' R"],
            3: ["U2 R' F' R U2 R U R' F2"],
            4: ["U R' U R U' R U' R2 F R2 F'"],
            5: ["y' R' U2 R U' F R' F'"]
        },
        {
            NICKNAME: 'Spaceship',
            OLL: [2, 9, 16, 21],
            WRAPPER: [8, 20, 3, 12, 1, 0, 13, 17],
            0: "U2 y' R' U' R U R' U' R",
            1: "U R' F R F' R' F R U R U' R' F'",
            2: "U R U' R' U R2 U' R' F R' F'",
            3: "U2 R U' R' F R F' R U R2 U' R U' R'",
            4: "U R U2 R' U R' F R F' R U' R'",
            5: "U R U' R2 F R U R U' R' F'"
        },
        {
            NICKNAME: 'Stollery',
            OLL: [0, 1, 2, 9],
            WRAPPER: [8, 20, 3, 21, 12, 13, 16, 17],
            0: "R U R' U F' R U' R' F2",
            1: "U2 R' F R U' F' R U2 R' F2",
            2: "U R U' R' U' R U' R' U R' F R F'",
            3: "U' y' R' U2 R U R' U' R' F R F' R",
            4: "R' U' F R F' U R2 U' R'",
            5: "R U R' F R' F' R U R U R'"
        },
        {
            NICKNAME: 'Pinwheel',
            OLL: [9, 13, 17, 21],
            WRAPPER: [2, 20, 3, 12, 1, 13, 0, 8],
            0: "y' F' R U R U2 R2 F' U R F'",
            1: "y' R' U' R U R' U2 F R' F' R U R",
            2: "y' U R' F2 R U' R' U2 R' F R2",
            3: "y' U' R' F2 R U' R' U2 R' F R2",
            4: "y' U2 R' F2 R U' R' U2 R' F R2",
            5: "y' U R' F2 R U' R' U2 R' F R2"
        },
        {
            NICKNAME: 'Two-Face',
            OLL: [0, 3, 8, 12],
            WRAPPER: [17, 9, 20, 1, 21, 13, 16, 2],
            0: "U R U R' U' R2 U R2 U' R2",
            1: "R U' R' U F' R' F' R F",
            2: "y' U' R' U2 R' F R F' R",
            3: "y' U R' U2 R' F R F' R",
            4: "U' R U R' U2 R' F R F' U R U2 R'",
            5: "U R U R' U2 R' F R F' U R U2 R'"
        },
        {
            NICKNAME: 'Turtle',
            OLL: [0, 8, 9, 21],
            WRAPPER: [17, 20, 3, 12, 1, 13, 16, 2],
            0: "R U' R' U R U' R'",
            1: "y R U' R' F2 R U R' F' R' F R",
            2: "U F R' F' R U' R' F R F' R U' R'",
            3: "U2 R' F R F' U2 R U2 R'",
            4: "U2 R U R2 F R F' U2 R U' R'",
            5: "U2 y' R' U' R U' F R2 F'"
        },
        {
            NICKNAME: 'Pinwheel-Poser',
            OLL: [8, 9, 12, 16],
            WRAPPER: [17, 20, 3, 1, 21, 0, 13, 2],
            0: "y R U R' U' R U2 R' F' R U R' F'",
            1: "U' R' F R F' R' F R2 U R' U' F'",
            2: "R U R' U2 R' F R F' R U' R'",
            3: "R U' R2 F R F'",
            4: "U2 F' U R' F2 R F",
            5: "U2 y F' R U R2 F' R"
        },
        {
            NICKNAME: 'Gun',
            OLL: [0, 2, 12, 20],
            WRAPPER: [8, 3, 9, 1, 21, 13, 16, 17],
            0: "R U' R' U2 R U2 R'",
            1: "U' y F' R' F2 R F' R' F R2 U' R'",
            2: "R' F R F' U R U' R'",
            3: "U2 R U R' U R U R2 F R F'",
            4: "U R U2 R' F R F' R U R2",
            5: "R U' R' U R U2 R' F R' F' R"
        }
    ],
    TCLLM: [
        {
            NICKNAME: 'Hammer',
            OLL: [1, 16, 17, 20],
            WRAPPER: [2, 3, 9, 21, 12, 0, 13, 8],
            0: "U' F R' F' R F R' F' R",
            1: "R U' R U' R' F R' F' R U' R'",
            2: "U' R U R' F R' F' R U' R U2 R'",
            3: "U' R' F R y' R U' R2 U R2",
            4: "U' F R U R' U' R' F' R2 U R'",
            5: "U' R U2 R' y' U R' U R"
        },
        {
            NICKNAME: 'Spaceship',
            OLL: [2, 9, 12, 16],
            WRAPPER: [8, 20, 3, 1, 21, 0, 13, 17],
            0: "R U R' U' R U R'",
            1: "U2 F R U R' U' R' F' R F R' F' R",
            2: "U' R' F R F' U R U2 R2 F R F'",
            3: "U F2 R U' R' U2 R' F R",
            4: "U' y R' F U' R' F R2 U' R' U2 R",
            5: "U' R U R' F R' F' R U R' F R F'"
        },
        {
            NICKNAME: 'Stollery',
            OLL: [0, 1, 2, 20],
            WRAPPER: [8, 3, 9, 21, 12, 13, 16, 17],
            0: "U2 F2 R U R' F U' R U' R'",
            1: "F2 R U2 R' F U R' F' R",
            2: "F R' F' U R2 U R2 U' R",
            3: "y' R2 F' R U2 R U2 R' F R ",
            4: "U2 R U' R' U R U2 R2 F R F'",
            5: "R' F R U R U' R' F' R U' R'"
        },
        {
            NICKNAME: 'Pinwheel',
            OLL: [8, 12, 16, 20],
            WRAPPER: [17, 3, 9, 1, 21, 0, 13, 2],
            0: "R2 U R' U R' U2 R U2 R' U2 R",
            1: "y' R' U' R' F R F' U2 R U' R' U R",
            2: "U2 y' R2 F' R U2 R U R' F2 R",
            3: "y' R2 F' R U2 R U R' F2 R",
            4: "U' y' R2 F' R U2 R U R' F2 R",
            5: "U y' R2 F' R U2 R U R' F2 R"
        },
        {
            NICKNAME: 'Two-Face',
            OLL: [1, 2, 9, 13],
            WRAPPER: [8, 20, 3, 21, 12, 16, 0, 17],
            0: "R2 U R' U R U2 R' U2 R'",
            1: "U y R' F R U' F R U R' F'",
            2: "U2 R2 U' R' F R' F' R U2 R'",
            3: "R2 U' R' F R' F' R U2 R'",
            4: "U R' F R F' R U2 R' U' R U R'",
            5: "U' R' F R F' R U2 R' U' R U R'"
        },
        {
            NICKNAME: 'Turtle',
            OLL: [1, 8, 9, 16],
            WRAPPER: [17, 20, 3, 21, 12, 0, 13, 2],
            0: "U' y R' F R U' R' F R",
            1: "U y' R' U R U' R2 F R F' R U' R' U2 R",
            2: "U' R U2 R' U2 F R' F' R",
            3: "U F R F' R U R2 U' R U R'",
            4: "U y' R' F R' F' R2 U R' U R",
            5: "U y' F R F' U R' U2 R"
        },
        {
            NICKNAME: 'Pinwheel-Poser',
            OLL: [8, 9, 13, 21],
            WRAPPER: [17, 20, 3, 12, 1, 16, 0, 2],
            0: "U' F' U2 F2 R F' R U R2",
            1: "U F U R U' R2 F' R F R' F' R",
            2: "U' y R' F R2 U' R' F",
            3: "U R U R' F R' F' R U2 R U' R'",
            4: "F' R' F2 R U' F",
            5: "U F R' F' R2 U R'"
        },
        {
            NICKNAME: 'Gun',
            OLL: [0, 2, 9, 21],
            WRAPPER: [8, 20, 3, 12, 1, 13, 16, 17],
            0: "U R U2 R' U2 R U R'",
            1: "U y' R' U2 F R F' R U R2 U' R",
            2: "U R U R' U' F R' F' R",
            3: "U' y' R' U' R U' R' F R' F' R2",
            4: "R2 U R' F R F' R' U' R",
            5: "U' y' R' F R' F' R U2 R"
        }
    ],
    LS1: [
        {
            NICKNAME: 'PBL',
            OLL: [1, 2, 3, 5],
            WRAPPER: [8, 9, 20, 21, 12, 22, 11, 17],
            0: "F2 R2 U' R' F R' F2 R U' R'",
            1: "U2 R' F R F' R' F R F' R' F R F'",
            2: "U R' F R F' U R U2 R'",
            3: "U2 R U' R U' R' F R' F' R U R'",
            4: "U2 R U' R' U2 R U R'",
            5: "R U' R' F R F' R U R' U R'"
        },
        {
            NICKNAME: 'Sune',
            OLL: [5, 9, 17, 21],
            WRAPPER: [2, 20, 3, 12, 1, 22, 11, 8],
            0: "y' U2 R' U2 R U' F R2 F'",
            1: "U2 R U R' U2 F R' F' R2 U R'",
            2: "y R' F2 R U2 R' F R U' R' F R",
            3: "U' F R' F' R U F R' F' R",
            4: "U' R U' R2 F R F' R' F R F'",
            5: "U F R' F' R U' F R' F' R",
        },
        {
            NICKNAME: 'Anti-Sune',
            OLL: [5, 8, 12, 20],
            WRAPPER: [17, 3, 9, 1, 21, 22, 11, 2],
            0: "U2 R U2 R' U y' R' U2 R",
            1: "R U' R2 F R F' U2 R U' R' ",
            2: "U' R U' R' U2 R U' R2 F R F'",
            3: "U' R' F R F' U R' F R F'",
            4: "R U2 R' U2 R U' R' U R U' R'",
            5: "U R' F R F' U' R' F R F'",
        },
        {
            NICKNAME: 'U-A',
            OLL: [1, 5, 8, 9],
            WRAPPER: [17, 20, 3, 21, 12, 22, 11, 2],
            0: "U y R' F R U R' F R2 U' R' F",
            1: "U' R2 F R F' R U' R' U R' ",
            2: "U' F2 U' R' U R' F' R2",
            3: "U2 F' R U2 R' F U2 R' F R",
            4: "U' R U' R' U R U' R' U R U' R'  ",
            5: "U' F' R2 F' R2 F R2",
        },
        {
            NICKNAME: 'U-B',
            OLL: [2, 5, 20, 21],
            WRAPPER: [8, 3, 9, 12, 1, 22, 11, 17],
            0: "U' R U' R' U' R U' R2 F R F'",
            1: "U2 R U' F R' F' R U R' U' R2",
            2: "U y R' F R U' R' F R U' R' F R",
            3: "U R F2 R F2 R' F2",
            4: "U2 R U' R U R' U R U2 R2",
            5: "U R2 F R F' U R U2 R' U2 R'",
        },
        {
            NICKNAME: 'L-A',
            OLL: [3, 5, 8, 21],
            WRAPPER: [17, 9, 20, 12, 1, 22, 11, 2],
            0: "U R U' R2 F R F' R U' R'",
            1: "U R U' R' U2 R U2 R2 F R F' ",
            2: "U2 R U R' U' F R' F' R2 U R'",
            3: "U R2 F' R U' F U R' F",
            4: "U2 R2 F' R U' R' F2 R2 U' R2",
            5: "y' U R U2 R U2 R' U2 F R F'",
        },
        {
            NICKNAME: 'L-B',
            OLL: [3, 5, 12, 17],
            WRAPPER: [2, 9, 20, 1, 21, 22, 11, 8],
            0: "U2 R U R' F R' F' R2 U R'",
            1: "U' R U2 R' F' U' F",
            2: "R U' R2 F R F' U R' F R F'",
            3: "U' R U R' F R F' R U R2",
            4: "U' R U R' F' R U' R' F2",
            5: "y R' F2 R U2 R' F R2 U' R' F",
        },
        {
            NICKNAME: 'T-A',
            OLL: [1, 5, 17, 20],
            WRAPPER: [2, 3, 9, 21, 12, 22, 11, 8],
            0: "U' R U2 R' U R U2 R' F R' F' R",
            1: "U y R' F R U' R' F R2 U' R' F",
            2: "y' U2 R' U2 R' F R F' R U R' U' R",
            3: "U' R U' R2 F R F' U R U' R'",
            4: "U' R U2 R' U2 R U2 R'",
            5: "U' x U2 R U2 R' U2 R'",
        },
        {
            NICKNAME: 'T-B',
            OLL: [2, 5, 9, 12],
            WRAPPER: [8, 20, 3, 1, 21, 22, 11, 17],
            0: "U' F R' F' R2 U' R' U R U R' ",
            1: "U' R U' R' U R U' R2 F R F'",
            2: "U y R' F2 R U2 R' F2 R",
            3: "U x R2 U' R2 U R2 U x'",
            4: "U R U2 R' U2 R U2 R' U R U' R' ",
            5: "U2 R2 U' R' F R' F' R U' R'",
        },
    ],
    LS2: [
        {
            NICKNAME: 'Hammer',
            OLL: [11, 17, 20, 21],
            WRAPPER: [2, 3, 9, 12, 1, 5, 22, 8],
            0: "U F2 U R U R' U2 F2 R U' R'",
            1: "U' R U2 R' U R2 U' R' F R' F'",
            2: "U2 R' U' R U' R2 U2 F R F'",
            3: "U' R U R' U R' F R F' R U' R'",
            4: "R U2 R2 F R F' R' F R F'",
            5: "U2 R' F R F' R U' R2 F R F'"
        },
        {
            NICKNAME: 'Spaceship',
            OLL: [9, 11, 12, 17],
            WRAPPER: [2, 20, 3, 1, 21, 5, 22, 8],
            0: "U y' R2 U R' U2 R U' F R F' R",
            1: "R U R' U R U2 R' F R' F' R",
            2: "U2 y' R2 U' R2 U' R' U2 R2",
            3: "U' R F R F' U R'",
            4: "R U R' U2 R U2 R'",
            5: "y R U' R' F R' F' R2 U' R' F"
        },
        {
            NICKNAME: 'Stollery-A',
            OLL: [1, 3, 11, 17],
            WRAPPER: [2, 9, 20, 21, 12, 5, 22, 8],
            0: "R U R' F' U' F",
            1: "U R U R' U' R U R2 F R F'",
            2: "F R F' R U R2",
            3: "y R U' R' F R' F' R U' R' F R",
            4: "F' R U' R' F2",
            5: "R' F R F' R U R' U2 R U2 R'"
        },
        {
            NICKNAME: 'Stollery-B',
            OLL: [1, 2, 9, 11],
            WRAPPER: [8, 20, 3, 21, 12, 5, 22, 17],
            0: "U' R' U R2 U R2 U' F R F'",
            1: "R2 U R F R' F' R2",
            2: "y' U R U' R' U' R' U R'",
            3: "R2 U R2 F R F' R' U' R",
            4: "R U' R' U F' R U' R' F2",
            5: "U' F' R F2 R F2 R' F"
        },
        {
            NICKNAME: 'Stollery-C',
            OLL: [2, 3, 11, 21],
            WRAPPER: [8, 9, 20, 12, 1, 5, 22, 17],
            0: "U' R2 U R' U' R' F R F' U R'",
            1: "U2 F' U F U' R U' R'",
            2: "R U' F R F' U R'",
            3: "F R' F' R2 U R2 F R F'",
            4: "R U R' U R U' R'",
            5: "y' R' U R U' R' F R' F' R2"
        },
        {
            NICKNAME: 'Two-Face',
            OLL: [3, 8, 11, 12],
            WRAPPER: [17, 9, 20, 1, 21, 5, 22, 2],
            0: "y R' F2 R U' R' F R2 U' R' F ",
            1: "U R U R2 F R F' U R U2 R'",
            2: "R2 F2 U' R U R' U F2 R2",
            3: "U R' F R F' R U R2 F R F' R U2 R'",
            4: "U2 R U2 R' U' R U R'",
            5: "U2 y' R' U' R' F R F' U2 R"
        },
        {
            NICKNAME: 'Turtle',
            OLL: [8, 9, 11, 21],
            WRAPPER: [17, 20, 3, 12, 1, 5, 22, 2],
            0: "U y R U' R' F U2 R' F R",
            1: "y R U2 R' U2 R' F R U2 F'",
            2: "U y R' F R U2 R' F R U' R' F R",
            3: "U R U2 R' U' R U R2 F R F'",
            4: "U R U R' U' F' R U' R' F2",
            5: "F R' F' R2 U R' U R U' R'"
        },
        {
            NICKNAME: 'Gun-A',
            OLL: [2, 11, 12, 20],
            WRAPPER: [8, 3, 9, 1, 21, 5, 22, 17],
            0: "R U R' U R2 U' R' F R' F'",
            1: "U R F R' F' R2 U' R' U R",
            2: "U R' F R F' R U' R'",
            3: "U' R U2 R2 F R F'",
            4: "U2 R2 U' R2 U R' U R' U R2",
            5: "U2 F' U F U2 R' F R F'"
        },
        {
            NICKNAME: 'Gun-B',
            OLL: [1, 8, 11, 20],
            WRAPPER: [17, 3, 9, 21, 12, 5, 22, 2],
            0: "R U R' U' R U' R' U R' F R F'",
            1: "U' F2 R U R U2 R U2 R2 F",
            2: "y' U' R U' R2 U R2 U R'",
            3: "U2 R2 U2 R U2 R' F R F' R'",
            4: "R U R' U2 F2 R U R' F ",
            5: "U R' F' R U' F R' F2 R"
        }
    ],
    LS3: [
        {
            NICKNAME: 'Hammer',
            OLL: [8, 9, 12, 22],
            WRAPPER: [17, 20, 3, 1, 21, 11, 5, 2],
            0: "U R' F2 R F' R U R2 F' R F'",
            1: "R U2 R' U R' F R F' U R U' R'",
            2: "F R F' R U' R' U2 R2",
            3: "U2 y R U' R' F R' F R2 U' R' F",
            4: "U R' F R F' R U R' U2 R' F R F'",
            5: "U y R' F' R U' R U' R' F R' F R"
        },
        {
            NICKNAME: 'Spaceship',
            OLL: [12, 17, 20, 22],
            WRAPPER: [2, 3, 9, 1, 21, 11, 5, 8],
            0: "U' R2 U' R' U2 R U' F R F' R",
            1: "R U2 R' U' R U' R2 F R F'",
            2: "U y R' F2 R U' R' F R",
            3: "R' F R F' R U R2 F R F'",
            4: "U2 R2 U R2 U R U2 R2",
            5: "U F' R' F' R U' F"
        },
        {
            NICKNAME: 'Stollery-A',
            OLL: [1, 3, 8, 22],
            WRAPPER: [17, 9, 20, 21, 12, 11, 5, 2],
            0: "U y' R' F R F' U' R' U' R2",
            1: "U2 y' R' U R' F R F' R",
            2: "y' R' U' R U' R' U R",
            3: "R U' R' U R U R2 F R F'",
            4: "F' U R' F' R U' F",
            5: "U R U' R2 F' R U' F R' F2 R"
        },
        {
            NICKNAME: 'Stollery-B',
            OLL: [1, 2, 20, 22],
            WRAPPER: [8, 3, 9, 20, 21, 12, 11, 5, 17],
            0: "U' R U' R' U R' F R F' U R U' R'",
            1: "R U' R U R' U' R' F R F' U R'",
            2: "R2 U R2 U2 R' U R' F R F' R",
            3: "R U' R' U R U' F R F' U R'",
            4: "U' R' U R' U R U' R",
            5: "U R U2 R2 F' R U' F R' F2 R"
        },
        {
            NICKNAME: 'Stollery-C',
            OLL: [2, 3, 12, 22],
            WRAPPER: [8, 9, 20, 20, 1, 21, 11, 5, 17],
            0: "F' U' F R U R'",
            1: "F2 R U' R' F2 U2 R' F R",
            2: "R U R2 F R F'",
            3: "R U' R' U2 R' F R F' R U' R'",
            4: "U' F' R U' R' F2 R U R'",
            5: "R' F R F' R U R' U R U' R'"
        },
        {
            NICKNAME: 'Two-Face',
            OLL: [3, 17, 21, 22],
            WRAPPER: [2, 9, 20, 12, 1, 11, 5, 8],
            0: "R U2 R' U R U' R2 F R F'",
            1: "U R U R2 F R F' R U' R'",
            2: "U2 y' R' U2 R U R' U' R",
            3: "U2 F U R U' R' F' R U' R'",
            4: "U' R U2 R' U2 F2 R U R' F",
            5: "U F R' F' R U' R' F R F' R U R' U' R U R'"
        },
        {
            NICKNAME: 'Turtle',
            OLL: [8, 20, 21, 22],
            WRAPPER: [17, 3, 9, 12, 1, 11, 5, 2],
            0: "U' R' F R F' U2 R U' R'",
            1: "U' y' R' U R' U' F R F' R U R2",
            2: "U R' F R F' R U R' U' R U' R'",
            3: "R' U R2 U' R2 F R F' U2 R",
            4: "U' R U' R' U2 R U' R' U R U' R'",
            5: "U2 R U' R2 F R F' U2 R U R'"
        },
        {
            NICKNAME: 'Gun-A',
            OLL: [2, 9, 21, 22],
            WRAPPER: [8, 20, 3, 12, 1, 11, 5, 17],
            0: "U R U' R2 F R F' U R U2 R'",
            1: "U' R U R' U' R' F R F' U2 R U' R'",
            2: "F R' F' R U' R U2 R2 F R F'",
            3: "F R' F' R U R' F R F' R U' R'",
            4: "U R' U R2 U' R2 U' R",
            5: "U' R' U2 R U R' F R F' U R"
        },
        {
            NICKNAME: 'Gun-B',
            OLL: [1, 9, 17, 22],
            WRAPPER: [2, 20, 3, 21, 12, 11, 5, 8],
            0: "U R U R' U' R' F R F' R U R2 F R F'",
            1: "U2 R' F' R U R U' R' U2 F",
            2: "U F' U' F2 R F' R U R2",
            3: "U2 R U' R' U2 F R' F' R",
            4: "U' y R U' R' F R' F R",
            5: "U y R' F2 R2 U' R' F"
        },
    ],
    LS4: [
        {
            NICKNAME: 'Sune-A',
            OLL: [2, 5, 9, 21],
            WRAPPER: [8, 20, 3, 12, 1, 22, 11, 17],
            0: "F R U2 R' U R U' R' F",
            1: "R U2 R2 F2 R U2 R U' R' F",
            2: "R U R' F R' F' R",
            3: "U R' F2 R F' U R' F R",
            4: "R U' R' U R U2 R'",
            5: "R' F R F' U R U2 R' U2 R U' R'"
        },
        {
            NICKNAME: 'Sune-B',
            OLL: [3, 5, 17, 21],
            WRAPPER: [2, 9, 20, 12, 1, 22, 11, 8],
            0: "U2 y' R2 F R F' U R U2 R' U R",
            1: "U2 y F' R U' R' U' R U' R'",
            2: "U2 y' R U' R2 U' R2 U R'",
            3: "y R U' R' F U2 R' F' R",
            4: "y R2 F' R U R' F R2 U R' U' R",
            5: "U' R F R' F' R U2 R U2 R2"
        },
        {
            NICKNAME: 'Sune-C',
            OLL: [1, 5, 9, 17],
            WRAPPER: [2, 20, 3, 21, 12, 22, 11, 8],
            0: "U' F R' F' R U' R U R' U R U' R'",
            1: "R U' R' U R U' R' U' R' F R F'",
            2: "F R' F' R U' R U2 R' F R' F' R",
            3: "R U' R U' R' F R' F'",
            4: "U2 R U R2 F R F' R' F R F'",
            5: "F R U2 R2 F R"
        },
        {
            NICKNAME: 'Pi-A',
            OLL: [5, 12, 17, 20],
            WRAPPER: [2, 3, 9, 1, 21, 22, 11, 8],
            0: "U y R' F' R U2 F' R U R'",
            1: "U2 y F' R U R2 F' R U' R' F2 R",
            2: "U y R' F' R U R' F' R U2 R' F' R",
            3: "U2 R' F' R U R' F2 R F2",
            4: "U' R U' R2 U' R U' R' U2 R",
            5: "U2 y F' R U' R' U2 R' F R F'"
        },
        {
            NICKNAME: 'Pi-B',
            OLL: [5, 8, 20, 21],
            WRAPPER: [17, 3, 9, 12, 1, 22, 11, 2],
            0: "R U2 R' U R U' R' F R' F' R",
            1: "U F2 R F2 R' F2 U R'",
            2: "U2 y F' R U R' U2 R' F R F' R U R'",
            3: "U2 y' R' U2 R' F R F' R U' R' U2 R",
            4: "U R U2 R' U2 R U' R'",
            5: "F R' F' R2 U' R' U R U2 R'"
        },
        {
            NICKNAME: 'U',
            OLL: [2, 3, 5, 12],
            WRAPPER: [8, 9, 20, 1, 21, 22, 11, 17],
            0: "U' R U' R' U R' F R F' R U R'",
            1: "U2 F R' F' R2 U' R' U R U' R'",
            2: "y' R U' R U R' U R'",
            3: "y' R' F R F' R U' R U2 R'",
            4: "U' R U R' U' R U' R'",
            5: "U2 y' R' U' R U' R' F R F' R U R'"
        },
        {
            NICKNAME: 'L',
            OLL: [1, 2, 5, 20],
            WRAPPER: [8, 3, 9, 21, 12, 22, 11, 17],
            0: "U2 y' R' F R' F' R U R U' R' U' R",
            1: "U' R2 F R F' R' U' R2",
            2: "U R U' R' U R' F R F'",
            3: "y2 R B2 U' R' F R' F' R",
            4: "y R2 F R U' R",
            5: "U2 F R' F' R2 U' R2 F R F'"
        },
        {
            NICKNAME: 'T',
            OLL: [1, 3, 5, 8],
            WRAPPER: [17, 9, 20, 21, 12, 22, 11, 2],
            0: "R U' R' U' R' F R F'",
            1: "U y' F R F' U R' U' R",
            2: "U' R2 U' R' F R' F'",
            3: "U y' R2 F R F' R U R' U' R",
            4: "U2 y' R2 F R F' R U' F R F'",
            5: "U2 R2 F' R U R' U' R' F R2"
        },
        {
            NICKNAME: 'H',
            OLL: [5, 8, 9, 12],
            WRAPPER: [17, 20, 3, 1, 20, 22, 11, 2],
            0: "U y F' R U' R' F U2 R' F R F'",
            1: "y' R' F2 R U R' U2 F R",
            2: "U2 y R' F' R U R' U' R U' R' U2 R",
            3: "U2 R U R' U' R U' R2 F R F'",
            4: "U2 y R' F' R U' R' F R F' R U R'",
            5: "y F U' R U' R' F'"
        },
    ],
    LS5: [
        {
            NICKNAME: 'Hammer-A',
            OLL: [2, 9, 11, 12],
            WRAPPER: [8, 20, 3, 1, 21, 5, 22, 17],
            0: "R' F R2 U2 R' U R U' R' F",
            1: "F' R U2 R' U2 R' F R",
            2: "F2 R U2 R' U2 R' F2 R",
            3: "R' F R F' R U R' F R' F' R",
            4: "U2 F' R U' R' F2 R U' R'",
            5: "R' F R F' R U' R' U R U2 R'"
        },
        {
            NICKNAME: 'Hammer-B',
            OLL: [1, 8, 9, 11],
            WRAPPER: [17, 20, 3, 21, 12, 5, 22, 2],
            0: "U2 R U R2 F R F' U R U' R'",
            1: "y R' F R F' R U R' U2 R' F R",
            2: "U' R U' R' F R' F' R U2 R U2 R'",
            3: "U' R U2 R' F R' F' R",
            4: "R U2 R'",
            5: "U' F U2 R' F' R U' F2"
        },
        {
            NICKNAME: 'Spaceship-A',
            OLL: [3, 8, 11, 21],
            WRAPPER: [17, 9, 20, 12, 1, 5, 22, 2],
            0: "U2 R' U' R U R' F R F' R' U' R2",
            1: " R' F2 R U' R U2 R' F",
            2: "U' y' R' U' R U' R' U' R",
            3: "U' F2 R U2 R U' R' F R'",
            4: "U' F' R U2 R' F R U2 R' F",
            5: "R' F R F' R U2 R'"
        },
        {
            NICKNAME: 'Spaceship-B',
            OLL: [1, 11, 17, 20],
            WRAPPER: [2, 3, 9, 21, 12, 5, 22, 8],
            0: "R U R' U' F R' F' R2 U' R'",
            1: "U2 R' F' R U2 R U2 R' F",
            2: "y' R2 U' R U R2",
            3: "U R U R' U R' F R F'",
            4: "U R U2 R' U' F2 R U R' F",
            5: "U R' F R F' U' F R' F' R"
        },
        {
            NICKNAME: 'Stollery',
            OLL: [1, 2, 3, 11],
            WRAPPER: [8, 9, 20, 21, 12, 5, 22, 17],
            0: "y' R' U' R U2 R' F R' F' R2",
            1: "F R' F' R U2 R' F R F'",
            2: "U2 R' U R' U' R U' F R F'",
            3: "U R' F2 R F' R' F2 R",
            4: "U2 R U2 R' U F' R U' R' F2",
            5: "U' R' F2 R F R' F2 R"
        },
        {
            NICKNAME: 'Pinwheel',
            OLL: [9, 11, 17, 21],
            WRAPPER: [2, 20, 3, 12, 1, 5, 22, 8],
            0: "U2 y' R U' R' F R2 F' R2",
            1: "U' y' F R2 F' R U2 R U2 R'",
            2: "U y R U' R' U2 F U2 F",
            3: "U y' R' F R' F' R2 U R' U' R",
            4: "U' R2 U2 R U2 R' U R'",
            5: "F' U F U' R U2 R'"
        },
        {
            NICKNAME: 'Turtle-A',
            OLL: [2, 11, 20, 21],
            WRAPPER: [8, 3, 9, 12, 1, 5, 22, 17],
            0: "y' F R F' R U2 R U2 R'",
            1: "y' R' U' R2 U' R' F R' F' R",
            2: "U' y' R U' R U2 R' U R'", 
            3: "U' y F' R U R' U R U' R' F ",
            4: "U2 R' U R' U' R U R' U2 R ",
            5: "U2 R F' R U R' U2 R' F2 "
        },
        {
            NICKNAME: 'Turtle-B',
            OLL: [3, 11, 12, 17],
            WRAPPER: [2, 9, 20, 1, 21, 5, 22, 8],
            0: "U2 R' F R2 U' R' F' R' F R",
            1: "R' F2 R F' U R' F2 R F'",
            2: "R U2 R' U2 R' F R F' R U R' ",
            3: "R' F' U' F U' R U2 R",
            4: "R' U2 R U' R' U R U' R",
            5: "F R' F' R U' R U' R'"
        },
        {
            NICKNAME: 'Pinwheel-Poser',
            OLL: [8, 11, 12, 20],
            WRAPPER: [17, 3, 9, 1, 21, 5, 22, 2],
            0: "U' y R' F R F' R U R2 F R",
            1: "U2 y' R U2 R' U2 R' F R2 F'",
            2: "R' U2 R' U2 F R F'",
            3: "U R U2 R' U F' U' F",
            4: "R' F' R U' R' F2 R2 U R'",
            5: "y' R' U R U' R2 F R F' R"
        }
    ],
    LS6: [
        {
            NICKNAME: 'Hammer',
            OLL: [3, 8, 12, 22],
            WRAPPER: [17, 9, 20, 1, 21, 11, 5, 2],
            0: "U2 y' R U' R2 U' R F R' F' R",
            1: "U2 R' F R F'",
            2: "U y' R' U' R U2 R' U' R",
            3: "R U2 R2 F R F' R U R'",
            4: "U2 y F R2 U' R' F R' F2",
            5: "y R F' U R' F R2 U2 F"
        },
        {
            NICKNAME: 'Spaceship',
            OLL: [1, 8, 20, 22],
            WRAPPER: [17, 3, 9, 21, 12, 11, 5, 2],
            0: "U y F' R U R' U2 R' F R",
            1: "y R2 F2 R F' R U R' U2 R",
            2: "U2 y R U2 R' U' R U' R2 F2 R",
            3: "y' R' F R F' R U R' U2 R' U2 R ",
            4: "U y R' F R F' R U R2 F' R",
            5: "R' F R F' U' R U' R'"
        },
        {
            NICKNAME: 'Two-Face',
            OLL: [1, 2, 9, 22],
            WRAPPER: [8, 20, 3, 21, 12, 11, 5, 17],
            0: "U' R' F R F' U R U R'",
            1: "y' R' U2 R' F R F' R U R' U R",
            2: "U2 y' R' U' R",
            3: "R' U' R2 U' R' U2 F R F'",
            4: "U2 y R2 F2 R U' R' F2 R2",
            5: "R' F2 R2 U R' F R' F2 R"
        },
        {
            NICKNAME: 'Turtle',
            OLL: [2, 12, 20, 22],
            WRAPPER: [8, 3, 9, 1, 21, 11, 5, 17],
            0: "U' R U R' U2 R' F R F'",
            1: "y' R' F' R U R' U2 R' F2 R2",
            2: "U' R U' R2 F R F' R U R'",
            3: "U y F' R U' R' F R U2 R'",
            4: "U R U' R' U2 R U' R'",
            5: "U F U2 R2 F U' R U' R"
        },
        {
            NICKNAME: 'Pinwheel-Poser-A',
            OLL: [8, 9, 21, 22],
            WRAPPER: [17, 20, 3, 12, 1, 11, 5, 2],
            0: "U R U2 R' U R' F R F'",
            1: "R U' R2 F R F' U R U R'",
            2: "U2 y' R' F' R U' R' F2 U2 R",
            3: "y' F R' F' U' R' U' R",
            4: "U2 R' U R' U2 R U R' U2 R",
            5: "F R U2 R2 F' R U R' F R"
        },
        {
            NICKNAME: 'Pinwheel-Poser-B',
            OLL: [17, 20, 21, 22],
            WRAPPER: [2, 3, 9, 12, 1, 11, 5, 8],
            0: "U y' F R' F' U R' U' R",
            1: "R' F R F' U2 R' F R F'",
            2: "y' R U R' U R U2 R2 U' R",
            3: "R U' R' U R U R' F R' F' R",
            4: "y' F U2 R2 F R U2 R2",
            5: "U2 y' R2 U2 R U' R2 F R F' R'"
        },
        {
            NICKNAME: 'Pinwheel-Poser-C',
            OLL: [9, 12, 17, 22],
            WRAPPER: [2, 20, 3, 1, 21, 11, 5, 8],
            0: "U y F' R U R' U R' F2 R",
            1: "U' R2 U R' U2 R' F R' F'",
            2: "y' R' U2 R U R' U' R U R' U' R",
            3: "U2 R' F R2 F' U' R' U' R",
            4: "R U' R' U F2 R U R' F",
            5: "U F' U' F U' R U' R'"
        },
        {
            NICKNAME: 'Gun-A',
            OLL: [1, 3, 17, 22],
            WRAPPER: [2, 9, 20, 21, 12, 11, 5, 8],
            0: "R' U' F R F' R' U' R U2 R",
            1: "U2 F' U F U2 R U R'",
            2: "U2 R' F R2 U' R' U' R U R' F'",
            3: "R' F2 R F' R' F2 R2 U2 R'",
            4: "U' R U' R'",
            5: "U y R U2 R' F R U2 R2 F' R"
        },
        {
            NICKNAME: 'Gun-B',
            OLL: [2, 3, 21, 22],
            WRAPPER: [8, 9, 20, 12, 1, 11, 5, 17],
            0: "U2 y F' R U' R' F R U2 R2 F R",
            1: "U' R' U R U2 R' F R2 F'",
            2: "U y' R' U' R' F' R U' R' F2 R2",
            3: "U2 y F' R U2 R U' R' F R' F'",
            4: "U' y R F' R U R2 U2 F",
            5: "U y' R' U' R' F R F' R"
        }
    ],
    LS7: [
        {
            NICKNAME: 'Antisune-A',
            OLL: [2, 5, 12, 20],
            WRAPPER: [8, 3, 9, 1, 21, 22, 11, 17],
            0: "R' U R U' R2 U' F R F' R",
            1: "F' U2 R U R' U' R' F R",
            2: "U2 y' F' R U' R' F2 R2 U2 R'",
            3: "U y' R2 F R F' U R",
            4: "U' F' R U' R' F2 U2 R U2 R'",
            5: "y' R' U' R' F R F' R U R' U2 R"
        },
        {
            NICKNAME: 'Antisune-B',
            OLL: [3, 5, 8, 12],
            WRAPPER: [17, 9, 20, 1, 21, 22, 11, 2],
            0: "U y' R' F R F' U R U' R U R'",
            1: "U2 F R' F R U R' F R",
            2: "y' R2 U R' U R' U R2 U' R2",
            3: "U2 y R2 U R' U2 R' F2 R F' R'",
            4: "U2 R' U R2 U R2 U' R",
            5: "R' F R F' U2 R U R'"
        },
        {
            NICKNAME: 'Antisune-C',
            OLL: [1, 5, 8, 20],
            WRAPPER: [17, 3, 9, 21, 12, 22, 11, 2],
            0: "y F' R' F2 R U' R' F R F'",
            1: "U R' U2 R U2 R2 F R F' R'",
            2: "y' R' U R U' R' U2 R",
            3: "U R' F R2 F' R U R' U R'",
            4: "R2 U R' U R U2 R2",
            5: "U' y R U2 R' F U' R U' R'"
        },
        {
            NICKNAME: 'Pi-A',
            OLL: [5, 9, 12, 17],
            WRAPPER: [2, 20, 3, 1, 21, 22, 11, 8],
            0: "U' R U R' U2 F R' F' R",
            1: "U2 F R' F' R2 U R' U R U2 R'",
            2: "U2 y' R2 U R' U R U' R' U R U' R'",
            3: "y' R' U R' F R F' R U R' U2 R",
            4: "U' R U R' U' R U R' U2 R U R'",
            5: "U2 y R U R' U' R U2 R' F2"
        },
        {
            NICKNAME: 'Pi-B',
            OLL: [5, 8, 9, 21],
            WRAPPER: [17, 20, 3, 12, 1, 22, 11, 2],
            0: "y' R' U2 R U R' F R F' R U R'",
            1: "U2 F R' F' R U R' U2 R U R' U R",
            2: "U' y' R' U2 R U2 R' U R",
            3: "U y' R2 F R F' R U' R' U2 R",
            4: "y' R2 F R F' U R U' R' U R",
            5: "U2 y' R' U' F R' F' R2 U R' U R"
        },
        {
            NICKNAME: 'U',
            OLL: [1, 3, 5, 17],
            WRAPPER: [2, 9, 20, 21, 12, 22, 11, 8],
            0: "U y R' F R U' R U' R' F R' F' R",
            1: "U' y' R2 F R F' R U' R' U R",
            2: "U y' R' U' R U R' U R",
            3: "U2 R U R' U' R U' R' F R' F' R",
            4: "R' U R' U' R U' R",
            5: "U' R F' R2 F R2 F R'"
        },
        {
            NICKNAME: 'L',
            OLL: [1, 2, 5, 9],
            WRAPPER: [8, 20, 3, 21, 12, 22, 11, 17],
            0: "y' R U2 R U2 R' F R F'",
            1: "U y' R2 F' U' F R U R2",
            2: "R2 B' R' B R'",
            3: "U2 y' R U2 R' F R F' R U2 R'",
            4: "U' y R' F R U' R U' R' F",
            5: "U R2 F R F' R U' R2"
        },
        {
            NICKNAME: 'T',
            OLL: [2, 3, 5, 21],
            WRAPPER: [8, 9, 20, 12, 1, 22, 11, 17],
            0: "U R U' R' F' U F",
            1: "U' y' R' U' R U' F R F'",
            2: "U' y' R' U' R U' F R F'",
            3: "U2 y' R' U' R U R2 F R F' U R",
            4: "y R' U R' F R U' R' F2 R2",
            5: "y R U2 R' U2 R U2 R' F2"
        },
        {
            NICKNAME: 'T',
            OLL: [5, 17, 20, 21],
            WRAPPER: [2, 3, 9, 12, 1, 22, 11, 8],
            0: "U' F R' F R F' U2 R U' R' F",
            1: "R U2 R' F' U2 R U' R' F2",
            2: "U2 R U R' U R U' R' F R' F' R",
            3: "F' U R' F R F",
            4: "U' R U' R' U' R U R' U' R U R'",
            5: "U2 y R' F' R U R' F R2 U' R' F"
        },
    ],
    LS8: [
        {
            NICKNAME: 'Hammer',
            OLL: [3, 11, 17, 21],
            WRAPPER: [2, 9, 20, 12, 1, 5, 22, 8],
            0: "U' R U R U' R' F R' F' R U R'",
            1: "U2 F R' F' R",
            2: "y R' F R U2 R' F R U2 R' F R",
            3: "U2 R' F2 R2 U' R' U2 R U' R' F",
            4: "U' R U R' U2 R U R'",
            5: "y R' F2 R2 U' R' F R' F' R"
        },
        {
            NICKNAME: 'Spaceship',
            OLL: [2, 9, 11, 21],
            WRAPPER: [8, 20, 3, 12, 1, 5, 22, 17],
            0: "U' F R' F' R U2 R U' R'",
            1: "U2 y R' U2 R U' R' F R' F2 R2",
            2: "U' R U' R' F R' F' R2 U R'",
            3: "U' y' F R F' R' U2 R",
            4: "U y F2 R F' R U R2 F'",
            5: "U2 R U' R' F R U2 R2 F R"
        },
        {
            NICKNAME: 'Two-Face',
            OLL: [1, 2, 11, 20],
            WRAPPER: [8, 3, 9, 21, 12, 5, 22, 17],
            0: "R U' R' U' F R' F' R",
            1: "y R U2 R' U' R U2 R' F U'",
            2: "U2 y R' F R F R' F R F2",
            3: "y R' F R2 U2 R' F' R U2 R'",
            4: "U2 R U R'",
            5: "U y F R F' R U R' U2 R' F"
        },
        {
            NICKNAME: 'Turtle',
            OLL: [1, 9, 11, 17],
            WRAPPER: [2, 20, 3, 21, 12, 5, 22, 8],
            0: "U y R' F' R U2 R U' R' F",
            1: "U' R U2 R' U2 F R F' R U R2",
            2: "U' y R' F R U2 R' F R",
            3: "U2 y F R' F' R U2 R U2 R2 F R",
            4: "U y R' F R2 U' R' F R' F' R",
            5: "U' y R U2 R' F' R U R' F"
        },
        {
            NICKNAME: 'Pinwheel-Poser-A',
            OLL: [8, 11, 20, 21],
            WRAPPER: [17, 3, 9, 12, 1, 5, 22, 2],
            0: "U' y R' F2 R U' R U' R' F",
            1: "U' R U' R' U' F R' F' R2 U R'",
            2: "U' y R' U' R U' R' U2 F R",
            3: "y F' R' F2 R2 U R' U' R U' R'",
            4: "U2 F' R U' R' F2 U' R U R'",
            5: "U y' R U R U' R' F R F'"
        },
        {
            NICKNAME: 'Pinwheel-Poser-B',
            OLL: [8, 9, 11, 12],
            WRAPPER: [17, 20, 3, 1, 21, 5, 22, 2],
            0: "U' y' R' U R U' F R F'",
            1: "y R U' R' F U2 R U' R' F",
            2: "y' R' U R U' R' U R U' R' U2 R",
            3: "U R' F' R U' R' F R2 U2 R' F'",
            4: "U R' U2 R U' R' U2 R U' R",
            5: "U2 y F' U F U R U2 R' F"
        },
        {
            NICKNAME: 'Pinwheel-Poser-C',
            OLL: [11, 12, 17, 20],
            WRAPPER: [2, 3, 9, 1, 21, 5, 22, 8],
            0: "U' F R' F' R U' R U2 R'",
            1: "U F R F' R U2 R U' R2",
            2: "y' R' U2 F2 R U R' F R",
            3: "U' y' F R F' U R' U R",
            4: "U y R' F R F' R U R' U' R' F R",
            5: "F R' F' U R' U' R U' R"
        },
        {
            NICKNAME: 'Gun-A',
            OLL: [2, 3, 11, 12],
            WRAPPER: [8, 9, 20, 1, 21, 5, 22, 17],
            0: "y' F R F' U' R U2 R' U2 R'",
            1: "U2 R U' R' U2 F' U' F",
            2: "U y' R' U R",
            3: "U' R' F2 R F' R U' R2 F2 R",
            4: "U2 y' R2 U2 F R F' U R'",
            5: "y R U2 R' F R U2 R2 F2 R"
        },
        {
            NICKNAME: 'Gun-B',
            OLL: [1, 3, 8, 11],
            WRAPPER: [17, 9, 20, 21, 12, 5, 22, 2],
            0: "R' U R' U' F R F' R U R' U2 R",
            1: "U' F R2 F' R U2 R' U' R",
            2: "U R' U R U2 F R F' R",
            3: "U y' R' F R' F' R U R",
            4: "U' F2 R U R' F R U R'",
            5: "U2 y R U' R' U2 R' F R U2 F"
        },
    ],
    LS9: [
        {
            NICKNAME: 'Hammer-A',
            OLL: [1, 17, 20, 22],
            WRAPPER: [2, 3, 9, 21, 12, 11, 5, 8],
            0: "U2 y' R2 U R' U' R U' R2 F R F'",
            1: "y F R' F' R U R U' R2 F' R",
            2: "U' y' R U R' U R U2 R' U R' U' R",
            3: "U2 y' R U2 R U' F R' F' R'",
            4: "y R2 F2 R U2 R' F2 R2",
            5: "U2 R U' R2 F R F' R U2 R'"
        },
        {
            NICKNAME: 'Hammer-B',
            OLL: [2, 20, 21, 22],
            WRAPPER: [8, 3, 9, 12, 1, 11, 5, 17],
            0: "U2 y' R' F R U2 R2 F R U R",
            1: "y F' R U' R' U R' F2 R F'",
            2: "F' U2 F",
            3: "R U2 R' F R' F' R2 U R'",
            4: "U' y' R' F R F' R U R2 U2 R",
            5: "U y R' F2 R F' R U R'"
        },
        {
            NICKNAME: 'Spaceship-A',
            OLL: [2, 9, 12, 22],
            WRAPPER: [8, 20, 3, 2, 21, 11, 5, 17],
            0: "y' R' U' R U2 R2 F R F' R",
            1: "U2 y R U R' U2 R' F2 R F'",
            2: "U' y R' F U' R U' R' U2 F R",
            3: "U' F R' F' R U R' F R F'",
            4: "R U' R' U' R U R'",
            5: "U' y R' F' R U' R U' R' F"
        },
        {
            NICKNAME: 'Spaceship-B',
            OLL: [3, 8, 21, 22],
            WRAPPER: [17, 9, 20, 12, 1, 11, 5, 2],
            0: "y' F R F' R U R' U R' U2 R'",
            1: "y R U2 R' U R' F2 R F'",
            2: "y U R' F U' R U' R' U2 R",
            3: "y R U' R' F R' F2 R",
            4: "U R U' R' U R U R'",
            5: "y R' F2 R F' R U R' U' R' F R"
        },
        {
            NICKNAME: 'Stollery',
            OLL: [1, 2, 3, 22],
            WRAPPER: [8, 9, 20, 21, 12, 11, 5, 17],
            0: "U' R U2 R' U R U2 R2 F R F'",
            1: "U2 y R U2 R' F2 R U2 R'",
            2: "F R' F' R U2 R U' R' U2 R' F R F'",
            3: "U y R U2 R' F' R U2 R'",
            4: "U' y R' U R U2 R2 F2 R U' R",
            5: "U' y R U2 R' F R U2 R'"
        },
        {
            NICKNAME: 'Pinwheel',
            OLL: [8, 12, 20, 22],
            WRAPPER: [12, 3, 9, 1, 21, 11, 5, 2],
            0: "U2 R U R2 F R F' R U R'",
            1: "U2 y' R' F R F' R U' R' U2 R'",
            2: "U' y R U2 R' F U2 R' F R F'",
            3: "R U' R' U F' U2 F",
            4: "U2 R U R2 F' R U' R' F2 R",
            5: "U' R U R2 F R F' U2 R U R'"
        },
        {
            NICKNAME: 'Turtle-A',
            OLL: [1, 8, 9, 22],
            WRAPPER: [17, 20, 3, 21, 12, 11, 5, 2],
            0: "R U R' U' R' F R F' R U' R'",
            1: "R U R' U R U2 R2 F R F'",
            2: "U2 y' R U' R U R' U' R U2 R' ",
            3: "y' R' U R U' R' U R' F R F' U R",
            4: "U R' U R' U2 R U' R",
            5: "U F R' F' R U' R' F R F'"
        },
        {
            NICKNAME: 'Turtle-B',
            OLL: [3, 12, 17, 22],
            WRAPPER: [2, 9, 20, 1, 21, 11, 5, 8],
            0: "U2 y R U2 R' F' R U2 R2 F R",
            1: "y R U2 R' F U' R U2 R' F",
            2: "y' R U2 R' U R U' R' U R'",
            3: "y F' R U R' U R' F R",
            4: "y' R' U2 R2 U' R' F R' F' R",
            5: "y' R F R F' U R' U2 R'"
        },
        {
            NICKNAME: 'Pinwheel-Poser',
            OLL: [9, 17, 21, 22],
            WRAPPER: [2, 20, 3, 12, 1, 11, 5, 8],
            0: "U R U' R' F R' F' R2 U' R'",
            1: "U2 y' R U2 R U R' F R' F' R",
            2: "y R U R' U R U2 R2 F' R",
            3: "U F R' F' R U R' F R F' R U2 R'",
            4: "F U2 F U2 R' F' R",
            5: "F R' F' R U2 R U R'"
        },
    ]
}
