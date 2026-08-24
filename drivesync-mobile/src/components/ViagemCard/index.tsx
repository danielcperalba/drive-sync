import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import theme from '../../theme';
import IconTile from '../IconTile';
import StatusBadge from '../StatusBadge';
import { StackNavigationProp } from '../../@type/navigation';
import { connectSignalR, listenToUpdates, disconnectSignalR } from "../../services/signalRService";

import api from "../../services/api";

type NavigationProp = StackNavigationProp<RootStackParamList, 'DetalhesViagem'>;

interface ViagemCardProps {
  viagem: {
    id: number;
    origem: string;
    destino: string;
    motorista: string;
    veiculo: string;
    dataInicio: string;
    dataEncerramento: string;
    status: string;
    localizacaoInicio?: string;
    localizacaoEncerramento?: string;
  };
}

export default function ViagemCard({ viagem }: ViagemCardProps) {
  const navigation = useNavigation<NavigationProp>();
  const [viagemAtualizada, setViagemAtualizada] = useState(viagem);
  const [modeloVeiculo, setModeloVeiculo] = useState<string | null>(null);
  const [marcaVeiculo, setMarcaVeiculo] = useState<string | null>(null);

  const handleCardPress = () => {
    navigation.navigate('DetalhesViagem', { viagem: viagemAtualizada });
  };

  const buscarDetalhesVeiculo = async (
    id: number,
    setModelo: (modelo: string) => void,
    setMarca: (marca: string) => void
  ) => {
    try {
      const response = await api.get(`/api/Veiculos/${id}`); // Faz a requisição à API
      setModelo(response.data.modelo); // Atualiza o estado com o modelo do veículo
      setMarca(response.data.marca);  // Atualiza o estado com a marca do veículo
    } catch (error) {
      console.error("Erro ao buscar dados do veículo", error);
    }
  };

  // Função para formatar a data
  const formatarData = (data: string) => {
    if (!data) return '';
    const dateObj = new Date(data);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return dateObj.toLocaleString('pt-BR', options).replace(',', ''); // Exemplo: "11 Set, 2024 - 23:00"
  };

  // Conectar ao SignalR quando o componente for montado
  useEffect(() => {
    // Busca os detalhes do veículo ao carregar o card
    if (viagem.veiculoId) {
      buscarDetalhesVeiculo(viagem.veiculoId, setModeloVeiculo, setMarcaVeiculo);
    }

    const connection = connectSignalR();

    // Escutar por atualizações e atualizar o estado da viagem
    listenToUpdates((data) => {
      if (data.id === viagem.id) {
        setViagemAtualizada(data);  // Atualiza os dados da viagem com as novas informações
        if (data.veiculoId) {
          buscarDetalhesVeiculo(data.veiculoId, setModeloVeiculo, setMarcaVeiculo);
        }
      }
    });

    // Limpar a conexão SignalR ao desmontar o componente
    return () => {
      disconnectSignalR();
    };
  }, [viagem.id]);

  const emAndamento = viagemAtualizada.status === '1';
  const dataFormatada = formatarData(viagemAtualizada.dataEncerramento);

  return (
    <Pressable
      onPress={handleCardPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <IconTile name="location-outline" />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {viagemAtualizada.localizacaoEncerramento || 'Destino não informado'}
        </Text>

        <Text style={styles.subtitle} numberOfLines={1}>
          {marcaVeiculo ? `${marcaVeiculo} — ${modeloVeiculo}` : 'Carregando...'}
        </Text>

        <View style={styles.metaRow}>
          <StatusBadge
            label={emAndamento ? 'Em andamento' : 'Encerrada'}
            tone={emAndamento ? 'info' : 'neutral'}
          />
          {dataFormatada ? <Text style={styles.subtitle}>{dataFormatada}</Text> : null}
        </View>
      </View>

      <Ionicons name="chevron-forward" size={18} color={theme.COLORS.TEXT_TERTIARY} />
    </Pressable>
  );
}
