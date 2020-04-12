import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {

  // lista de 'incidentes' disponíveis para ajuda
  const [incidents, setIncidents] = useState([]);

  // total de 'incidentes'
  const [total, setTotal] = useState(0);

  // paginação da lista de incidentes
  const [page, setPage] = useState(1);
  // booleano incida se novos 'incidentes' estão sendo buscados no backend
  // evitar múltiplas requisições
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  /**
   * Redireciona para tela de detalhes do 'incidente'.
   * @param {*} incident - o 'incidente' selecionado.
   */
  function navigateToDetail(incident) {
    // faz a navegação para tela de detalhes passando o 'incidente' selecionado na lista
    navigation.navigate('Detail', { incident });
  }

  /**
   * Carrega a lista de 'incidentes' conforme o usuário desliza pela listagem
   */
  async function loadIncidents() {
    // se: 
    //    novos 'incidentes' estão sendo carregados
    //                        ou
    //    todos os 'incidentes' já foram carregados
    // então não faz novas requisições ao backend
    if ((loading) || (total > 0 && incidents.length === total)) {
      return;
    }

    setLoading(true);

    // faz uma requisição ao backend para obter a lista de 'incidentes' paginada
    const response = await api.get('incidents', {
      params: { page }
    });

    // os 'incidentes' da páginação atual são anexados ao final da lista já existente
    setIncidents([...incidents, ...response.data]);

    // atualiza o total de 'incidentes' listados
    setTotal(response.headers['x-total-count']);

    // atualiza o contador de paginação
    setPage(page + 1);

    // informa que foi feito o carregamento da lista
    setLoading(false);
  }

  // quando for terminada a renderização do componente
  // carrega a lista de 'incidentes'
  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        //showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {
                Intl
                  .NumberFormat('pt-BR', { style: 'currency', currency: 'BRl' })
                  .format(incident.value)
              }
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />

    </View>
  );
}