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
        filteredMap[`${xmin}-${j}`] = map[`${xmin}-${j}`];
        filteredMap[`${xmax}-${j}`] = map[`${xmax}-${j}`];
    }

    // x from mins to maxs
    for (let i = xmin; i <= xmax; i++) {
        filteredMap[`${i}-${ymin}`] = map[`${i}-${ymin}`];
        filteredMap[`${i}-${ymax}`] = map[`${i}-${ymax}`];
    }

    return filteredMap;
}

// traverse object (keys=x-y)
// from left to right, right to bottom, bottom to left, left to top
// store keys and values in array
function traverseMap(map, xmin, xmax, ymin, ymax, rotationTimes) {
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

    // do ratation times
    // send last element to first
    // delete last element
    for (let i = 0; i < rotationTimes; i++) {
        values.unshift(values.pop());
    }

    // join keys and values in object
    let obj = {};
    for (let i = 0; i < keys.length; i++) {
        obj[keys[i]] = values[i];
    }


    return obj;
}


// let arr2d = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
let arr2d = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
console.log(arr2d)
let r = 1;
let rotates = matrixRotation(arr2d, r)

// let map = map2dArray(arr2d);
// let filteredMap = filterMap(map, 0, 3, 0, 3);
// let obj = traverseMap(filteredMap, 0, 3, 0, 3, r);
// console.log(filteredMap)
// console.log(obj)

for (let i = 0; i < rotates.length; i++) {
    console.log(rotates[i].join(' '))
}