import React, { useState, useEffect } from 'react';
import Card from './Card';

export default function Content() {
    const [sehir, setSehir] = useState();
    const [havaDurumu, setHavaDurumu] = useState([]);
    const [geo, setGeo] = useState([]);
    const API_KEY = "API_KEY";

    const Cities = [
        'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya',
        'Ardahan', 'Artvin', 'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik', 'Bingöl',
        'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır',
        'Düzce', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane',
        'Hakkâri', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul', 'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman',
        'Kars', 'Kastamonu', 'Kayseri', 'Kırıkkale', 'Kırklareli', 'Kırşehir', 'Kilis', 'Kocaeli', 'Konya',
        'Kütahya', 'Malatya', 'Manisa', 'Mardin', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye',
        'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Şanlıurfa', 'Şırnak', 'Tekirdağ', 'Tokat', 'Trabzon',
        'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'
    ];

    const handleCityChange = (e) => {
            setSehir(e.target.value);
    }

    useEffect(() => {
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${sehir},tr&limit=1&appid=${API_KEY}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('HATA OLUŞTU GEO');
                }
                return response.json();
            })
            .then(data => {
                setGeo(data[0]);
            })
            .catch(error => {
                console.log('Hata oluştu ' + error);
            });
    }, [sehir]);

    useEffect(() => {
        if (geo && geo.lat && geo.lon) {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geo.lat}&lon=${geo.lon}&lang=tr&exclude=current&appid=${API_KEY}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Hata oluştu');
                    }
                    return response.json();
                })
                .then(data => {
                    setHavaDurumu(data.list);
                })
                .catch(error => {
                    console.error('Hata oluştu:', error);
                });
        }
    }, [geo]);

    console.log(havaDurumu)

    return (
        <div className='container'>
            <select value={sehir} onChange={handleCityChange}>
                <option value="">Şehir Seç</option>
                {Cities.map((city, index) => (
                    <option key={index} value={city}>
                        {city}
                    </option>
                ))}
            </select>
            <div className="cards">
                {havaDurumu.slice(0, 5).map((item, index) => (
                    <Card
                        key={index}
                        city={sehir}
                        date={item.dt_txt}
                        degree={item.main.temp}
                        weather={item.weather}
                    />
                ))}
            </div>
        </div>
    )
}
