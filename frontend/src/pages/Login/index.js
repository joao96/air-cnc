import React, { useState } from 'react';
import api from '../../services/api';

// history é utilizado para fazer a navegação (navigation do RN)
export default function Login({ history }) {

  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault(); // previne o funcionamento padrão do formulário (que seria enviar o usuário para outra página)

    const response = await api.post('/sessions', { email });

    const { _id } = response.data;

    // banco de dados do navegador
    localStorage.setItem('user', _id);

    history.push('/dashboard');
  }

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
      </p>

      {/* javascript dentro do HTML deve ficar dentro de chaves (igual ao RN para o JSX) */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input 
          type="email"
          id="email" 
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <button className="btn" type="submit">Entrar</button>
      </form>
    </>
  )
};