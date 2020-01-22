import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import socketio from 'socket.io-client';
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem('user');
  // só vai refazer a conexão do usuário quando o user_id mudar, caso contrário, não muda nunca e deixa
  // memorizado o valor de socket para sempre
  const socket = useMemo(() => socketio('http://localhost:3333', {
    query: { user_id },
  }), [user_id]);

  // deve fazer a conexão com o socket apenas 1 vez e depois só fique atualizando os requests
  useEffect(() => {
    socket.on('booking_request', data => {
      setRequests([...requests, data]);
    })
  }, [requests, socket]);

  // vai ser executado assim que a página for renderizada (apenas 1 vez) e toda
  // vez que os parâmetros passados no segundo argumento forem alterados
  useEffect(() => {
    async function loadSpots() {
      // busca o id do usuário que está logado na aplicação lá no localStorage (banco de dados do navegador)
      const user_id = localStorage.getItem('user');
      // recupera os spots que esse usuário cadastrou
      const response = await api.get('/dashboard', {
        headers: { user_id }
      });

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);

    setRequests(requests.filter(request => request._id !== id));
  }

  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`);

    setRequests(requests.filter(request => request._id !== id)); 
  }

  return (
    <>
      <ul className="notifications">
        {requests.map(request => (
          <li key={request._id}>
            <p>
              <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
            </p>
            <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
            <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
          </li>
        ))}

      </ul>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
          </li>
        ) )}
      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  )
};