const fs = require('fs')
const santander = require('./santander')

const dataFolder = "/home/ibraimedina/git/money-etl/santander/_data/"
const fileEncodings = 'utf-8'
const finalFileExt = '.csv'

if (process.argv.length < 3) {
    console.warn("Usage: node index.js <html data file>")
    return
}

fs.readFile(dataFolder + process.argv[2], fileEncodings, (err, data) => {
    if (err) throw err

    let now = new Date()
    let preZero = x => ("0"+x).slice(-2)
    let finalFilename = '' + now.getFullYear() + preZero(now.getMonth()+1) + preZero(now.getDate())
    
    santander.extract.basic(data).then(extracted => {
        santander.transform.basic(extracted).then(transformed => {
            santander.load.basic(transformed).then(final => {
                fs.writeFile(dataFolder + finalFilename + finalFileExt, final, fileEncodings, function() {})
            })
        })
    }).finally(function(){})
})