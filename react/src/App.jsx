import React, { useState, useEffect, useRef } from "react";
// import io from 'socket.io-client';
import { LineChart } from '@mui/x-charts/LineChart';

const App = () => {
  const xFinal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  const tempFinal = [20.1, 20.2, 20.15, 20.0, 20.25, 20.05, 20.1, 20.05, 20.2, 20.1, 20.15, 20.05, 20.1, 20.2, 20.15, 20.0, 20.25, 20.05, 20.1, 20.05]
  const humidityFinal = [30, 35, 38, 43, 45, 47, 50, 52, 55, 58, 60, 62, 65, 68, 70, 72, 78, 85, 95]

  const [count, setCount] = useState(1)
 
  const [time, setTime] = useState([xFinal[0]])
  const [temp, setTemp] = useState([tempFinal[0]])
  const [humidity, setHumidity] = useState([humidityFinal[0]]);

  // const [data, setData] = useState({});

  // const socketRef = useRef(null);

  // useEffect(() => {
  //   socketRef.current = io('http://localhost:8888');

  //   socketRef.current.on('serialdata', (data) => {
  //     setData(data);
  //   });

  //   return () => {
  //     socketRef.current.close();
  //   };
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(xFinal.slice(0, count))
      setTemp(tempFinal.slice(0, count))
      setHumidity(humidityFinal.slice(0, count))
      setCount(count + 1)
      console.log(temp, humidity, time, count)
      if (count === 20) {
        setCount(1)
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [count]);
  
  return (
    <div className='py-16 px-32'>
      <p className="mb-4 font-bold">Navitas: the world’s first remote sensing platform powered exclusively by air.</p>
      <p>Good morning, it's <strong>{temp[temp.length - 1]}°</strong> and <strong>{humidity[humidity.length - 1]}%</strong> humidity in <strong>our rainforest</strong>.</p>
      <div className='flex items-center w-full gap-8'>
        <div className='w-1/2'>
          <h1 className='text-3xl font-bold mt-8'>Measure of Temperature</h1>
          <LineChart
            xAxis={[{
              label: 'Time (s)',
              data: time
            }]}
            series={[
              {
                data: temp
              },
            ]}
            height={500}
          />
        </div>
        <div className='w-1/2'>
          <h1 className='text-3xl font-bold mt-8'>Measure of Humidity</h1>
          <LineChart
            xAxis={[{
              label: 'Time (s)',
              data: time,
            }]}
            series={[
              {
                data: humidity,
                color: '#4e79a7'
              },
            ]}
            height={500}
          />
        </div>
      </div>
      {/* <p className='mt-4'>This data used in this demo is not gathered in real time.</p> */}
    </div>
  );
};

export default App;
