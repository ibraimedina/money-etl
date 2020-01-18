const jsdom = require('jsdom')
const $ = require('jquery')(new jsdom.JSDOM().window)

async function basic(data) {
    let result = new Promise((resolve, reject) => {
        let rows = $(data).find('tr')
        let rowLocators = {
            day: 'td.td-month p.day-format',
            description: 'td.detailed-description span',
            value: 'td.money:eq(0)'
        }
        // let dayFormat = 'dd/MM'
        let transactions = []
        let curDay = ''
        rows.each(row => {
            let $row = $(rows[row])
            let transaction = {}
            // TODO: collect year data
            curDay = $row.find(rowLocators.day).text() || curDay
            
            transaction.date = curDay
            transaction.description = $row.find(rowLocators.description).text().replace(/\s{2}/g, '')
            transaction.value = $row.find(rowLocators.value).text().replace(/[\n\t]+/g, '')

            if (transaction.description) {
                transactions.push(transaction)
            }
        })
        
        resolve(transactions)
    })
    return result
}

module.exports = { basic }