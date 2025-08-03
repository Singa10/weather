const form = document.getElementById("form")
const display = document.getElementById("display")
const apikey = ""

form.addEventListener("submit", async event => {
    event.preventDefault();
    const city = document.getElementById("city").value
    if (city) {
        try {
            const data = await getdata(city)
            displayinfo(data)
        } catch (error) {
            console.error(error)
            displayerror(error)
        }
    } else {
        displayerror("Please Enter The City")
    }
})

async function getdata(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    const response = await fetch(apiurl)
    if (!response.ok) {
        throw new Error("City Not Found")
    } else {
        return await response.json()
    }
}

function displayinfo(data) {
    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }]
    } = data

    display.textContent = ""
    display.style.display = "flex"
    display.style.flexDirection = "column"
    

    const citydisplay = document.createElement('h1')
    const degree = document.createElement('p')
    const humiditydisplay = document.createElement('p')
    const descriptiondisplay = document.createElement('p')
    const emoji = document.createElement('p')

    citydisplay.textContent = city
    degree.textContent = `${(temp - 273.15).toFixed(1)}°C`
    humiditydisplay.textContent = `Humidity: ${humidity}%`
    descriptiondisplay.textContent = description
    emoji.textContent = displayemoji(id)

    citydisplay.id = "citydisplay"
    degree.id = "degree"
    humiditydisplay.id = "humiditydisplay"
    descriptiondisplay.id = "descriptiondisplay"
    emoji.id = "emoji"

    display.appendChild(citydisplay)
    display.appendChild(degree)
    display.appendChild(humiditydisplay)
    display.appendChild(descriptiondisplay)
    display.appendChild(emoji)
}

function displayemoji(id) {
    if (id >= 200 && id < 300) return "🌩️"
    else if (id >= 300 && id < 400) return "🌧️"
    else if (id >= 500 && id < 600) return "☔"
    else if (id >= 600 && id < 700) return "❄️"
    else if (id >= 700 && id < 800) return "🌫️"
    else if (id === 800) return "☀️"
    else if (id > 800) return "☁️"
}

function displayerror(message) {
    const errordisplay = document.createElement('p')
    errordisplay.textContent = message
    errordisplay.id = "errordisplay"
    display.textContent = ""
    display.style.display = "flex"
    
    
    display.appendChild(errordisplay)
}
