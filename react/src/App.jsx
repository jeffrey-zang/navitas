import React, { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import { LineChart } from '@mui/x-charts/LineChart';

const App = () => {
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);

  const [data, setData] = useState({});

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:8888');

    socketRef.current.on('serialdata', (data) => {
      setData(data);
    });

    return () => {
      socketRef.current.close();
    };
  }, []);

  return (
    <div className='py-16 px-32'>
      <p>Good morning, it's <strong>{temp}</strong> and <strong>{humidity}</strong> humidity in <strong>our rainforest</strong>.</p>
      <div className='flex items-center w-full gap-8'>
        <div className='w-1/2'>
          <h1 className='text-3xl font-bold mt-8'>Measure of Temperature</h1>
          <LineChart
            xAxis={[{
              data: data[0],
              label: 'Time (s)'
            }]}
            series={[
              {
                data: data[1]
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
              data: data[0]
            }]}
            series={[
              {
                data: data[2],
                color: '#4e79a7'
              },
            ]}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
