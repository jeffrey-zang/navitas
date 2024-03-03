import React, { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';

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
      {settings && (
        <div>
          <h1>Serial Data</h1>
          <p>{settings}</p>
        </div>
      )}
    </div>
  );
};

export default App;
