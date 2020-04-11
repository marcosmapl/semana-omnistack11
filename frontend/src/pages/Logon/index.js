import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

// backend connection api
import api from '../../services/api';

// imagens da página inicial
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {

  // 'id' da ong que pretende efetuar logon
  const [id, setId] = useState('');

  // objeto do react para navegação entre páginas
  const history = useHistory();

  /**
   * Handle function do evento de logon da 'ong'
   * @param {*} event 
   */
  async function handleLogon(event) {
    
    // previne o comportamento 'padrão' de submissão do 'form' html
    event.preventDefault();

    try {
      // faz uma chamada ao backend verificando o 'id' da ong
      const response = await api.post('sessions', { id });

      // armazena os dados da ong que efetuou logon
      localStorage.setItem('ong_id', id);
      localStorage.setItem('ong_name', response.data.name);

      // avança para a página 'profile'
      history.push('/profile');
    } catch (err) {
      alert('Não foi possível efetuar Logon, verifique o ID!')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero Logo" />

        <form onSubmit={handleLogon}>
          <h1>Faça seu Logon</h1>

          <input
            type="text"
            placeholder="Sua ID"
            value={id}
            onChange={event => setId(event.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}