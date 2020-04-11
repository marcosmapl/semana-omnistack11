import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

// backend connection api
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function Register() {

  // dados da 'ong' a ser incluída
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  // objeto do react para navegação entre páginas
  const history = useHistory();

  /**
   * Handle function para o evento de inclusão da 'ong' (form submit)
   * @param {*} event 
   */
  async function handleRegister(event) {
    // evita o comportamento 'default' do form de submit
    event.preventDefault();

    // cria um objeto com as informações do 'incidente'
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {

      // faz uma chamada ao backend para inclusão da 'ong'
      const response = await api.post('ongs', data);

      alert(`Seu ID de acesso: ${response.data.id}`);

      // redireciona para página inicial
      history.push('/');
    } catch (err) {
      alert('Não foi possível concluir o cadastro, por favor tente novamente mais tarde!')
    }

  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome da ONG"
            value={name}
            onChange={event => setName(event.target.value)} />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={event => setEmail(event.target.value)} />
          <input
            type="text"
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={event => setWhatsapp(event.target.value)} />

          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              value={city}
              onChange={event => setCity(event.target.value)} />
            <input
              type="text"
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={event => setUf(event.target.value)} />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}