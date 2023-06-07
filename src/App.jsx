import { useState } from 'react'
import axios from 'axios'
import './App.scss'

function App() {
  const [data, setData] = useState({})
  const [Location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${Location}&units=imperial&appid=2e8ab56fb548afedd22a4eab8d710317`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
      })
      setLocation('')
    }
  }
  return (
    <>
      <div className="app">
        <div className="search">
          <input
            value={Location}
            onChange={event => setLocation(event.target.value)}
            // onKeyPress={searchLocation}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text" />
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
              {/* <h1>{data.main.temp}°F</h1> */}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].description}</p> : null}
            </div>
          </div>
          {data.name != undefined &&
            <div className="bottom">
              <div className="feels">
                {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                <p>Feels like</p>
              </div>
              <div className="humidity">
                {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                <p>humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                <p>Wind speed</p>
              </div>
            </div>
          }

        </div>
      </div>
    </>
  )
}

export default App
