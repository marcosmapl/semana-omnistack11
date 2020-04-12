import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';

// backend connection api
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {

  // atributos da 'incidente'
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  // objeto do react para navegação entre páginas
  const history = useHistory();

  /**
   * Handle function do evento de inclusão do 'incidente' (form submit)
   * @param {*} event 
   */
  async function handleNewIncident(event) {

    // previne o comportamento 'padrão' de submissão do 'form' html
    event.preventDefault();

    // recupera, no armazenamento local do navegador, o 'id' da 'ong' logada no sistema.
    const ong_id = localStorage.getItem('ong_id');

    // cria um objeto com as informações do 'incidente'
    const data = {
      title,
      description,
      value,
    };

    try {
      // faz uma chamada ao backend para a inclusão do 'incidente'
      // no cabeçalho da requisição é enviado o 'id' da 'ong' logada no sistema.
      const response = await api
        .post('incidents', data, {
          headers: {
            Authorization: ong_id,
          }
        });
      
      alert(`Incidente cadastrado com sucesso!: ${response.data.id}`);
      
      // retorna para a página de perfil da 'ong'
      history.push('/profile');
    } catch (error) {
      alert('Não foi possível cadastrar o novo caso, por favor tente novamente mais tarde!');
    }

  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)} />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          <input
            placeholder="Valor em R$"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}