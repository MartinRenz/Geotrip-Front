import React, { useState, useEffect } from "react";
import "./ErrorNotification.css"; // Arquivo de estilos

const ErrorNotification = ({ message, onClose }) => {
  const [visible, setVisible] = useState(false);

  // Controla a animação de entrada
  useEffect(() => {
    setVisible(true);
  }, []);

  // Função para fechar a notificação
  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); // Espera o tempo da animação para remover
  };

  return (
    <div className={`error-notification ${visible ? "visible" : ""}`} onClick={handleClose}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorNotification;