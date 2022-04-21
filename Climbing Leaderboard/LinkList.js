export function climbingLeaderboard(ranked, player) {
    let list = new LinkedList()
    let results = []
    
    console.time('historic')
    // rank historic
    ranked.forEach(e => {
        list.addSorted(e)
    })
    console.timeEnd('historic')
    
    console.time('rank')
    player.forEach(e => {
        let position = list.addSorted(e)
        results.push(position)
    })
    console.timeEnd('rank')
    
    return results
    
}


class LinkedList {
    constructor() {
        this.head = null
    }

    /**
     * Add Node Sorted desc
     * returns position of insert
     */
    addSorted(value) {
        let item = new LinkListNode(value)
        if (this.head === null) { // first insert 
            this.head = item
            return 1
        }

        let curr = this.head
        let prev = null
        let count = 1
        while (curr !== null) {
            if (curr.value <= value) {
                // if equal, only return position
                if (curr.value === value) return count
                
                // if value is bigger than head
                if (prev === null) {
                    let aux = curr
                    this.head = item
                    item.next = aux
                    return 1
                }

                prev.next = item
                item.next = curr
                return count
            }

            count++
            [prev, curr] = [curr, curr.next]
        }

        // when insert at end of list
        prev.next = item
        return count
    }

    checkMemo(value) {
        return this.memoization[value] !== undefined
    }

    positionMemorized(value) {
        let position = 1
        let curr = this.head

        while(curr.value !== value) {
            curr = curr.next
            position++
        }

        return position
    }
}

class LinkListNode {
    constructor(value) {
        this.value = value
        this.next = null
    }
}