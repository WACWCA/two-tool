import { METHODS, METHOD_DATA, OPPOSITE_COLOR, moves } from "./constants";
import { MOVE_FUNCTIONS, F, F2, FP, R, R2, RP, U, U2, UP, X, X2, XP, Y, Y2, YP, Z, ZP } from "./stickerMapper";


export const getSolutions = (scramble) => {
    let stickers = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [16, 17, 18, 19],
        [20, 21, 22, 23]
    ];
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

    const white = getSolutionsForColor(state, 'w');
    const blue = getSolutionsForColor(state, 'b');
    const orange = getSolutionsForColor(state, 'o');
    const green = getSolutionsForColor(state, 'g');
    const red = getSolutionsForColor(state, 'r');
    const yellow = getSolutionsForColor(state, 'y');

    const all = new Set([ ...white, ...blue, ...orange, ...green, ...red, ...yellow]);
    const clean = new Set();

    all.forEach(elem => { 
        const temp = updateSolution(state, elem);
        if (temp.method) {
            lookforCancellations(temp);
            clean.add(temp);
        }
    });
    let arr = [ ...clean ];
    arr.sort((a, b) => a.solution.split(' ').length - b.solution.split(' ').length);
    let prev;
    arr = arr.filter(elem => {
        if (prev && (elem.alg === prev.alg && elem.face === prev.face)) {
            return false;
        } else {
            prev = elem;
            return true;
        }
    });
    
    return arr;
}

// . y y2 y' x xy xy2 xy' z' y y2 y'

const getAllIndices = (arr, val) => {
    var indices = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indices.push(i);
    }
    return indices;
}

const getSolutionsForColor = (state, color) => {

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

            performSearch(rotatedStickers2, baseOrientationsStrings[i], spinsStrings[j], solutions, color);
        });
    });
    return solutions;
}

export const performSearch = (stickers, r1, r2, solutions, color) => {

    let backNet = getInitialBackNet();
    let frontier = new Set();
    frontier.add({
        stickers: stickers,
        moves: []
    });
    let backNetFrontier = getInitialBackFrontier();
    lookForFace(solutions, backNet, [...frontier][0], r1, r2, color);

    for (let iteration = 1; iteration <= 3; iteration++) {
        let newFrontier = new Set();
        let newBackNetFrontier = new Set();
        if (iteration != 3) {
            moves.forEach((move) => {
                backNetFrontier.forEach((state) => {
                    if ((iteration === 1 && move.charAt(0) !== 'U') || (iteration > 1 && move.charAt(0) != state.moves[state.moves.length-1].charAt(0))) {
                        const newStateObject = performMove(state, move);
                        newBackNetFrontier.add(newStateObject);
                        addToBackNet(backNet, newStateObject);
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
    return {stickers: newStickers.sort((a, b) => a-b), moves: [ ...state.moves, move]}
} 

const getInitialBackNet = () => {
    const backNet = new Map();
    backNet.set([4, 5, 6, 7].toString(), [{
        stickers: [4, 5, 6, 7],
        moves: []
    }]);
    backNet.set([4, 6, 7, 11].toString(), [{
        stickers: [4, 6, 7, 11],
        moves: []
    }]);
    backNet.set([4, 6, 7, 22].toString(), [{
        stickers: [4, 6, 7, 22],
        moves: []
    }]);
    //ls
    for (let i = 0; i < 4; i++) {
        backNet.set([i, 4, 6, 7].toString(), [{
            stickers: [i, 4, 6, 7],
            moves: []
        }]);
        // y
        backNet.set([i, 4, 5, 6].toString(), [{
            stickers: [i, 4, 5, 6],
            moves: []
        }]);
        // y'
        backNet.set([i, 5, 6, 7].toString(), [{
            stickers: [i, 5, 6, 7],
            moves: []
        }]);
    }

    for (let i = 9; i <= 21; i += 4) {
        backNet.set([i, 4, 6, 7].toString(), [{
            stickers: [i, 4, 6, 7],
            moves: []
        }]);
        backNet.set([i, 4, 5, 6].toString(), [{
            stickers: [i, 4, 5, 6],
            moves: []
        }]);
        backNet.set([i, 5, 6, 7].toString(), [{
            stickers: [i, 5, 6, 7],
            moves: []
        }]);
    }

    for (let i = 8; i <= 20; i += 4) {
        backNet.set([i, 4, 6, 7].toString(), [{
            stickers: [i, 4, 6, 7],
            moves: []
        }]);
        backNet.set([i, 4, 5, 6].toString(), [{
            stickers: [i, 4, 5, 6],
            moves: []
        }]);
        backNet.set([i, 5, 6, 7].toString(), [{
            stickers: [i, 5, 6, 7],
            moves: []
        }]);
    }

    return backNet;
}

const getInitialBackFrontier = () => {
    const f = new Set();
    f.add({stickers: [4, 5, 6, 7], moves: []});
    f.add({stickers: [4, 6, 7, 11], moves: []});
    f.add({stickers: [4, 6, 7, 22], moves: []});

    for (let i = 0; i < 4; i++) {
        f.add({stickers: [i, 4, 6, 7], moves: []});
        f.add({stickers: [i, 4, 5, 6], moves: []});
        f.add({stickers: [i, 5, 6, 7], moves: []});
    }

    for (let i = 9; i <= 21; i += 4) {
        f.add({stickers: [i, 4, 6, 7], moves: []});
        f.add({stickers: [i, 4, 5, 6], moves: []});
        f.add({stickers: [i, 5, 6, 7], moves: []});
    }

    for (let i = 8; i <= 20; i += 4) {
        f.add({stickers: [i, 4, 6, 7], moves: []});
        f.add({stickers: [i, 4, 5, 6], moves: []});
        f.add({stickers: [i, 5, 6, 7], moves: []});
    }
    return f;
}

const lookForFace = (solutions, backNet, newStateObject, r1, r2, color) => {
    if (newStateObject.moves.length === 0 && r1 === 'Z' && r2 === "Y'" && color === 'g') {
        console.log(backNet);
        console.log(newStateObject);
    }
    const matching = backNet.get(newStateObject.stickers.sort((a, b) => a-b).toString());
    if (matching && matching.length > 0) {
        matching.forEach(match => {
            if (match.moves.length === 0 || newStateObject.moves.length === 0 || (match.moves.length > 0 && newStateObject.moves.length > 0 && match.moves[match.moves.length-1].charAt(0) !== newStateObject.moves[newStateObject.moves.length-1].charAt(0))) {
                if (!(match.moves.length > 0 && match.moves[match.moves.length-1].charAt(0) === 'U') && !(newStateObject.moves.length > 0 && newStateObject.moves[newStateObject.moves.length-1].charAt(0) === 'U'))
                solutions.add({
                    rotation_1: r1,
                    rotation_2: r2,
                    moves: combineMoves(newStateObject.moves, match.moves),
                    color: color
                });
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

const updateSolution = (scramble, solution) => {
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

    let state = scramble.split();
    stickers[0].forEach(i => (state[i] = 'w'));
    stickers[1].forEach(i => (state[i] = 'y'));
    stickers[2].forEach(i => (state[i] = 'b'));
    stickers[3].forEach(i => (state[i] = 'g'));
    stickers[4].forEach(i => (state[i] = 'r'));
    stickers[5].forEach(i => (state[i] = 'o'));
    state = state.join('');
    let method = '';
    //check for back bar
    if (state[4] === state[5]) {
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
        } else if (state[4] === state[5] && state[4] === state[6]) {
            
        }
    }

    solution.method = method;
    solution.state = state;
    solution.stickers = stickers;
    matchAndApplyAlgorithm(solution);
    const t =  {
        inspection: (solution.rotation_1 + ' ' + solution.rotation_2).trim(),
        method: solution.method,
        subset: solution.subset,
        face: solution.moves.join(' '),
        alg: (solution.preAuf + ' ' + solution.alg + ' ' + solution.postAuf).trim(), 
        color: solution.color
    };

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

    return t;
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
                    
                        solution.alg = subset[ind];
                        if (solution.alg === "U' R' F R2 F' U' R' U' R2 U R'") {
                            console.log('HELP');
                        }
                        solution.postAuf = applyAlg(aufedStickers, solution.alg);
                    }
                });
            }
        });
    }
}

// face, alg
const lookforCancellations = (solution) => {
    let moves = solution.alg.split(' ');
    let count = 0;
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
            start = [ ...start.slice(0, start.length - 1), `${e[0]} + ${combined}`];
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
   
}