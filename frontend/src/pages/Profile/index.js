import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './style.css';

// backend connection api
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function Profile() {

  // lista de 'incidentes' da 'ong'
  const [incidents, setIncidents] = useState([]);

  // dados da 'ong' que estão armazenados no browser
  const ong_id = localStorage.getItem('ong_id');
  const ong_name = localStorage.getItem('ong_name');

  // objeto do react para navegação entre páginas
  const history = useHistory();

  // useEffect - define uma função que deve ser executada quando um objeto for modificado
  // nesse caso o array '[ong_id]' estabelece que caso o 'id' da ong seja modificado
  // a lista de 'incidentes' da 'ong' deve ser novamente carregada do backend
  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ong_id,
      },
    }).then(response => {
      setIncidents(response.data);
    });
  }, [ong_id]);

  /**
   * Handle function para o evento de exclusão de um 'incidente'
   */
  async function handleDeleteIncident(id) {
    try {

      // faz uma chamada ao backend para exclusão do 'incidente'
      const response = await api
        .delete(`incidents/${id}`, {
          headers: {
            Authorization: ong_id,
          }
        });

      // atualiza a lista de 'incidentes' filtrando todas que com 'id' diferente
      // do 'incidente' excluído.
      setIncidents(incidents.filter(
        incident => incident.id !== id
      ));

      alert('Caso excluído com sucesso!');
    } catch (error) {
      alert('Não foi possível deletar o caso, por favor tente novamente!')
    }
  }

  /**
   * Handle function para o evento 'onClick' do botão de logout.
   * Limpa os dados armazenados localmente no browser e redireciona para página inicial da aplicação
   */
  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vindo(a), {ong_name}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>
      <ul>
        {
          incidents.map(incident => (
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{incident.description}</p>

              <strong>VALOR:</strong>
              <p>{
                Intl.NumberFormat(
                  'pt-BR',
                  { style: 'currency', currency: 'BRL' }
                ).format(incident.value)
              }</p>

              <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}