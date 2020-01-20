const fs = require('fs')
const src = require('./src')
const nubank = require('./nubank')
const santander = require('./santander')

const fileEncodings = 'utf-8'
const finalFileExt = '.csv'
const htmlConfigFilename = 'html.json'
const placesConfigFilename = 'places.json'
const banks = {
    nubank,
    santander
}
if (process.argv.length < 4) {
    console.warn("Usage: node index.js <bank> <html data file>")
    console.warn("Valid banks:", Object.keys(banks))
    return
}
let bank = banks[process.argv[2]]
if(!bank) {
    console.warn("Must select a bank:", Object.keys(banks))
    return
}

let now = new Date()
let preZero = x => ("0"+x).slice(-2)
let finalFilename = '' + now.getFullYear() + preZero(now.getMonth()+1) + preZero(now.getDate())

fs.readFile(bank.paths.data + process.argv[3], fileEncodings, (err, data) => {
    if (err) throw err
    
    src.extract.basic(data, bank.paths.config + htmlConfigFilename).then(extracted => {
        src.transform.basic(extracted, bank.paths.config + placesConfigFilename).then(transformed => {
            src.load.basic(transformed).then(final => {
                fs.writeFile(bank.paths.data + process.argv[2] + finalFilename + finalFileExt, final, fileEncodings, function() {})
            })
        })
    }).finally(function(){})
})