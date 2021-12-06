const fs = require('fs');
const path = require('path');

const initdata = fs.readFileSync(path.resolve(__dirname, 'input4.txt'), 'utf-8');
const rawData = initdata.replaceAll('\r','').split('\n');
const bingoNumbers = rawData[0].split(',');

const separateRawBoards = (data) => {
    const boardData = data.slice(2)
    const rawBoards = []

    for (let i = 0; i < boardData.length/6; i++) {
        const newRawBoard = boardData.slice(i * 6, i * 6 + 5)
        rawBoards.push(newRawBoard)
    }
    return rawBoards
}

const createBoard = (rawBoard) => {
    let newBoard = []

    for (const rawRow of rawBoard) {
        const rowArray = rawRow.split(' ').filter(val => val.length > 0)
        const newRow = []

        for (const tile of rowArray) {
            newRow.push({value : tile, mark : false})
        }
        newBoard.push(newRow)
    }
    return newBoard
}

const generateBoards = (data) => {
    const formattedBoards = []
    
    for (const rawBoard of separateRawBoards(data)) {
        formattedBoards.push(createBoard(rawBoard))
    }
    return formattedBoards
}

const boards = generateBoards(rawData)

const markBoard = (board, num) => {
    for (const row of board) {
        for (const tile of row) {
            if (tile.value === num) {
                tile.mark = true
                return
            }
        }
    }
}

const checkRows = (board) => {
    for (const row of board) {
        if (row.every((tile) => tile.mark)) {
            return true
        }
    }
    return false
}


const createColumnArray = (board, index) => {
    const columnArray = []

    for (let i = 0; i < 5; i++) {
        columnArray.push(board[i][index])
    }
    return columnArray
}

const checkColumns = (board) => {
    for (let i = 0; i < 5; i++) {
        if (createColumnArray(board, i).every((tile) => tile.mark)) {
            return true
        } 
    }
    return false
}

const checkBoard = (board) => {
    return checkRows(board) || checkColumns(board)
}

const sumUnmarked = (winningBoard) => {
    let sum = 0

    for (const row of winningBoard) {
        for (const tile of row) {
            if (tile.mark === false) {
                sum += parseInt(tile.value, 10)
            }
        }
    }
    return sum
}

const runRound = (num) => {
    for (let i = 0; i < boards.length; i++) {
        markBoard(boards[i], num)
    }
}

const checkAllBoards = () => {
    for (const board of boards) {
        if (checkBoard(board)) {
            return board
        } 
    }
    return false
}

const main1 = () => {
    for (const num of bingoNumbers) {
        runRound(num)
        if (checkAllBoards() !== false) {
            return num * (sumUnmarked(checkAllBoards()))
        }        
    }
}

const runGamewithFilter = (filteredBoards, i = 0) => {
    if (filteredBoards.length === 1) {
        return sumUnmarked(filteredBoards[0]) * bingoNumbers[i - 1]
    }

    for (let j = 0; j < filteredBoards.length; j++) {
        markBoard(filteredBoards[j], bingoNumbers[i])
        }
    return runGamewithFilter(filteredBoards.filter(board => checkBoard(board)), i + 1)
}

console.log(runGamewithFilter(boards, 0))