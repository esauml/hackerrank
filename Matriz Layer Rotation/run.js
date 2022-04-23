import fs from 'fs'

/*
 * Complete the 'matrixRotation' function below.
 *
 * The function accepts following parameters:
 *  1. 2D_INTEGER_ARRAY matrix
 *  2. INTEGER r
 */

function matrixRotation(matrix, r) {
    let xmin = 0;
    let ymin = 0;
    let xmax = matrix.length - 1;
    let ymax = matrix[0].length - 1;

    // map 2d array indexs as keys and values as values
    let map = map2dArray(matrix);

    // do while mins are less than maxs
    while (xmin <= xmax && ymin <= ymax) {
        // filter map array where key is xmin, xmax or ymin, ymax
        let filteredMap = filterMap(map, xmin, xmax, ymin, ymax);

        // console.log('xmin', xmin, 'xmax', xmax, 'ymin', ymin, 'ymax', ymax);
        // console.log('filteredMap', filteredMap);

        // traverse object (keys=x-y)
        // from left to right, right to bottom, bottom to left, left to top
        // store keys and values in array
        let obj = traverseMap(filteredMap, xmin, xmax, ymin, ymax, r);

        // update matrix with obj
        for (let key in obj) {
            let [x, y] = key.split('-')
            matrix[x][y] = obj[key];
        }

        // update mins and maxs
        xmin++;
        ymin++;
        xmax--;
        ymax--;
    }

    return matrix;

}

// map 2d array indexs as keys and values as values
function map2dArray(array) {
    let map = {};
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            map[`${i}-${j}`] = array[i][j];
        }
    }
    return map;
}

// filter map array where key is xmin, xmax or ymin, ymax
function filterMap(map, xmin, xmax, ymin, ymax) {
    let filteredMap = {};
    
    // y from mins to maxs
    for (let j = ymin; j <= ymax; j++) {
        let keyMin = `${xmin}-${j}`;
        let keyMax = `${xmax}-${j}`;
        filteredMap[keyMin] = map[keyMin];
        filteredMap[keyMax] = map[keyMax];
    }

    // x from mins to maxs
    for (let i = xmin; i <= xmax; i++) {
        let keyMin = `${i}-${ymin}`;
        let keyMax = `${i}-${ymax}`;
        filteredMap[keyMin] = map[keyMin];
        filteredMap[keyMax] = map[keyMax];
    }

    return filteredMap;
}

// traverse object (keys=x-y)
// from left to right, right to bottom, bottom to left, left to top
// store keys and values in array
function traverseMap(map, xmin, xmax, ymin, ymax, r) {
    let keys = [];
    let values = [];

    // traverse from top left to top right
    let x = xmin + 1;
    let y = ymin;
    while (x <= xmax) {
        keys.push(`${x}-${y}`);
        values.push(map[`${x}-${y}`]);
        x++;
    }

    // traverse from top right to bottom left
    x = xmax;
    y = ymin + 1;
    while (y <= ymax) {
        keys.push(`${x}-${y}`);
        values.push(map[`${x}-${y}`]);
        y++;
    }

    // traverse from bottom left to bottom right
    x = xmax - 1;
    y = ymax;
    while (x >= xmin) {
        keys.push(`${x}-${y}`);
        values.push(map[`${x}-${y}`]);
        x--;
    }

    // traverse from bottom right to top left
    x = xmin;
    y = ymax - 1;
    while (y >= ymin) {
        keys.push(`${x}-${y}`);
        values.push(map[`${x}-${y}`]);
        y--;
    }

    // module of r and length of values
    let mod = r % values.length;
    // shift last r elements of values to the front
    values = values.slice(values.length - mod).concat(values.slice(0, values.length - mod));

    // join keys and values in object
    let obj = {};
    for (let i = 0; i < keys.length; i++) {
        obj[keys[i]] = values[i];
    }


    return obj;
}

function inputLogic(inputFileName) {
    const input = fs.readFileSync(inputFileName, 'utf8');

    let lines = input.split('\n');

    const firstMultipleInput = lines[0].replace(/\s+$/g, '').split(' ');

    const m = parseInt(firstMultipleInput[0], 10);

    const n = parseInt(firstMultipleInput[1], 10);

    const r = parseInt(firstMultipleInput[2], 10);

    let matrix = []

    for (let i = 1; i <= m; i++) {
        let subArray = lines[i].replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10))
        matrix.push(subArray)
    }

    return [matrix, r];
}

function outputLogic(outputFileName) {
    const output = fs.readFileSync(outputFileName, 'utf8');

    const lines = output.split('\n');

    let matrix = []

    for (let i = 0; i < lines.length; i++) {
        let subArray = lines[i].replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10))
        matrix.push(subArray)
    }

    return matrix;
}


function run() {
    let ex = '08'
    let input = `Matriz\ Layer\ Rotation/input${ex}.txt`
    let output = `Matriz\ Layer\ Rotation/output${ex}.txt`

    let [matrix, r] = inputLogic(input);
    // console.log('input', matrix)

    let result = matrixRotation(matrix, r);
    // console.log('result', result)

    let outputMatrix = outputLogic(output);
    // console.log('output', outputMatrix)

    let testOK = true;
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
            if (result[i][j] != outputMatrix[i][j]) {
                testOK = false;
            }
        }
    }

    // for (let i = 0; i < result.length; i++) {
    //     console.log(result[i].join(' '))
    // }

    console.log('testOK', testOK)
}

run();