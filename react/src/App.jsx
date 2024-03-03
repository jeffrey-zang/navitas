import React, { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import { LineChart } from '@mui/x-charts/LineChart';

const App = () => {
  const [settings, setSettings] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:8888');

    socketRef.current.on('serialdata', (data) => {
      setSettings(data);
    });

    return () => {
      socketRef.current.close();
    };
  }, []);

  return (
    <div>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default App;
