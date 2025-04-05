import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import io from "socket.io-client";

// Establecer la conexión con el servidor Socket.IO
const socket = io("http://localhost:8080");

const Admin: React.FC = () => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("message", message); // Enviar mensaje al servidor
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <textarea
        className="border p-2 w-full max-w-md"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu mensaje..."
      />
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={sendMessage}
      >
        Enviar
      </button>
      <Link to="/cliente" className="mt-4 text-blue-500 underline">
        Ir a Cliente
      </Link>
    </div>
  );
};

const Cliente: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Escuchar el evento de mensaje desde el servidor
    socket.on("message", (newMessage) => {
      setMessage(newMessage); // Solo actualizar con el último mensaje
    });

    // Limpiar el evento al desmontar el componente
    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-4xl p-6">
        <div className="border p-4 w-full h-full flex flex-col justify-center items-center overflow-auto">
          <div className="flex flex-col items-center space-y-4">
            {/* Solo mostrar el último mensaje */}
            <div className="text-white text-xl font-bold p-2">
              {message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/cliente" element={<Cliente />} />
      </Routes>
    </Router>
  );
};

export default App;
