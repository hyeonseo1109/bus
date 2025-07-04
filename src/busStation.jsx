import { useState, useEffect } from 'react';
import './App.css';

function BusStation({ locations = [] }) {
    const [stations, setStations] = useState([]);
    const id = 219000013;
    const path = "https://apis.data.go.kr";
    const url = "6410000/busrouteservice/v2/getBusRouteStationListv2?serviceKey=GS5aLVDaFTPnk4vYpexWNPYAl22LeqGp3N5duJZ3OqXXCfMOz0%2FleRDyv%2B6xHXvIogUG8jV2gCGaG04Hs39uRQ%3D%3D&routeId="

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetch(`${path}/${url}${id}&format=json`);
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
            <h1 className='title'>실시간 <span className='span'>1000번</span> 버스 위치</h1>
            {locations.length === 0 ? (<p className="no-bus-message">현재 운행 중인 버스가 없습니다.</p>) : null}
            <div className="section">
                <div className='bar'></div>
                
                <ul className='busStopList'>
                    {stations.map((station) => (
                        <>
                            <li className="busStop" key={`${station.stationId}-${station.stationSeq}`}>
                                <span className='circle'></span>
                                {station.stationName}
                                {locations.some(location => Number(location.stationId) === Number(station.stationId)) && (<span className='icon'>🚌</span>)}
                            </li>
                            {station.turnYn === "Y" ? (<hr className='line'/>) : null }
                        </>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default BusStation;