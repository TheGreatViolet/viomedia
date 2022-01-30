var mediaArray
const mediaList = document.getElementById('media-list')

refreshList()

async function refreshList() {
    const request = new XMLHttpRequest()
    request.open("GET", '/media/medialist.txt', true)
    request.send()
    
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            let rawStringData = request.responseText
            rawStringData = rawStringData.replace(/(?<=,)\s+/g, '')
            console.log(rawStringData)
            
            mediaArray = rawStringData.split(',')
            mediaArray.pop()
            
            var listItem = document.createElement("button")
            
            for (const value of mediaArray) {
                listItem.appendChild(document.createElement("button").appendChild(document.createTextNode(value)))
                listItem.id = value
                listItem.className = "list-button"
                mediaList.appendChild(listItem)
                listItem = document.createElement("button").appendChild(document.createElement("li"))
            }
            listenOnList()
        }
    }
}

async function listenOnList() {
    for (const value of mediaArray) {
        let splitarray = value.split(".")
        let fileType = splitarray[1]
        let newElement = null
        const mediaArea = document.getElementById('media-area')
    
        document.getElementById(value).addEventListener("click", () => {
            try {
                document.getElementById("selected-media").remove()
            } catch (e) { }

            switch (fileType) {
                case "mp4": case "webm": case "ogg":
                    console.log(value)
                    newElement = document.createElement("video")

                    newElement.controls = true
                    newElement.id = "selected-media"

                    newElement.innerHTML = `<source src="/media/${value}" type="video/${fileType}">`
                    mediaArea.appendChild(newElement)
                    break
                case "apng": case "gif": case "ico": case "cur": case "jpg": case "jpeg": case "png": case "svg":
                    newElement = document.createElement("img")
                    newElement.id = "selected-media"
                    newElement.src = `/media/${value}`
                    
                    mediaArea.appendChild(newElement)
                    break
                case "mp3": case "wav":
                    newElement = document.createElement("audio")
                    newElement.id = "selected-media"
                    newElement.controls = true
                    if (fileType = 'mp3') {newElement.innerHTML = `<source src="/media/${value}" type="audio/mpeg">`} else newElement.innerHTML = `<source src="/media/${value}" type="audio/${fileType}">`
                    mediaArea.appendChild(newElement)
                    break
                default:
                    newElement = document.createElement("h2")
                    newElement.id = "selected-media"
                    newElement.innerHTML = `Error: ${value} has file extention of ${fileType}, which is not a supported file type`
                    mediaArea.appendChild(newElement)
                    break
            }
        })
    }
}

document.getElementById("refresh-bttn").addEventListener("click", () => location.reload())