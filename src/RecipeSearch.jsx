import React, { useState } from 'react';

const WeatherSearch = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = () => {
        const apiKey = '4492876f7e1d2bc06f03b37129fc29c5'; 
        const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(city)}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных о погоде');
                }
                return response.json();
            })
            .then(data => {
                if (data.current) {
                    setWeatherData(data);
                    setError('');
                } else {
                    setError('Город не найден');
                    setWeatherData(null);
                }
            })
            .catch(err => {
                setError(err.message);
                setWeatherData(null);
            });
    };
    return (
        <div className="container">
            <h1>Поиск Погоды по Городам</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Введите название города"
                style={{ width: '300px', padding: '10px', marginRight: '10px' }}
            />
            <button onClick={handleSearch} style={{ padding: '10px 15px' }}>Поиск</button>
            <div id="results" style={{ marginTop: '20px' }}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {weatherData && (
                    <div>
                        <h3>Погода в {weatherData.location.name}, {weatherData.location.country}</h3>
                        <p>Температура: {weatherData.current.temperature}°C</p>
                        <p>Состояние: {weatherData.current.weather_descriptions[0]}</p>
                        <img src={weatherData.current.weather_icons[0]} alt={weatherData.current.weather_descriptions[0]} style={{ width: '100px', height: '100px' }} />
                    </div>
                )}
            </div>
        </div>
    );
};





export default WeatherSearch;