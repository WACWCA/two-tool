
function R(x) {
    switch (x) {
        case 1: return 14;
        case 3: return 12;
        case 9: return 1;
        case 11: return 3;
        case 5: return 9;
        case 7: return 11;
        case 20: return 21;
        case 21: return 23;
        case 22: return 20;
        case 23: return 22;
        case 12: return 7;
        case 14: return 5;
        default: return x;
    } 
}

const R2 = x => R(R(x));
const RP = x => R(R(R(x)));

function U(x) {
    switch (x) {
        case 0: return 1;
        case 1: return 3;
        case 3: return 2;
        case 2: return 0;
        case 16: return 12;
        case 17: return 13;
        case 8: return 16;
        case 9: return 17;
        case 20: return 8;
        case 21: return 9;
        case 12: return 20;
        case 13: return 21;
        default: return x;
    } 
}

const U2 = x => U(U(x));
const UP = x => U(U(U(x)));

function F(x) {
    switch (x) {
        case 8: return 9;
        case 9: return 11;
        case 11: return 10;
        case 10: return 8;
        case 2: return 20;
        case 3: return 22;
        case 20: return 5;
        case 22: return 4;
        case 5: return 19;
        case 4: return 17;
        case 19: return 2;
        case 17: return 3;
        default: return x;
    } 
}

const F2 = x => F(F(x));
const FP = x => F(F(F(x)));

function L(x) {
    switch (x) {
        case 0: return 8;
        case 2: return 10;
        case 4: return 15;
        case 6: return 13;
        case 8: return 4;
        case 10: return 6;
        case 13: return 2
        case 15: return 0;
        case 16: return 17;
        case 17: return 19;
        case 18: return 16;
        case 19: return 18;
        default:
            return x;
        
    }
}

const L2 = x => L(L(x));
const LP = x => L(L(L(x)));


function B(x) {
    switch (x) {
        case 0: return 18;
        case 1: return 16;
        case 16: return 6;
        case 18: return 7;
        case 6: return 23;
        case 7: return 21;
        case 21: return 0;
        case 23: return 1;
        case 12: return 13;
        case 13: return 15;
        case 14: return 12;
        case 15: return 14;
        default:
            return x;
        
    }
}

const B2 = x => B(B(x));
const BP = x => B(B(B(x)));

function D(x) {
    switch (x) {
        case 10: return 22;
        case 11: return 23;
        case 22: return 14;
        case 23: return 15;
        case 14: return 18;
        case 15: return 19;
        case 18: return 10;
        case 19: return 11;
        case 4: return 5;
        case 5: return 7;
        case 6: return 4;
        case 7: return 6;
        default:
            return x;
        
    }
}

const D2 = x => D(D(x));
const DP = x => D(D(D(x)));

const X = x => {
    let r = R(x);
    return r === x ? LP(x) : r; 
}
const X2 = x => X(X(x));
const XP = x => X(X(X(x)));

const Y = x => {
    let u = U(x);
    return u === x ? DP(x) : u; 
}
const Y2 = x => Y(Y(x));
const YP = x => Y(Y(Y(x)));

const Z = x => {
    let f = F(x);
    return f === x ? BP(x) : f; 
}
const Z2 = x => Z(Z(x));
const ZP = x => Z(Z(Z(x)));

const MOVE_FUNCTIONS = {
    'F': F,
    'F2': F2,
    'F2\'': F2,
    'F\'': FP,
    'R2': R2,
    'R2\'': R2,
    'R': R,
    'R\'': RP,
    'U2': U2,
    'U2\'': U2,
    'U': U,
    'U\'': UP,
    'X2': X2,
    'X\'': XP,
    'X': X,
    'Y2': Y2,
    'Y\'': YP,
    'Y': Y,
    'Z2': Z2,
    'Z\'': ZP,
    'Z': Z,
    'x2': X2,
    'x\'': XP,
    'x': X,
    'y2': Y2,
    'y\'': YP,
    'y': Y,
    'z2': Z2,
    'z\'': ZP,
    'z': Z,
    'B': B,
    'B2': B2,
    'B\'': BP,
    'D': D,
    'D2': D2,
    'D\'': DP,
    'L': L,
    'L2': L2,
    'L\'': LP,
    '': (x) => x
}

// -- -- 00 01 -- -- -- --
// -- -- 02 03 -- -- -- --
// 16 17 08 09 20 21 12 13
// 18 19 10 11 22 23 14 15
// -- -- 04 05 -- -- -- --
// -- -- 06 07 -- -- -- --