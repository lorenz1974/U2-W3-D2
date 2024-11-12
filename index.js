const debuglevel = 3

const alertDiv = document.getElementById('alertDiv')
const usernameInput = document.getElementById('username')
const saveButton = document.getElementById('saveButton')
const clearButton = document.getElementById('clearButton')

document.addEventListener('DOMContentLoaded', () => {

    let username = localStorage.getItem('username')

    _D(3, 'username: ', username)

    if (username !== null) {
        alertDiv.innerHTML = username
        alertDiv.classList.remove('invisible')
        alertDiv.classList.add('visible')
    } else {
        alertDiv.innerHTML = ''
        alertDiv.classList.add('invisible')
        alertDiv.classList.remove('visible')
    }


    saveButton.addEventListener('click', function (e) {
        e.preventDefault()
        localStorage.setItem('username', usernameInput.value)
        location.reload()

    })

    clearButton.addEventListener('click', function (e) {
        e.preventDefault()
        localStorage.clear()
        location.reload()
    })

})
