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
                setLocation(json.response.msgBody.busLocationList);
                console.log(json.response.msgBody.busLocationList);
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
