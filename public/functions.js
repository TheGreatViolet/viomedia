export {initMenuBar}

function initMenuBar() {
    if (document.location != '/') {
        document.getElementById("home-bttn").addEventListener("click", () => {document.location = '/'})
        document.getElementById("settings-bttn").addEventListener("click", () => {document.location = '/settings/'})
        return
    }
    document.getElementById("home-bttn").addEventListener("click", () => {location.reload()})
    document.getElementById("settings-bttn").addEventListener("click", () => {document.location = '/settings/'})
}