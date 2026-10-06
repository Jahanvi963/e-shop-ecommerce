import { useEffect, useState } from "react";

function ApiTest() {
    const [message, setMessage] = useState("Connecting...");

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/test`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Backend response failed");
                }

                return response.json();
            })
            .then((data) => {
                setMessage(data.message);
            })
            .catch((error) => {
                console.error("Backend Error:", error);
                setMessage("Backend connection failed");
            });
    }, []);

    return (
        <div className="api-test">
            <h2>Backend Connection</h2>
            <p>{message}</p>
        </div>
    );
}

export default ApiTest;