import { useEffect, useState } from 'react';
import api from '../services/api';


export default function BackendStatus() {
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const checkConnection = () => {
            api.get("/health")
                .then(res => {
                    if (res.data.status === "ok") {
                        setConnected(true);
                    }
                })
                .catch(() => setConnected(false));
        };
        checkConnection();
        const interval = setInterval(checkConnection, 5000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div>
            <h3>Status do backend:</h3>
            <span style={{
                padding: "8px 12px",
                borderRadius: "8px",
                color: "white",
                backgroundColor: "connected" ? "green" : "red"
            }}>
                {connected ? "Conectado" : "Desconctado"}
            </span>
        </div>
    )
}

