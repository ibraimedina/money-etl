const fs = require('fs')

/**
 * Make all parsings, translations, categoring, etc
 * {
 *   date,
 *   description,
 *   value
 * }
 * 
 * @returns {
 *   date ISO,
 *   label,
 *   category,
 *   value
 * }
 */
async function basic(data, placesConfigFilepath) {
    let places = fs.readFileSync(placesConfigFilepath, "utf-8")
    places = JSON.parse(places)

    for (let d of data) {
        let place = places[Object.keys(places).find(p => d.description.indexOf(p) >= 0)]
        if (!place || !place.category && !place.label) {
            console.warn("Nova transação encontrada, cadastre-a:", d.description)
            continue
        }
        else if (!place.category) console.warn("Categoria não cadastrada para transação:", d.description)
        else if (!place.label) console.warn("Label não cadastrado para transação:", d.description) 
        d.category = place.category || '""'
        d.parentCategories = place.parentCategories || '""'
        d.label = place.label || '""'

        d.value = Number(d.value.replace('.', '').replace(',','.')) * (d.negateValue ? -1 : 1)
        d.date = translateDate(d.date, d.dateFormat, d.dateSeparator)
    }

    return data
}

/**
 * @param {*} date 
 * @param {*} format 
 * @param {*} separator 
 * @returns date in format dd/MM/yyyy
 */
function translateDate(date, format, separator) {
    let dateParts = date.split(separator)
    let formatParts = format.split(separator)

    let dayIndex = formatParts.indexOf('dd')
    let day = dateParts[dayIndex]

    let monthIndex = formatParts.indexOf('MM')
    if (monthIndex < 0) monthIndex = formatParts.indexOf('MMM')
    let month = {
        'Jan': '01',
        'Fev': '02',
        'Mar': '03',
        'Abr': '04',
        'Mai': '05',
        'Jun': '06',
        'Jul': '07',
        'Ago': '08',
        'Set': '09',
        'Out': '10',
        'Nov': '11',
        'Dez': '12'
    }[dateParts[monthIndex]] || dateParts[monthIndex]

    let year = '2020'

    return day +'/'+ month +'/' + year
}

module.exports = { basic }