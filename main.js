const express = require("express")
const { readFile } = require("fs").promises
const ip = require("ip")
const path = require("path")
const fs = require("fs")

// Creates media folder and/or media list file if they do not already exist
function checkFiles() {
    fs.access("./media", (error) => {
        if (error) {
            fs.mkdir(path.join(__dirname, 'media'), (err) => {
                if (err) throw err 
            })
        }
    })

    fs.access("./media/medialist.txt", (error) => {
        if (error) {
            fs.writeFile('media/medialist.txt', '',  (err) => {
                if (err) throw err
            })
        }
    })
}

checkFiles()

async function refreshFilelist() {

    // Writes each item in media folder into an array
    const mediaList = []
    
    await fs.readdirSync('./media').forEach(file => {
        if (file !== 'medialist.txt') mediaList.push(file)
    })

    // Writes the array to the file

    const writeStream = fs.createWriteStream('./media/medialist.txt')
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

// Creates and opens app to the local network

const app = express()
const port = 3000
const local = ip.address()

app.get('/', async (req, res) => {
    await refreshFilelist()
    res.setHeader('Content-Type', 'text/html')
    res.send( await readFile('public/index.html', 'utf-8'))
    console.log("Device connected")
})

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/media', express.static(path.join(__dirname, 'media')))

app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on http://${local}:${port}`)
})