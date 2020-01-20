const jsdom = require('jsdom')
const fs = require('fs')
const $ = require('jquery')(new jsdom.JSDOM().window)


async function basic(data, htmlConfigFilepath) {
    let htmlConfig = fs.readFileSync(htmlConfigFilepath, 'utf-8')
    htmlConfig = JSON.parse(htmlConfig)

    let rows = $(data).find(htmlConfig.selector.rows)
    let transactions = []
    let curDay = ''

    rows.each(row => {
        let $row = $(rows[row])
        let transaction = {}
        curDay = $row.find(htmlConfig.selector.rowDay).text() || curDay
        
        transaction.date = curDay
        transaction.dateFormat = htmlConfig.format.dateFormat
        transaction.dateSeparator = htmlConfig.format.dateSeparator
        transaction.negateValue = htmlConfig.format.negateValue
        transaction.description = $row.find(htmlConfig.selector.rowDescription).text().replace(/\s{2}/g, '')
        transaction.value = $row.find(htmlConfig.selector.rowValue).text().replace(/[\n\t]+/g, '')

        if (transaction.description) {
            transactions.push(transaction)
        }
    })
        
    return transactions
}

module.exports = { basic }