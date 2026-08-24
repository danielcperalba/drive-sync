import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import styles from './styles';
import VeiculoCard from "../../components/VeiculoCard";
import FilterChips, { FilterOption } from "../../components/FilterChips";
import EmptyState from "../../components/EmptyState";
import { Loading } from "../../components/Loading";
import api from "../../services/api";
import { connectSignalR, listenToVeiculoUpdates, disconnectSignalR } from "../../services/signalRService"; // Importa funções do SignalR

const FILTROS: FilterOption<string | null>[] = [
  { label: 'Todos', value: null },
  { label: 'Disponível', value: 'Disponível' },
  { label: 'Em uso', value: 'Em uso' },
  { label: 'Manutenção', value: 'Em manutenção' },
];

const Veiculo: React.FC = () => {
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Armazena o termo de pesquisa
  const [filteredVeiculos, setFilteredVeiculos] = useState<any[]>([]); // Resultado da pesquisa

  useEffect(() => {
    // Função para buscar os veículos da API
    async function fetchVeiculos() {
      try {
        const response = await api.get('/api/Veiculos');
        setVeiculos(response.data);
        setFilteredVeiculos(response.data); // Inicializa os veículos filtrados com todos os veículos
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchVeiculos();

    // Conectar ao SignalR quando o componente for montado
    const connection = connectSignalR();

    // Ouvir as atualizações do SignalR para veículos
    listenToVeiculoUpdates((data) => {
      console.log('Veículo atualizado via SignalR:', data);
      setVeiculos((prevVeiculos) => {
        // Atualiza os veículos com as novas informações
        return prevVeiculos.map(veiculo =>
          veiculo.id === data.id ? { ...veiculo, ...data } : veiculo
        );
      });
    });

    // Desconectar ao desmontar o componente
    return () => {
      disconnectSignalR();
    };
  }, []);

  // Filtrar os veículos com base no status selecionado
  const handleFiltrar = (status: string | null) => {
    setFiltroStatus(status);
    if (status) {
      setFilteredVeiculos(veiculos.filter(veiculo => veiculo.status === status));
    } else {
      setFilteredVeiculos(veiculos);
    }
  };

  // Buscar veículos pela placa
  const buscarPorPlaca = async (placa: string) => {
    if (placa.trim() === "") {
      setFilteredVeiculos(veiculos); // Restaura a lista original se o campo estiver vazio
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(`/api/Veiculos/VeiculoPorPlaca`, {
        params: { placa },
      });
      setFilteredVeiculos(response.data ? [response.data] : []); // Garante que o resultado seja um array
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar veículo por placa:", error);
      setFilteredVeiculos([]);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading label="Carregando veículos..." />;
  }

  return (
    <View style={styles.container}>
      <FilterChips
        options={FILTROS}
        selected={filtroStatus}
        onSelect={handleFiltrar}
        style={styles.filters}
      />

      <FlatList
        data={filteredVeiculos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <VeiculoCard veiculo={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="bus-outline"
            title="Nenhum veículo encontrado"
            description={
              filtroStatus
                ? `Não há veículos com o status “${filtroStatus}”.`
                : 'Nenhum veículo cadastrado até o momento.'
            }
          />
        }
      />
    </View>
  );
};

export default Veiculo;
