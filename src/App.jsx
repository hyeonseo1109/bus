import { useState, useEffect } from 'react'
import './App.css'

function BusStation() {
  const [stations, setStations] = useState( [] );

  useEffect( () => {
    const getData = async () => {
      try {
      const data = await fetch('https://apis.data.go.kr/6410000/busrouteservice/v2/getBusRouteStationListv2?serviceKey=GS5aLVDaFTPnk4vYpexWNPYAl22LeqGp3N5duJZ3OqXXCfMOz0%2FleRDyv%2B6xHXvIogUG8jV2gCGaG04Hs39uRQ%3D%3D&routeId=241314001&format=json');
      const json = await data.json();
      setStations(json.response.msgBody.busRouteStationList);
      } catch (err) {
        console.error('에러 발생:', err);
      }
    };
    getData();
    }, [] );

  return (
    <>
      <h1>버스정류장</h1>
      <ul>
        {stations.map( (station) => (
          <div className="busStop">
            <p>{station.stationName} (id: {station.stationId})</p>
            <p>|</p>
          </div>
        ))}
      </ul>
    </>
  );
}

export default BusStation;
