import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useAuth } from "../../contexts/auth";
import CardViagemStatus from "../../components/ViagemStatus"; // Componente que mostra o status da viagem em andamento
import SectionHeader from "../../components/SectionHeader";
import StatTile from "../../components/StatTile";
import EmptyState from "../../components/EmptyState";
import { Loading } from "../../components/Loading";
import { formatarDataCurta } from "../../utils/formatters";
import styles from "./styles";
import api from "../../services/api";

const Home: React.FC = () => {
  const { user } = useAuth();
  const [viagens, setViagens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState<string | null>(null);

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

  const viagemEmAndamento = viagens.find(viagem => viagem.status === 0); // Verifique se "0" é o valor correto
  const outrasViagens = atividadesFiltradas.filter(viagem => viagem.status === 1);

  if (loading) {
    return <Loading label="Carregando suas viagens..." />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Saudação personalizada com o nome do usuário */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Bem-vindo, {user?.name || "Usuário"}!</Text>
        <Text style={styles.greetingSubtitle}>Acompanhe suas viagens e o veículo em uso.</Text>
      </View>

      {/* Renderiza o CardViagemStatus para viagem em andamento, se existir */}
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

      {/* Resumo de Viagens */}
      <View style={styles.section}>
        <SectionHeader title="Resumo de viagens" />
        <View style={styles.tileRow}>
          <StatTile
            icon="git-branch-outline"
            value={viagens.length}
            label="Viagens registradas"
          />
          <StatTile
            icon="calendar-outline"
            /* `data_inicio` é o campo usado no mock; a API devolve `dataInicio`. */
            value={formatarDataCurta(viagens[0]?.data_inicio ?? viagens[0]?.dataInicio) ?? '—'}
            label="Última viagem"
          />
        </View>
      </View>

      {/* Estatísticas */}
      <View style={styles.section}>
        <SectionHeader title="Estatísticas" />
        <View style={styles.tileRow}>
          <StatTile
            icon="navigate-outline"
            value={viagens.filter(v => v.status === 0).length}
            label="Em andamento"
          />
          <StatTile
            icon="checkmark-circle-outline"
            value={viagens.filter(v => v.status === 1).length}
            label="Concluídas"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
