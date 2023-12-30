import React from 'react'

export default function Card({ city, date, degree, weather}) {
  const dateTimeString = date;
  const dateTimeParts = dateTimeString.split(" "); // Tarihi ve saati boşluklardan ayır
  const celsius = degree - 273.15;

  const tarih = dateTimeParts[0]; // Tarih
  const zaman = dateTimeParts[1]; // Zaman

  return (
    <div className='card'>
      <div className="cityInfo">
        <h2>{city}</h2>
        <p>{tarih}</p>
        <p>{zaman}</p>
      </div>
      <div className="cityState">
      <img src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`} alt="Weather Icon" />
        <p className='description'>{weather[0].description}</p>
        <p>{celsius.toFixed(0) + "°"}</p>
      </div>
    </div>
  )
}
