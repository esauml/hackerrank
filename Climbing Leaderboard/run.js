import { climbingLeaderboard as listFn } from './LinkList.js'
import { climbingLeaderboard as AlgoFn } from './Algorithm.js'
import fs from 'fs'

function run(climbingLeaderboard) {

    let count = 0
    let rankCount = 0
    let rank = []
    let playerCount = 0
    let player = []
    const allFileContents = fs.readFileSync('input06.txt', 'utf-8')

    // input read logic
    allFileContents.split(/\r?\n/).forEach(line => {
        if (count == 0) {
            rankCount = line
        }
        if (count == 1) {
            rank = line.replace(/\s+$/g, '').split(' ').map(rankedTemp => parseInt(rankedTemp, 10));
        }
        if (count == 2) {
            playerCount = line
        }
        if (count == 3) {
            player = line.replace(/\s+$/g, '').split(' ').map(playerTemp => parseInt(playerTemp, 10));
        }

        count++
    });

    console.log('ranked count:', rankCount)
    console.log('player count:', playerCount)

    const result = climbingLeaderboard(rank, player);

    return result
}

// console.log(run(listFn))
console.log(run(AlgoFn))

