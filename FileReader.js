import fs from 'fs'

function readFile(fileName, formatter) {
    const allFileContents = fs.readFileSync(fileName, 'utf-8')
    return formatter(allFileContents)
}

