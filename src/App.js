import React, { useState } from 'react'
import axios from 'axios'
import moment from 'moment';
import CityName from './CityName';

const API = {
  key: 'e71f1a65664880465abfa686a3e0dccc',
  base: 'https://api.openweathermap.org/data/2.5/'
}

const App = () => {

  const xoaDau = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
  }

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `${API.base}weather?q=${xoaDau(location.toLowerCase())}&appid=${API.key}&lang=vi&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      checkData(location);
      axios.get(url).then((response) => {
        setData(response.data)
      })
    }
  }

  const checkData = (location) => {
    let count = 0;
    CityName.map(data => {
      if (data.city.toLowerCase() === location || data.city.toLowerCase() === location.toLowerCase() || xoaDau(data.city.toLowerCase()) === location) {
        count++;
      }
    })
    if (count === 0) {
      alert("Khu vực này chưa xác định! hoặc bạn gõ thiếu dấu")
    }
  }

  return (
    <div className="container">
      <div className="main-section">
        <div className="search-bar">
          {/* <i className="fas fa-search search-icon"></i> */}
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            type="text"
            className="awesomplete search-city"
            id="search-input"
            placeholder="Nhập tên thành phố"
            list="mylist"
          />
          <datalist id="mylist">
            {CityName.map(data => (<option>{data.city.toLowerCase()}</option>))}
          </datalist>
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
