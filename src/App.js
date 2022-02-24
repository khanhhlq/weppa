import React, { useState } from 'react'
import axios from 'axios'
import moment from 'moment';

const API = {
  key: 'e71f1a65664880465abfa686a3e0dccc',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `${API.base}weather?q=${location}&appid=${API.key}&lang=vi&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
    }
  }

  return (
    <div className="container">
      <div className="main-section">
        <div className="search-bar">
          <i className="fas fa-search search-icon"></i>
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            type="text"
            name="search-city"
            id="search-input"
            placeholder="Tìm kiếm thành phố..."
          />
        </div>
        <div className="info-wrapper">
          <p className="city-name">{data.name}</p>
          {data.weather ? <p className="weather-state">{data.weather[0].description}</p> : null}
          {data.weather ? <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather icon" className="weather-icon" /> : null}
          {data.weather ? <p className="temperature">{Math.round(data.main.temp)}</p> : null}
        </div>
      </div>
      <div className="additional-section">
        <div className="row">
          <div className="item">
            <div className="label">Mặt trời mọc</div>
            {data.sys ? <div className="value sunrise">{moment.unix(data.sys.sunrise).format('HH:mm')}</div> : null}
          </div>
          <div className="item">
            <div className="label">Mặt trời lặn</div>
            {data.sys ? <div className="value sunset">{moment.unix(data.sys.sunset).format('HH:mm')}</div> : null}
          </div>
        </div>
        <div className="row">
          <div className="item">
            <div className="label">Độ ẩm</div>
            {data.main ? <div className="value"><span className="humidity">{data.main.humidity}</span>%</div> : null}
          </div>
          <div className="item">
            <div className="label">Gió</div>
            {data.wind ? <div className="value"><span className="wind-speed">{Math.round((data.wind.speed * 3.6).toFixed(2))}</span> km/h</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
