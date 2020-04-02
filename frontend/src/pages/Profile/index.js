import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './style.css';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const ong_id = localStorage.getItem('ong_id');
  const ong_name = localStorage.getItem('ong_name');

  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ong_id,
      },
    }).then(response => {
      setIncidents(response.data);
    });
  }, [ong_id]);

  async function handleDeleteIncident(id) {
    try {
      const response = await api
        .delete(`incidents/${id}`, {
          headers: {
            Authorization: ong_id,
          }
        });

      setIncidents(incidents.filter(
        incident => incident.id !== id
      ));

      alert('Caso excluído com sucesso!');
    } catch (error) {
      alert('Não foi possível deletar o caso, por favor tente novamente!')
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, APAD</span>

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