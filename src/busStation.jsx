import { useState, useEffect } from 'react';
import './App.css';

function BusStation({ locations = [] }) {
    const [stations, setStations] = useState([]);
    const id = 219000013;

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetch(`https://apis.data.go.kr/6410000/busrouteservice/v2/getBusRouteStationListv2?serviceKey=GS5aLVDaFTPnk4vYpexWNPYAl22LeqGp3N5duJZ3OqXXCfMOz0%2FleRDyv%2B6xHXvIogUG8jV2gCGaG04Hs39uRQ%3D%3D&routeId=${id}&format=json`);
                const json = await data.json();
                setStations(json.response.msgBody.busRouteStationList);
            } catch (err) {
                console.error('에러 발생:', err);
            }
        };
        getData();
    }, []);

    return (
        <>
            <h1 className='title'>버스정류장</h1>
            <ul className='busStopList'>
                {stations.map((station) => (
                    <li className="busStop" key={`${station.stationId}-${station.stationSeq}`}>
                        {station.stationName} (id: {station.stationId})
                        {locations.some(location => Number(location.stationId) === Number(station.stationId)) && <span>🚌</span>}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default BusStation;