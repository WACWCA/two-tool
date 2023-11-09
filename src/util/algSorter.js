import { DATA } from "./algSorterData";
import { METHOD_DATA } from "./constants";

class AlgSorter {

    constructor() {
        this.algorithms = new Set();
        this.occurances = new Map();
        this.occuranceSums = new Map();

        // initialize occurances and maps for F, R U, U R2 F2, etc.
        // const moves = ["R", "R2", "R'", "F", "F2", "F'", "U", "U2", "U'", "y", "y2", "y'"];
        // moves.forEach(m1 => {
        //     moves.forEach(m2 => {
        //         if (m1.charAt(0) !== m2.charAt(0)) {
        //             moves.forEach(m3 => {
        //                 if (m2.charAt(0) !== m3.charAt(0)) {
        //                     this.occurances.set(`${m1} ${m2} ${m3}`, 0);
        //                 }
        //             });
        //             this.occurances.set(`${m1} ${m2}`, 0);
        //         }
        //     });
        //     this.occurances.set(`${m1}`, 0);
        // });

        // this.fillAlgorithmsSet();

        // let singleMoveCounter = 0;
        // moves.forEach(m1 => {
        //     singleMoveCounter += this.occurances.get(m1);
        //     let doubleMoveCounter = 0;
        //     moves.forEach(m2 => {
        //         let tripleMoveCounter = 0;
        //         if (m1.charAt(0) !== m2.charAt(0)) {
        //             doubleMoveCounter += this.occurances.get(`${m1} ${m2}`);
        //             moves.forEach(m3 => {
        //                 if (m2.charAt(0) !== m3.charAt(0)) {
        //                     tripleMoveCounter += this.occurances.get(`${m1} ${m2} ${m3}`);
        //                 }
        //             });
        //             this.occuranceSums.set(`${m1} ${m2}`, tripleMoveCounter);
        //         }
        //     });
        //     this.occuranceSums.set(`${m1}`, doubleMoveCounter);
        // });
        // this.occuranceSums.set("", singleMoveCounter);
    }



    // fillAlgorithmsSet() {
    //     Object.entries(METHOD_DATA).forEach(([methodName, j]) => {
    //         METHOD_DATA[methodName].forEach(subset => {
    //             for (var i = 0; i < 6; i++) {
    //                 const algList = subset[i];
    //                 if (algList instanceof Array) {
    //                     algList.forEach(alg => this.algorithms.add(alg));
    //                 } else {
    //                     this.algorithms.add(algList)
    //                 }
    //             }
    //         });
    //     });
    //     console.log(this.algorithms.size);

    //     this.countoccurances();
    // }

    // countoccurances() {
    //     this.algorithms.forEach(algString => {
    //         algString = algString.replaceAll('(', '');
    //         algString = algString.replaceAll(')', '');

    //         if ((algString.trim() !== "")) {
    //             let alg = algString.split(' ');
    //             if (alg.length >= 2) {
    //                 if ("Uxyz".includes(alg[0].charAt(0))) {
    //                     alg = alg.slice(1);
    //                 }
    //                 if ("Uxyz".includes(alg[0].charAt(0))) {
    //                     alg = alg.slice(1);
    //                 }
    //             }
    //             if (alg.length >= 3) {
    //                 for (var i = 0; i < alg.length; i++) {
    //                     // register last 1-3 algs. (1 or 2 only if its the first 1-2 moves of the alg)
    //                     this.registerSequence(alg.slice(Math.max(0, i - 2), i + 1));
    //                 }
    //             }
    //         }
    //     });
    // }

    // registerSequence(moveTokens) {
    //     const key = moveTokens.join(' ');
    //     this.occurances.set(key, this.occurances.get(key) + 1);
    // }

    // getPercentage(moveTokens) {
    //     // console.log( Math.max(0, (this.occurances.get(moveTokens.join(' ')) / this.occurances.get(moveTokens.slice(0, moveTokens.length-1).join(' ')))));
    //     return Math.max(0, (this.occurances.get(moveTokens.join(' ')) / this.occuranceSums.get(moveTokens.slice(0, moveTokens.length-1).join(' '))));
    // }

    getScore(info) {
        let face = info.face.replaceAll("(", '').split(' ');
        let solution = info.solution.split(' ');
        return this.getScoreOfArray(solution);
        // let score = 0;
        // let faceScore = 0;
        // console.log(score);
        // for (var i = 0; i < solution.length; i++) {
        //     const temp = this.getPercentage(solution.slice(Math.max(0, i - 2), i + 1));

        //     if (temp) {
        //         score += Math.log(Math.max(1 - temp, 0.01));
        //     } else {
        //         score += Math.log(0.01);
        //     } 
        // }
        // for (var i = 0; i < face.length; i++) {
        //     const temp = this.getPercentage(face.slice(Math.max(0, i - 2), i + 1));

        //     if (temp) {
        //         faceScore += Math.log(Math.max(1 - temp, 0.01));
        //     } else {
        //         faceScore += Math.log(1);
        //     } 
        // }
        // return [score, faceScore];
    }

    getScoreOfArray(arr) {
        let score = 0;
        const data = DATA;
        for (var i = 0; i < arr.length; i++) {
            // const temp = this.getPercentage(face.slice(Math.max(0, i - 2), i + 1));
            const times = [];
            if (arr.length - i >= 3) {
                times.push(data[arr.slice(i, i+3).join(' ')] || 0.6);
            }
            if (arr.length - i >= 2 && i > 0) {
                times.push(data[arr.slice(i-1, i+2).join(' ')] || 0.6);

            }
            if (arr.length - i >= 1 && i > 1) {
                times.push(data[arr.slice(i-2, i+1).join(' ')] || 0.6);
            }
            let sum = 0;
            for (var j = 0; j < times.length; j++) {
                sum += (times[j] / 3);
            }
            score += (sum / times.length);
        }
        return score;
    }
}

// 0 1 2 3 4 

// length 5 - 2 = 3

export default AlgSorter;