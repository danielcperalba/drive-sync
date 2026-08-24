import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import styles from './styles';
import ViagemCard from "../../components/ViagemCard";  // Componente para exibir cada card de viagem
import CardViagemStatus from "../../components/ViagemStatus"; // Componente que mostra o status da viagem em andamento
import SectionHeader from "../../components/SectionHeader";
import EmptyState from "../../components/EmptyState";
import { Loading } from "../../components/Loading";
import api from "../../services/api";

const Atividade: React.FC = () => {
  const [viagens, setViagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState<string | null>(null);

  // Função para buscar atividades
  const fetchAtividades = async () => {
    try {
      const response = await api.get('/api/Viagens');
      setViagens(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Chama a função de fetch inicial
    fetchAtividades();

    // Configura o polling para chamadas periódicas
    const interval = setInterval(() => {
      fetchAtividades();
    }, 10000); // Atualiza a cada 10 segundos

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []);

  const handleFiltrar = (status: string | null) => {
    setFiltroStatus(status);
  };

  const atividadesFiltradas = filtroStatus
    ? viagens.filter(viagem => viagem.status === filtroStatus)
    : viagens;

  // Filtra a viagem que está com o status "Em andamento" para exibir no CardViagemStatus
  const viagemEmAndamento = viagens.find(viagem => viagem.status === 0); // Verifique se "0" é o valor correto
  const outrasViagens = atividadesFiltradas.filter(viagem => viagem.status === 1);

  if (loading) {
    return <Loading label="Carregando atividades..." />;
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.listContent}
      data={outrasViagens}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ViagemCard viagem={item} />}
      showsVerticalScrollIndicator={false}
      /* O cabeçalho rola junto com a lista, evitando lista dentro de ScrollView. */
      ListHeaderComponent={
        <View style={styles.header}>
          <View style={styles.section}>
            <SectionHeader title="Viagem atual" />
            {viagemEmAndamento ? (
              <CardViagemStatus viagem={viagemEmAndamento} />
            ) : (
              <EmptyState
                icon="navigate-outline"
                title="Nenhuma viagem em andamento"
                description="Use a aba Nova viagem para registrar uma partida."
              />
            )}
          </View>

          <SectionHeader title="Anteriores" subtitle="Viagens já encerradas" />
        </View>
      }
      ListEmptyComponent={
        <EmptyState
          icon="time-outline"
          title="Nenhuma atividade encontrada"
          description="As viagens encerradas aparecerão aqui."
        />
      }
    />
  );
}

export default Atividade;
