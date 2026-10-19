const fs = require('fs')
const path = require('path')
const file = path.join(__dirname, 'channels.json')

function load() {
    try {
        if (!fs.existsSync(file)) fs.writeFileSync(file, '[]')
        return JSON.parse(fs.readFileSync(file))
    } catch {
        return []
    }
}

function save(list) {
    fs.writeFileSync(file, JSON.stringify(list, null, 2))
}

function add(entry) {
    const list = load()
    const idx = list.findIndex(c => c.jid === entry.jid)
    if (idx >= 0) list[idx] = { ...list[idx], ...entry }
    else list.push(entry)
    save(list)
    return list
}

function remove(jid) {
    const list = load().filter(c => c.jid !== jid)
    save(list)
    return list
}

function find(jid) {
    return load().find(c => c.jid === jid)
}

function all() {
    return load()
}

module.exports = { load, save, add, remove, find, all }