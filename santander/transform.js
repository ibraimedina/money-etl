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
async function basic(data) {
    let placesConfigFile = fs.readFileSync("/home/ibraimedina/git/money-etl/santander/_config/places.json", "utf-8")
    let places = JSON.parse(placesConfigFile)

    // TODO: remover quando houver leitura do ano corretamente:
    let year = '/2020'

    for (let d of data) {
        let category = ''
        let parentCategories = ''
        let label = ''
        for (let place in places) {
            if (d.description.indexOf(place) >= 0) {
                category = places[place].category
                label = places[place].label
                parentCategories = places[place].parentCategories
                break
            }
        }
        if (!category && !label) {
            console.warn("Nova transação encontrada, cadastre-a:", d.description)
            continue
        }
        else if (!category) console.warn("Categoria não cadastrada para transação:", d.description)
        else if (!label) console.warn("Label não cadastrado para transação:", d.description) 
        d.category = category || '""'
        d.parentCategories = parentCategories || '""'
        d.label = label || '""'
        d.value = d.value.replace('.', '').replace(',','.')
        d.date += year // TODO: remove this after...
    }

    return data
}

module.exports = { basic }