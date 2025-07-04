import { useState, useEffect } from 'react'
import './App.css'
import BusStation from './busStation';

function BusLocation () {
    const [locations, setLocation] = useState([]);
    // const id = 219000013;
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetch(`https://apis.data.go.kr/6410000/buslocationservice/v2/getBusLocationListv2?serviceKey=cK%2BEJ2D%2B5ScDSpZks%2FFqzCitoJY8tk00JaD0AGQa1xiob9M84rp60YnI1z9yazrOPfi%2F4Em5RE7meSEHJqW%2BVw%3D%3D&routeId=219000013&format=json`);
                const json = await data.json();
                const busLocations = json.response.msgBody.busLocationList;
                // 실시간 버스가 여러 대 있을 때는 busLocationList가 배열로 오지만, 
                // 딱 1대만 있을 때는 단일 객체 형태로 오고, 아예 없으면 null로 올 수 있음. 
                console.log('real-time locations:', busLocations);
                //setLocation(busLocations ? (Array.isArray(busLocations) ? busLocations : [busLocations]) : []);
                // busLocations가 존재하면? 근데 그게 배열이 맞으면? 그냥 그대로 busLocations 쓰고 / 아니라면 빈 배열 추가하거나 빈 배열에 집어넣음.
                if (busLocations) {
                    if (Array.isArray(busLocations)) {
                        setLocation(busLocations);
                    } else {
                        setLocation([busLocations]);
                    } 
                } else {
                    setLocation( [] );
                }
            } catch (err) {
                console.error('에러 발생:', err);
            }
        };
        getData();

        const interval = setInterval( () => {
            getData();
        }, 10000);
    
        return () => clearInterval(interval);
            //이거 없으면 계속 쌓여서 여러 개가 중첩됨
    }, []);

    return (
        <>
            <BusStation locations={locations} />
        </>
    );
}

export default BusLocation;
