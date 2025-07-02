import { useState, useEffect } from 'react'
import './App.css'
import BusStation from './busStation';

function BusLocation () {
    const [locations, setLocation] = useState([]);
    const id = 219000013;
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetch(`https://apis.data.go.kr/6410000/buslocationservice/v2/getBusLocationListv2?serviceKey=GS5aLVDaFTPnk4vYpexWNPYAl22LeqGp3N5duJZ3OqXXCfMOz0%2FleRDyv%2B6xHXvIogUG8jV2gCGaG04Hs39uRQ%3D%3D&routeId=${id}&format=json`);
                const json = await data.json();
                const busLocations = json.response.msgBody.busLocationList;
                // 실시간 버스가 여러 대 있을 때는 busLocationList가 배열로 오지만, 
                // 딱 1대만 있을 때는 단일 객체 형태로 오고, 아예 없으면 null로 올 수 있음. 
                setLocation(busLocations ? (Array.isArray(busLocations) ? busLocations : [busLocations]) : []);
                // busLocations가 존재하면? 근데 그게 배열이 맞으면? 그냥 그대로 busLocations 쓰고 / 아니라면 빈 배열 추가하거나 빈 배열에 집어넣음.
            } catch (err) {
                console.error('에러 발생:', err);
            }
        };
        getData();

        const interval = setInterval( () => {
            getData();
        }, 3000);
    
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <BusStation locations={locations} />
        </>
    );
}

export default BusLocation;
