importScripts("constants.js");
importScripts("stickerMapper.js");

// import { METHODS, METHOD_DATA, OPPOSITE_COLOR, getMethodGroup, moves } from "./constants";
// import { MOVE_FUNCTIONS, F, F2, FP, R, R2, RP, U, U2, UP, X, X2, XP, Y, Y2, YP, Z, ZP } from "./stickerMapper";

// import { METHODS, METHOD_DATA, OPPOSITE_COLOR, getMethodGroup, moves } from "./constants";
// import METHODS from "./constants";

// import { MOVE_FUNCTIONS, F, F2, FP, R, R2, RP, U, U2, UP, X, X2, XP, Y, Y2, YP, Z, ZP } from "./stickerMapper";


self.addEventListener("message", async function(event) {
    const data = JSON.parse(event.data);
    self.postMessage(JSON.stringify(getSolutions(data)));
    // self.close();
});

const getSolutions = ({scramble, egDepth, tcllDepth, lsDepth}) => {
    let stickers = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [16, 17, 18, 19],
        [20, 21, 22, 23]
    ];

    let depths = {
        maxDepth: Math.max(egDepth, tcllDepth, lsDepth),
        EG: egDepth,
        TCLL: tcllDepth,
        LS: lsDepth
    };
    // console.log(depths);

    scramble.split(' ').forEach(move => {
        stickers = stickers.map((color) => color.map(elem => MOVE_FUNCTIONS[move](elem)));
    });

    let state = Array(24);
    stickers[0].forEach(i => (state[i] = 'w'));
    stickers[1].forEach(i => (state[i] = 'y'));
    stickers[2].forEach(i => (state[i] = 'g'));
    stickers[3].forEach(i => (state[i] = 'b'));
    stickers[4].forEach(i => (state[i] = 'o'));
    stickers[5].forEach(i => (state[i] = 'r'));
    state = state.join('');

    const white = getSolutionsForColor(state, 'w', depths);
    const blue = getSolutionsForColor(state, 'b', depths);
    const orange = getSolutionsForColor(state, 'o', depths);
    const green = getSolutionsForColor(state, 'g', depths);
    const red = getSolutionsForColor(state, 'r', depths);
    const yellow = getSolutionsForColor(state, 'y', depths);
    // const yellow = getSolutionsForColor(state, color, depths);


    const all = new Set([...white, ...blue, ...orange, ...green, ...red, ...yellow]);
    const clean = new Set();
    // console.log("original: ", all.size);
    all.forEach(elem => { 
        // if (elem.color === 'b' && elem.rotation_1 === 'Z' && elem.rotation_2 === 'Y\'' && elem.moves.length === 4 && elem.methodGroup === 'TCLL') {
        //     console.log("found it");
        //     data(elem);
        // } 
        const temp = updateSolution(state, elem, depths);
        if (temp.length > 0) {
            temp.forEach(sol => {
                if (sol.method) {
                    lookforCancellations(sol);
                    clean.add(sol);
                } 
            });
        } else {
            // data(elem);
        }
    });
    let arr = [ ...clean ];
    // data("clean: ", arr.length);
    arr.sort((a, b) => { 
        let xx = getDepth(a.face.split(' ')) + getDepth(a.alg.split(' ')) - getDepth(b.face.split(' ')) - getDepth(b.alg.split(' '));

        if (xx === 0) {

            return getDepth(a.face.split(' ')) - getDepth(b.face.split(' '));
        } else {
            return xx;
        }
    });
    let prev;
    arr = arr.filter(elem => {
        if ((elem.shouldDelete) || (prev && (elem.color === prev.color && elem.alg === prev.alg && elem.face === prev.face))) {
            return false;
        } else {
            prev = elem;
            return true;
        }
    });
    
    // console.log("Maximized", arr.length);
    // arr.forEach(e => {
    //     console.log(e.solution);
    // });

    return arr;
}

// . y y2 y' x xy xy2 xy' z' y y2 y'

const getAllIndices = (arr, val) => {
    var indices = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) !== -1){
        indices.push(i);
    }
    return indices;
}

const getSolutionsForColor = (state, color, depths) => {

    // All 4 locations of (color) stickers, for example, [1, 5, 6, 20]
    const stickers = getAllIndices(state, color)

    // sets up one orientatin per color;
    const baseOrientations = [x => x, X, X2, XP, Z, ZP];
    // const baseOrientations = [XP];
    const baseOrientationsStrings = ['', 'X', 'X2', 'X\'', 'Z', 'Z\''];
    const spins = [x => x, Y, Y2, YP];
    // const spins = [YP];
    const spinsStrings = ['', 'Y', 'Y2', 'Y\''];

    const solutions = new Set();

    baseOrientations.forEach((rotate, i) => {
        spins.forEach((rotate2, j) => {
            const rotatedStickers = stickers.map(x => rotate(x));
            const rotatedStickers2 = rotatedStickers.map(x => rotate2(x));

            performSearch(rotatedStickers2, baseOrientationsStrings[i], spinsStrings[j], solutions, color, depths);
        });
    });
    return solutions;
}

const performSearch = (stickers, r1, r2, solutions, color, depths) => {

    let backNet = getInitialBackNet();
    let frontier = new Set();
    frontier.add({
        stickers: stickers,
        moves: []
    });
    let backNetFrontier = getInitialBackFrontier();
    lookForFace(solutions, backNet, [...frontier][0], r1, r2, color);
    // console.log(solutions);


    for (let iteration = 1; iteration <= (depths.maxDepth + 1) / 2; iteration++) {
        let newFrontier = new Set();
        let newBackNetFrontier = new Set();
        if ((depths.maxDepth % 2 === 0) || iteration != (depths.maxDepth + 1) / 2) {
            
            backNetFrontier.forEach((state) => {
                moves.forEach((move) => {
                    if ((iteration === 1 && move.charAt(0) !== 'U') || (iteration > 1 && move.charAt(0) != state.moves[state.moves.length-1].charAt(0))) {
                        const d = depths[state.methodGroup];
                        // console.log(dEPTH);
                        // console.log(state);
                        if ((iteration < (d + 1) / 2) || (iteration == (d + 1) / 2 && d % 2 == 0)) {
                            const newStateObject = performMove(state, move);
                            newBackNetFrontier.add(newStateObject);
                            addToBackNet(backNet, newStateObject);
                        }
                    } 
                });
            });
        }
        moves.forEach((move) => {
            frontier.forEach((state) => {
                // Ensure the move is not on the same side as the last move
                if ((iteration == 1 || move.charAt(0) != state.moves[state.moves.length-1].charAt(0))) {
                    const newStateObject = performMove(state, move);
                    newFrontier.add(newStateObject);        
                    // if (color === 'b' && r1 === 'Z' && r2 === 'Y\'' && move === 'R' && newStateObject.moves.length == 2) {
                    //     console.log("found it");
                    //     console.log(newStateObject);
                    // }    
                    lookForFace(solutions, backNet, newStateObject, r1, r2, color);
                }
            });
        });

        frontier = newFrontier;
        backNetFrontier = newBackNetFrontier;
    }

    return solutions;
}

const performMove = (state, move) => {
    let moveFunction = U;
    switch (move) {
        case "U":
            moveFunction = U; break;
        case "U2":
            moveFunction = U2; break;
        case "U'":
            moveFunction = UP; break;
        case "F":
            moveFunction = F; break;
        case "F2":
            moveFunction = F2; break;
        case "F'":
            moveFunction = FP; break;
        case "R":
            moveFunction = R; break;
        case "R2":
            moveFunction = R2; break;
        case "R'":
            moveFunction = RP; break;
    }

    const newStickers = state.stickers.map(e => moveFunction(e));
    return {...state, stickers: newStickers.sort((a, b) => a-b), moves: [ ...state.moves, move]}
} 

const getInitialBackNet = () => {
    const backNet = new Map();
    backNet.set([4, 5, 6, 7].toString(), [{
        stickers: [4, 5, 6, 7],
        moves: [],
        methodGroup: 'EG'
    }]);

    // tcll+
    backNet.set([4, 6, 7, 11].toString(), [{
        stickers: [4, 6, 7, 11],
        moves: [],
        methodGroup: 'TCLL'
    }]);
    backNet.set([4, 5, 6, 23].toString(), [{
        stickers: [4, 5, 6, 23],
        moves: [],
        methodGroup: 'TCLL'
    }]);
    backNet.set([5, 6, 7, 19].toString(), [{
        stickers: [5, 6, 7, 19],
        moves: [],
        methodGroup: 'TCLL'
    }]);

    //tcll-
    backNet.set([4, 6, 7, 22].toString(), [{
        stickers: [4, 6, 7, 22],
        moves: [],
        methodGroup: 'TCLL'
    }]);
    backNet.set([4, 5, 6, 14].toString(), [{
        stickers: [4, 5, 6, 14],
        moves: [],
        methodGroup: 'TCLL'
    }]);
    backNet.set([5, 6, 7, 10].toString(), [{
        stickers: [5, 6, 7, 10],
        moves: [],
        methodGroup: 'TCLL'
    }]);

    //ls
    for (let i = 0; i < 4; i++) {
        backNet.set([i, 4, 6, 7].sort((a, b) => a-b).toString(), [{
            stickers: [i, 4, 6, 7].sort((a, b) => a-b),
            moves: [],
            methodGroup: 'LS'
        }]);
        // y'
        backNet.set([i, 4, 5, 6].sort((a, b) => a-b).toString(), [{
            stickers: [i, 4, 5, 6].sort((a, b) => a-b),
            moves: [],
            methodGroup: 'LS'
        }]);
        // y
        backNet.set([i, 5, 6, 7].sort((a, b) => a-b).toString(), [{
            stickers: [i, 5, 6, 7].sort((a, b) => a-b),
            moves: [],
            methodGroup: 'LS'
        }]);
    }

    for (let i = 9; i <= 21; i += 4) {
        backNet.set([i, 4, 6, 7].sort((a, b) => a-b).toString(), [{
            stickers: [i, 4, 6, 7].sort((a, b) => a-b),
            moves: [],
            methodGroup: 'LS'
        }]);
        backNet.set([i, 4, 5, 6].sort((a, b) => a-b).toString(), [{
            stickers: [i, 4, 5, 6].sort((a, b) => a-b),
            moves: [],
            methodGroup: 'LS'
        }]);
        backNet.set([i, 5, 6, 7].sort((a, b) => a-b).toString(), [{
            stickers: [i, 5, 6, 7].sort((a, b) => a-b),
            moves: [],
            methodGroup: 'LS'
        }]);
    }

    for (let i = 8; i <= 20; i += 4) {
        backNet.set([i, 4, 6, 7].sort((a, b) => a-b).toString(), [{
            stickers: [i, 4, 6, 7].sort((a, b) => a-b),
            moves: [],
            methodGroup: 'LS'
        }]);
        backNet.set([i, 4, 5, 6].sort((a, b) => a-b).toString(), [{
            stickers: [i, 4, 5, 6].sort((a, b) => a-b),
            moves: [],
            methodGroup: 'LS'
        }]);
        backNet.set([i, 5, 6, 7].sort((a, b) => a-b).toString(), [{
            stickers: [i, 5, 6, 7].sort((a, b) => a-b),
            moves: [],
            methodGroup: 'LS'
        }]);
    }

    return backNet;
}

const getInitialBackFrontier = () => {
    const f = new Set();
    f.add({stickers: [4, 5, 6, 7], moves: [], methodGroup: 'EG'});

    f.add({stickers: [4, 6, 7, 11], moves: [], methodGroup: 'TCLL'});
    f.add({stickers: [4, 5, 6, 23], moves: [], methodGroup: 'TCLL'});
    f.add({stickers: [5, 6, 7, 19], moves: [], methodGroup: 'TCLL'});

    f.add({stickers: [4, 6, 7, 22], moves: [], methodGroup: 'TCLL'});
    f.add({stickers: [4, 5, 6, 14], moves: [], methodGroup: 'TCLL'});
    f.add({stickers: [5, 6, 7, 10], moves: [], methodGroup: 'TCLL'});

    for (let i = 0; i < 4; i++) {
        f.add({stickers: [i, 4, 6, 7], moves: [], methodGroup: 'LS'});
        f.add({stickers: [i, 4, 5, 6], moves: [], methodGroup: 'LS'});
        f.add({stickers: [i, 5, 6, 7], moves: [], methodGroup: 'LS'});
    }

    for (let i = 9; i <= 21; i += 4) {
        f.add({stickers: [i, 4, 6, 7].sort((a, b) => a-b), moves: [], methodGroup: 'LS'});
        f.add({stickers: [i, 4, 5, 6].sort((a, b) => a-b), moves: [], methodGroup: 'LS'});
        f.add({stickers: [i, 5, 6, 7].sort((a, b) => a-b), moves: [], methodGroup: 'LS'});
    }

    for (let i = 8; i <= 20; i += 4) {
        f.add({stickers: [i, 4, 6, 7].sort((a, b) => a-b), moves: [], methodGroup: 'LS'});
        f.add({stickers: [i, 4, 5, 6].sort((a, b) => a-b), moves: [], methodGroup: 'LS'});
        f.add({stickers: [i, 5, 6, 7].sort((a, b) => a-b), moves: [], methodGroup: 'LS'});
    }
    return f;
}

const lookForFace = (solutions, backNet, newStateObject, r1, r2, color) => {
    const matching = backNet.get(newStateObject.stickers.sort((a, b) => a-b).toString());
    if (matching && matching.length > 0) {
        matching.forEach(match => {
            if (match.moves.length === 0 || newStateObject.moves.length === 0 || (match.moves.length > 0 && newStateObject.moves.length > 0 && match.moves[match.moves.length-1].charAt(0) !== newStateObject.moves[newStateObject.moves.length-1].charAt(0))) {
                if (!(newStateObject.moves.length > 0 && newStateObject.moves[newStateObject.moves.length-1].charAt(0) === 'U') || (match.moves.length > 0 && !match.moves[match.moves.length-1].charAt(0) === 'U')){
                // if (!((match.moves.length > 0 && match.moves[match.moves.length-1].charAt(0) === 'U') && (newStateObject.moves.length > 0 && newStateObject.moves[newStateObject.moves.length-1].charAt(0) === 'U'))) {
                    // if (color === 'b' && r1 === 'Z' && !r2)  {
                    //     console.log("test");
                    //     console.log(`${newStateObject.moves} - ${match.moves}`);
                    // }   
                    solutions.add({
                        rotation_1: r1,
                        rotation_2: r2,
                        moves: combineMoves(newStateObject.moves, match.moves),
                        methodGroup: match.methodGroup,
                        color: color
                    });
                }
            }
        });
    }
}

const combineMoves = (moves, toInvert) => {
    const newMoves = [ ...moves ];
    for (let i = toInvert.length - 1; i >= 0; i--) {
        let move = '';
        switch (toInvert[i]) {
            case "F": move = "F'"; break;
            case "F'": move = "F"; break;
            case "U": move = "U'"; break;
            case "U'": move = "U"; break;
            case "R'": move = "R"; break;
            case "R": move = "R'"; break;
            default: move = toInvert[i];
        }
        newMoves.push(move);
    }
    return newMoves
}

const addToBackNet = (net, obj) => {
    const curr = net.get(obj.stickers.toString());
    if (curr) {
        net.set(obj.stickers.toString(), [ ...curr, obj]);
    } else {
        net.set(obj.stickers.toString(), [obj]);
    }
}

const updateSolution = (scramble, solution, depths) => {

    let stickers = [
        getAllIndices(scramble, 'w'),
        getAllIndices(scramble, 'y'),
        getAllIndices(scramble, 'b'),
        getAllIndices(scramble, 'g'),
        getAllIndices(scramble, 'r'),
        getAllIndices(scramble, 'o')
    ];

    stickers = stickers.map(arr => 
        arr.map(elem => MOVE_FUNCTIONS[solution.rotation_1](elem))
    ).sort((a, b) => a-b);
    stickers = stickers.map(arr => 
        arr.map(elem => MOVE_FUNCTIONS[solution.rotation_2](elem))
    ).sort((a, b) => a-b);

    solution.moves.forEach(move => {
        stickers = stickers.map(arr => 
            arr.map(elem => MOVE_FUNCTIONS[move](elem))
        ).sort((a, b) => a-b);
    });

    // if (solution.color === 'b' && solution.rotation_1 === 'Z' && solution.moves.length === 4 && solution.rotation_2 === 'Y\'') {
    //     console.log("found it");
    //     console.log(solution);
    // }

    let state = scramble.split();
    stickers[0].forEach(i => (state[i] = 'w'));
    stickers[1].forEach(i => (state[i] = 'y'));
    stickers[2].forEach(i => (state[i] = 'b'));
    stickers[3].forEach(i => (state[i] = 'g'));
    stickers[4].forEach(i => (state[i] = 'r'));
    stickers[5].forEach(i => (state[i] = 'o'));
    state = state.join('');
    let method = '';
    let rotation = '';
    //check for face
    if (state[4] === state[5] && state[4] === state[6] && state[4] === state[7]) {
        if (state[14] === state[15] && state[19] === state[22]) {
            method = METHODS.EG1;
        } else if (state[14] === state[11] && state[10] === state[15]) {
            method = METHODS.EG2;
        } else if (state[18] === state[19] && state[11] === state[14]) {
            if (state[4] === state[5]) {
                method = METHODS.LEG1;
            }    
        } else if (state[14] === state[15] && state[10] === state[11]){
            method = METHODS.CLL;
        }
    } else {
        // check for v
        if (state[4] === state[6] && state[4] === state[7]) {
            if (state[14] === state[15] && state[18] === state[19]) {
                if (state[4] === state[11]) {
                    method = METHODS.TCLLP;
                } else if (state[4] === state[22]) {
                    method = METHODS.TCLLM;
                } else if (state[4] === state[0] ||
                    state[4] === state[1] ||
                    state[4] === state[2] || 
                    state[4] === state[3]) {
                    if (state[4] === OPPOSITE_COLOR[state[5]]) {
                        method = METHODS.LS1;
                    } else if (state[4] === OPPOSITE_COLOR[state[11]]) {
                        method = METHODS.LS2;
                    } else if (state[4] === OPPOSITE_COLOR[state[22]]) {
                        method = METHODS.LS3;
                    }
                } else if (state[4] === state[9] ||
                    state[4] === state[13] ||
                    state[4] === state[17] || 
                    state[4] === state[21]) {
                    if (state[4] === OPPOSITE_COLOR[state[5]]) {
                        method = METHODS.LS4;
                    } else if (state[4] === OPPOSITE_COLOR[state[11]]) {
                        method = METHODS.LS5;
                    } else if (state[4] === OPPOSITE_COLOR[state[22]]) {
                        method = METHODS.LS6;
                    }
                } else if (state[4] === state[8] ||
                    state[4] === state[12] ||
                    state[4] === state[16] || 
                    state[4] === state[20]) {
                    if (state[4] === OPPOSITE_COLOR[state[5]]) {
                        method = METHODS.LS7;
                    } else if (state[4] === OPPOSITE_COLOR[state[11]]) {
                        method = METHODS.LS8;
                    } else if (state[4] === OPPOSITE_COLOR[state[22]]) {
                        method = METHODS.LS9;
                    }
                }
            }
        } else if (state[4] === state[5] && state[4] === state[6] && state[10] === state[11] && state[18] === state[19]) { // y'
            rotation = 'y';
            if (state[23] === state[4]) { // tcll+
                method = METHODS.TCLLP;
            } else if (state[14] === state[4]) { // tcll-
                method = METHODS.TCLLM;
            } else if (state[4] === state[0] ||
                state[4] === state[1] ||
                state[4] === state[2] || 
                state[4] === state[3]) {
                if (state[4] === OPPOSITE_COLOR[state[7]]) {
                    method = METHODS.LS1;
                } else if (state[4] === OPPOSITE_COLOR[state[23]]) {
                    method = METHODS.LS2;
                } else if (state[4] === OPPOSITE_COLOR[state[14]]) {
                    method = METHODS.LS3;
                }
            } else if (state[4] === state[0] ||
                state[4] === state[13] ||
                state[4] === state[17] || 
                state[4] === state[21]) {
                if (state[4] === OPPOSITE_COLOR[state[7]]) {
                    method = METHODS.LS4;
                } else if (state[4] === OPPOSITE_COLOR[state[23]]) {
                    method = METHODS.LS5;
                } else if (state[4] === OPPOSITE_COLOR[state[14]]) {
                    method = METHODS.LS6;
                }
            } else if (state[4] === state[0] ||
                state[4] === state[12] ||
                state[4] === state[16] || 
                state[4] === state[20]) {
                if (state[4] === OPPOSITE_COLOR[state[7]]) {
                    method = METHODS.LS7;
                } else if (state[4] === OPPOSITE_COLOR[state[23]]) {
                    method = METHODS.LS8;
                } else if (state[4] === OPPOSITE_COLOR[state[14]]) {
                    method = METHODS.LS9;
                }
            }
        } else if (state[5] === state[6] && state[5] === state[7] && state[22] === state[23] && state[14] === state[15]) { // y'
            rotation = 'y\'';
            if (state[19] === state[5]) { // tcll+
                method = METHODS.TCLLP;
            } else if (state[10] === state[5]) { // tcll-
                method = METHODS.TCLLM;
            } else if (state[5] === state[0] ||
                state[5] === state[1] ||
                state[5] === state[2] || 
                state[5] === state[3]) {
                if (state[5] === OPPOSITE_COLOR[state[4]]) {
                    method = METHODS.LS1;
                } else if (state[5] === OPPOSITE_COLOR[state[19]]) {
                    method = METHODS.LS2;
                } else if (state[5] === OPPOSITE_COLOR[state[10]]) {
                    method = METHODS.LS3;
                }
            } else if (state[5] === state[0] ||
                state[5] === state[13] ||
                state[5] === state[17] || 
                state[5] === state[21]) {
                if (state[5] === OPPOSITE_COLOR[state[4]]) {
                    method = METHODS.LS4;
                } else if (state[5] === OPPOSITE_COLOR[state[19]]) {
                    method = METHODS.LS5;
                } else if (state[5] === OPPOSITE_COLOR[state[10]]) {
                    method = METHODS.LS6;
                }
            } else if (state[5] === state[0] ||
                state[5] === state[12] ||
                state[5] === state[16] || 
                state[5] === state[20]) {
                if (state[5] === OPPOSITE_COLOR[state[4]]) {
                    method = METHODS.LS7;
                } else if (state[5] === OPPOSITE_COLOR[state[19]]) {
                    method = METHODS.LS8;
                } else if (state[5] === OPPOSITE_COLOR[state[10]]) {
                    method = METHODS.LS9;
                }
            }
        } else {
            solution.shouldDelete = true;
        }
    }
    if (rotation) {
        stickers = stickers.map(arr => 
            arr.map(elem => MOVE_FUNCTIONS[rotation](elem))
        ).sort((a, b) => a-b);

        state = scramble.split(); // Only to get an array of the corret size
        stickers[0].forEach(i => (state[i] = 'w'));
        stickers[1].forEach(i => (state[i] = 'y'));
        stickers[2].forEach(i => (state[i] = 'b'));
        stickers[3].forEach(i => (state[i] = 'g'));
        stickers[4].forEach(i => (state[i] = 'r'));
        stickers[5].forEach(i => (state[i] = 'o'));
        solution.moves.push(rotation);
    }

    solution.method = method;
    solution.state = state;
    solution.stickers = stickers;
    const allSolutions = matchAndApplyAlgorithm(solution);
    const allSolutionsFinal = [];
    if (allSolutions) {
        allSolutions.forEach(sol => {
            const t = {
                inspection: (sol.rotation_1 + ' ' + sol.rotation_2).trim(),
                method: sol.method,
                methodGroup: sol.methodGroup,
                subset: sol.subset,
                face: sol.moves.join(' '),
                alg: (sol.preAuf + ' ' + sol.alg + ' ' + sol.postAuf).trim(),
                depth: (sol.moves.length),
                color: sol.color,
                algNumber: sol.algNumber,
                shouldDelete: sol.shouldDelete
            };
       
            t.depth = getDepth(t.face.split(' '));
            // delete if too large
            t.shouldDelete = t.shouldDelete || t.depth > depths[t.methodGroup];
            // delete if only move is rotation, as it another solution exists without it.
            const faceMoves = t.face.split(' ');
            if (faceMoves.length === 1 && faceMoves[0].length > 0 && "xyz".includes(faceMoves[0].charAt(0))) {
                // console.log(t);
                t.shouldDelete = true;
            }

            switch (t.color) {
                case 'w': t.color = 'white'; break;
                case 'b': t.color = 'blue'; break;
                case 'o': t.color = 'orange'; break;
                case 'g': t.color = 'green'; break;
                case 'r': t.color = 'red'; break;
                case 'y': t.color = 'yellow'; break;
            }

            if (t.face) {
                if (t.alg) {
                    t.solution = t.face + ' ' + t.alg;
                } else {
                    t.solution = t.face;
                }
            } else {
                t.solution = t.alg;
            }

            allSolutionsFinal.push(t);
        });
    }
    return allSolutionsFinal;
}

const matchAndApplyAlgorithm = (solution) => {
    const applyAuf = (stickers, auf) => {
        const newStickers = stickers.map(arr => arr.map(elem => MOVE_FUNCTIONS[auf](elem)));
        let state = Array(24);
        newStickers[0].forEach(i => (state[i] = 'w'));
        newStickers[1].forEach(i => (state[i] = 'y'));
        newStickers[2].forEach(i => (state[i] = 'b'));
        newStickers[3].forEach(i => (state[i] = 'g'));
        newStickers[4].forEach(i => (state[i] = 'r'));
        newStickers[5].forEach(i => (state[i] = 'o'));
        state = state.join('');
        return [newStickers, state];
    };

    const applyAlg = (stickers, alg) => {
        let newStickers = stickers;
        alg.split(' ').forEach((move) => {
            newStickers = newStickers.map(arr => arr.map(elem => MOVE_FUNCTIONS[move](elem)));
        });
        
        let state = Array(24);
        newStickers[0].forEach(i => (state[i] = 'w'));
        newStickers[1].forEach(i => (state[i] = 'y'));
        newStickers[2].forEach(i => (state[i] = 'b'));
        newStickers[3].forEach(i => (state[i] = 'g'));
        newStickers[4].forEach(i => (state[i] = 'r'));
        newStickers[5].forEach(i => (state[i] = 'o'));
        state = state.join('');

        switch (state[8]) {
            case state[18]: return 'U';
            case state[14]: return 'U2';
            case state[22]: return 'U\'';
            default: return '';
        }

    };

    if (solution.method) {
        let methodData = METHOD_DATA.CLL;
        if (solution.method === METHODS.EG1) {
            methodData = METHOD_DATA.EG1;
        } else if (solution.method === METHODS.EG2) {
            methodData = METHOD_DATA.EG2;
        } else if (solution.method === METHODS.LEG1) {
            methodData = METHOD_DATA.LEG1;
        } else if (solution.method === METHODS.TCLLP) {
            methodData = METHOD_DATA.TCLLP;
        } else if (solution.method === METHODS.TCLLM) {
            methodData = METHOD_DATA.TCLLM;
        } else if (solution.method === METHODS.LS1) {
            methodData = METHOD_DATA.LS1;
        } else if (solution.method === METHODS.LS2) {
            methodData = METHOD_DATA.LS2;
        } else if (solution.method === METHODS.LS3) {
            methodData = METHOD_DATA.LS3;
        } else if (solution.method === METHODS.LS4) {
            methodData = METHOD_DATA.LS4;
        } else if (solution.method === METHODS.LS5) {
            methodData = METHOD_DATA.LS5;
        } else if (solution.method === METHODS.LS6) {
            methodData = METHOD_DATA.LS6;
        } else if (solution.method === METHODS.LS7) {
            methodData = METHOD_DATA.LS7;
        } else if (solution.method === METHODS.LS8) {
            methodData = METHOD_DATA.LS8;
        } else if (solution.method === METHODS.LS9) {
            methodData = METHOD_DATA.LS9;
        }

        let identified = false;
        let opposite = OPPOSITE_COLOR[solution.color]
        const aufs = ['', 'U', 'U2', 'U\''];
        const solutions = [];
        if (solution.color === 'y' && solution.methodGroup==='EG' && solution.moves.length < 2) {
            // console.log(solution);
        }
        aufs.forEach(auf => {
            if (!identified) {
                const [aufedStickers, aufedState] = applyAuf(solution.stickers, auf);
                methodData.forEach(subset => {
                    let possible = true;
                    subset.OLL.forEach(i => {
                        if (aufedState[i] !== opposite) {
                            possible = false;
                        }
                    });
                    if (possible) {
                        identified = true;
                        solution.subset = subset.NICKNAME;
                        solution.preAuf = auf;
                        const pllWrapper = Array(8);
                        subset.WRAPPER.forEach((elem, i) => {
                            pllWrapper[i] = aufedState[elem];
                        });
                        let ind = -1;
                        const fbar = pllWrapper[0] === pllWrapper[1];
                        const rbar = pllWrapper[2] === pllWrapper[3];
                        const bbar = pllWrapper[4] === pllWrapper[5];
                        const lbar = pllWrapper[6] === pllWrapper[7];
                        
                        if (lbar) {
                            ind = (rbar ? 0 : 2);
                        } else if (rbar) {
                            ind = 3;
                        } else if (bbar) {
                            ind = 4;
                        } else if (fbar) {
                            ind = 5;
                        } else {
                            ind = 1;
                        }

                        if (subset[ind] instanceof Array) {
                            subset[ind].forEach((alg, i) => {
                                const tempSol = { ...solution }
                                tempSol.alg = alg;
                                tempSol.postAuf = applyAlg(aufedStickers, tempSol.alg);
                                tempSol.algNumber = i;
                                solutions.push(tempSol);
                            })
                        } else {
                            solutions.push(solution);
                            solution.alg = subset[ind];
                            solution.algNumber = 0;
                            solution.postAuf = applyAlg(aufedStickers, solution.alg);
                        }
                    }
                });
            }
        });
        return solutions;
    }
}

// face, alg
const lookforCancellations = (solution) => {
    let moves = solution.alg.split(' ');
    let count = 0;

    // if (solution.color === 'blue' && solution.method === METHODS.LS6) {
    //     console.log("err location");
    // }

    if (moves.length >= 2 && (moves[0].charAt(0) === moves[1].charAt(0))) {
        let move = '';
        if (moves[0] === 'U') {
            if (moves[1] === 'U') {
                move = 'U2';
            } else if (moves[1] === 'U2') {
                move = 'U\'';
            }
        } else if (moves[0] === 'U2') {
            if (moves[1] === 'U') {
                move = 'U\'';
            } else if (moves[1] === 'U\'') {
                move = 'U';
            }
        } else {
            if (moves[1] === 'U2') {
                move = 'U';
            } else if (moves[1] === 'U\'') {
                move = 'U2';
            }
        }
        if (move) {
            solution.alg = [move,  ...moves.slice(2)].join(' ');
        } else {
            solution.alg = moves.slice(2).join(' ');
        }
    }
    let start = solution.face.split(' ');
    let end = solution.alg.split(' ');

    let faceMoves = solution.face.split(' ');
    moves = solution.alg.split(' ');
    // face : [...... y], alg :  [U2 y' .....] situation
    if ((faceMoves.length >= 1 && faceMoves[faceMoves.length-1].charAt(0) === 'y') && (moves.length > 1 && moves[1].charAt(0) === 'y')) {
        const temp = moves[0];
        moves[0] = moves[1];
        moves[1] = temp;
        end = moves;
        solution.alg = moves.join(' ');        
    }

    if ((start.length >= 1 && start[start.length-1].charAt(0) === 'y') && (end.length >= 1 && end[0].charAt(0) === 'y')) {
        const s = start[start.length-1];
        const e = end[0];
        let combined = '';
        if (!s[1]) {
            if (!e[1]) {
                combined = '2';
            } else if (e[1] === '2') {
                combined = '\'';
            } else {
                combined = 'XXX';
            }
        } else if (s[1] === '2') {
            if (!e[1]) {
                combined = '\'';
            } else if (e[1] === '\'') {
                combined = '';
            } else {
                combined = 'XXX';
            }
        } else {
            if (!e[1]) {
                combined = 'XXX';
            } else if (e[1] === '2') {
                combined = '';
            } else {
                combined = '2';
            }
        }
        if (combined === 'XXX') {
            start = start.slice(0, start.length - 1);
            end = end.slice(1);
            solution.face = start.join(' ');
            solution.alg = end.join(' ');
        } else {
            start = start.slice(0, start.length - 1);
            end = [`y${combined}`, ...end.slice(1)];
            solution.face = start.join(' ');
            solution.alg = end.join(' ');
        }
    }

    const temp = solution.face.split(' ');
    if (temp.length > 1) {
        const ch = temp[temp.length-1].charAt(0);
        if (ch === 'y' || ch === 'z' || ch === 'x') {
            solution.face = temp.slice(0, temp.length-1).join(' ');
            solution.alg = `${temp[temp.length-1]} ${solution.alg}`.trim();
            // solution.depth = solution.depth - 1;
        }
    }

    start = solution.face.split(' ');
    end = solution.alg.split(' ');

    while (start.length > 0 && end.length > 0 && start[start.length-1].charAt(0) === end[0].charAt(0)) {
        const s = start[start.length-1];
        const e = end[0];
        let combined = '';
        if (!s[1]) {
            if (!e[1]) {
                combined = '2';
            } else if (e[1] === '2') {
                combined = '\'';
            } else {
                combined = 'XXX';
            }
        } else if (s[1] === '2') {
            if (!e[1]) {
                combined = '\'';
            } else if (e[1] === '\'') {
                combined = '';
            } else {
                combined = 'XXX';
            }
        } else {
            if (!e[1]) {
                combined = 'XXX';
            } else if (e[1] === '2') {
                combined = '';
            } else {
                combined = '2';
            }
        }
        if (combined === 'XXX') {
            start = start.slice(0, start.length - 1);
            end = end.slice(1);
        } else {
            start = [ ...start.slice(0, start.length - 1), `${e[0]}${combined}`];
            end = end.slice(1);
        }
        count += 1;
    }
    const newS = start.join(' ') + ' ' + end.join(' ');
    solution.solution = newS;
    if (count > 0) {
        solution.face = [...solution.face.split(' ').slice(0, solution.face.split(' ').length - count), '(', ...solution.face.split(' ').slice(solution.face.split(' ').length - count)].join(' ');
        solution.alg = [...solution.alg.split(' ').slice(0, count), ')', ...solution.alg.split(' ').slice(count)].join(' ');    
        solution.face = solution.face.replace('( ', '(');
        solution.alg = solution.alg.replace(' )', ')');

    }
    solution.solution = solution.solution.trim();
    solution.solution = solution.solution.replaceAll('  ', ' ');
}

const getDepth = (movesArray) => {
    let count = 0;
    movesArray.forEach(elem => {
        if (!'yxz'.includes(elem.charAt(0))) {
            count += 1;
        }
    });
    return count;
}