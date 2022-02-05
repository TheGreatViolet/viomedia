// Viomedia version 2.0.0
// Developed by Violet Hayes <ampc11234@gmail.com>
// Licensed under the GNU GPL-3.0

const express = require("express")
const { readFile } = require("fs").promises
const path = require("path")
const fs = require("fs")
const cors = require('cors')
const parser = require('body-parser')

var mediaOptions

// Creates media folder and/or media list file if they do not already exist
function checkFiles(_callback = undefined) {
    try {
        const test = fs.statSync('./media')
    } catch (e) {
        if (e.code === 'ENOENT') {
            fs.mkdir(path.join(__dirname, 'media'), (err) => {if (err) throw err})
        } else throw e
    }

    try {
        const test = fs.statSync('./public/medialist.dat')
    } catch (e) {
        if (e.code === 'ENOENT') {
            fs.writeFile('./public/medialist.dat', '',  (err) => {if (err) throw err})
        } else throw e
    }

    try {
        const test = fs.statSync('./options.json')
    } catch (e) {
        if (e.code === 'ENOENT') {
            const optionsDef = {
                "media-path": './media'
            }
            fs.writeFileSync('./options.json', JSON.stringify(optionsDef), (err) => {if (err) throw err})
        } else throw e
    }

    if (_callback) _callback()
}

function loadSettings() {
    const rawdat = fs.readFileSync('./options.json', 'utf-8', () => {if (err) throw err})
    console.log(rawdat)
    const objver = JSON.parse(rawdat)
    return objver
}

checkFiles()
mediaOptions = loadSettings()

async function refreshFilelist() {

    // Writes each item in media folder into an array
    const mediaList = []
    
    fs.readdirSync(mediaOptions['media-path']).forEach(file => {
        if (file !== 'public/medialist.dat') mediaList.push(file)
    })

    // Writes the array to the file

    const writeStream = fs.createWriteStream('./public/medialist.dat')
    const pathName = writeStream.path

    mediaList.forEach(value => writeStream.write(`${value}, `))

    writeStream.on('finish', () => {
        console.log(`Wrote all data to ${pathName} with no errors`)
    })

    writeStream.on('error', (err) => {
        console.log(`Critical error while while writing to ${pathName}: ${err}`)
        process.exit(2)
    })
}

refreshFilelist()

// Creates and opens app to the local network

const app = express()
const port = 3000
const local = require("ip").address()
const router = express.Router()

app.use("/", router)
app.use(express.json())

const jsonParser = parser.json()

router.get('/', async (req, res) => {
    await refreshFilelist()
    res.setHeader('Content-Type', 'text/html')
    res.send( await readFile('public/index.html', 'utf-8'))
    console.log("Device connected")
})

router.post('/forms', cors(), jsonParser, (req, res) => {
    let data = ''

    req.on('data', chunk => {
        data += chunk
    })
    req.on('end', () => {
        const modifiedstr = data.replace(/^\ufeff/g,"")
        const jsondat = JSON.parse(modifiedstr)
        const action = jsondat['action']

        if(!action) {
            res.send('no-action')
        }
    
        const home = require('os').homedir()
        switch (action) {
            case 'new-path':
                try {
                    fs.accessSync(path.join(home, jsondat['input']))
                } catch(e) {
                    if (e.code === 'ENOENT') {res.send('no-dir')} else throw e
                    break
                }
                mediaOptions['media-path'] = path.join(home, jsondat['input'])
                fs.writeFileSync('./options.json', JSON.stringify(mediaOptions), (err) => {if (err) throw err})
                console.log(mediaOptions)
                
                res.send('success')
                break
        }
    })
})

app.use(cors({
    origin: `*`
}))

app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/media', express.static(mediaOptions['media-path']))

app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on http://${local}:${port}`)
})