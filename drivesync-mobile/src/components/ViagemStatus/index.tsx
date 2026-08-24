import React, { useState, useEffect } from "react";
import { View, Text, Alert, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '../../@type/navigation';
import * as Location from 'expo-location';
import LocalizacaoCard from '../LocalizacaoCard';
import EmptyState from '../EmptyState';
import StatusBadge from '../StatusBadge';
import theme from '../../theme';
import styles from './styles';
import { connectSignalR, listenToUpdates, disconnectSignalR } from '../../services/signalRService';

import api from "../../services/api";

type NavigationProp = StackNavigationProp<RootStackParamList, 'EncerrarViagem'>;

interface ViagemCardProps {
  viagem: {
    id: number;
    origem: string;
    destino: string;
    dataInicio: string;
    status: string;
    localizacaoInicio: string;
    veiculoId: string;
  } | null;
}

export default function ViagemCard({ viagem }: ViagemCardProps) {
  const [location, setLocation] = useState<any>(null);
  const [locationText, setLocationText] = useState<string>("Obtendo localização...");
  const [viagemAtualizada, setViagemAtualizada] = useState(viagem);  // Estado para a viagem atualizada
  const [modeloVeiculo, setModeloVeiculo] = useState<string | null>(null);
  const [marcaVeiculo, setMarcaVeiculo] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp>();

  const handleCardPress = () => {
    if (viagem) {
      navigation.navigate('EncerrarViagem', { viagem });
    }
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

  useEffect(() => {
    // Conectar ao SignalR
    const connection = connectSignalR();

    // Ouvir atualizações de viagem em tempo real
    listenToUpdates((data) => {
      console.log('Viagem atualizada:', data);
      setViagemAtualizada(data);  // Atualiza a viagem com os novos dados
    });

    // Limpar a conexão quando o componente for desmontado
    return () => {
      disconnectSignalR();
    };
  }, []);  // Este efeito só roda uma vez, quando o componente for montado

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da permissão para acessar sua localização.');
        return;
      }

      if (viagem?.veiculoId) {
        buscarDetalhesVeiculo(viagem.veiculoId, setModeloVeiculo, setMarcaVeiculo);
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address && address.length > 0) {
        const { subregion, region, street } = address[0];

        // Sigla do estado a partir das maiúsculas do nome da região.
        const regionAbbreviation = region
          ? region.match(/[A-Z]/g).join('')
          : 'RG';

        setLocationText(
          `${street ? street : 'Rua desconhecida'}, ${subregion ? subregion : 'Cidade desconhecida'}, ${regionAbbreviation}`
        );
      } else {
        setLocationText('Localização desconhecida');
      }
    };

    listenToUpdates((data) => {
      if (data.id === viagem?.id) {
        setViagemAtualizada(data);  // Atualiza os dados da viagem com as novas informações
        if (data.veiculoId) {
          buscarDetalhesVeiculo(data.veiculoId, setModeloVeiculo, setMarcaVeiculo);
        }
      }
    });

    getLocation();
  }, []);

  if (!viagemAtualizada) {
    return (
      <EmptyState
        icon="navigate-outline"
        title="Nenhuma viagem em andamento"
        description="Inicie uma nova viagem para acompanhar o trajeto por aqui."
      />
    );
  }

  const emAndamento = viagemAtualizada.status !== '0';
  const dataInicio = new Date(viagemAtualizada.dataInicio);

  return (
    <Pressable
      onPress={handleCardPress}
      accessibilityRole="button"
      accessibilityLabel="Viagem em andamento. Toque para encerrar."
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.localizacaoWrapper}>
        <LocalizacaoCard
          endereco={locationText}
          location={location}
          titulo="Onde você está agora"
          variant="filled"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <StatusBadge
            label={emAndamento ? 'Em andamento' : 'Encerrada'}
            tone={emAndamento ? 'info' : 'neutral'}
          />
          <Text style={styles.meta}>
            {dataInicio.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })} · {dataInicio.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>

        <View style={styles.routeRow}>
          <Text style={styles.title} numberOfLines={1}>
            {viagemAtualizada.localizacaoInicio}
          </Text>
          <Ionicons name="arrow-forward" size={16} color={theme.COLORS.TEXT_TERTIARY} />
          <Text style={styles.titlePending}>...</Text>
        </View>

        <View style={styles.metaRow}>
          <Ionicons name="bus-outline" size={14} color={theme.COLORS.TEXT_TERTIARY} />
          <Text style={styles.meta} numberOfLines={1}>
            {marcaVeiculo ? `${marcaVeiculo} — ${modeloVeiculo}` : 'Carregando...'}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Encerrar viagem</Text>
          <Ionicons name="chevron-forward" size={18} color={theme.COLORS.TEXT_PRIMARY} />
        </View>
      </View>
    </Pressable>
  );
}
