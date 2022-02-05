import {initMenuBar} from '../functions.js'

document.getElementById("refresh-bttn").addEventListener("click", () => location.reload())

initMenuBar()

document.getElementById("path-submit-button").addEventListener("click", () => {
    const input = document.getElementById('pathbox').value
    const reqtext = {
        "action": "new-path",
        "input": `${input}`
    }

    $.post("http://0.0.0.0:3000/forms", JSON.stringify(reqtext), (data) => {
        switch (data) {
            case 'success':
                console.log('yeah')
                alert("Changes saves successfully")
                break
            case 'no-action':
                alert('No action was passed to the server. This is most likely a bug.')
                throw 'No action was passed to the server. This is most likely a bug.'
            case 'no-dir':
                alert('Invalid directory')
                throw 'Invalid directory'
        }
    })
})