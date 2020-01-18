/**
 * Save data as a .csv file
 */
async function basic(data) {
    file = 'date;time;currency;category;parent;payee;amount'
    sep = ';'
    time = '04:25:30'
    currency = 'BRL'

    for (let d of data) {
        file += '\n'+d.date +sep+ time +sep+ currency +sep+ d.category +sep+ d.parentCategories +sep+ d.label +sep+ d.value
    }
    return file
}

module.exports = { basic }