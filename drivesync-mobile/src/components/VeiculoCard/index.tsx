import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import theme from '../../theme';
import IconTile from '../IconTile';
import StatusBadge, { veiculoStatusTone } from '../StatusBadge';
import { StackNavigationProp } from '../../@type/navigation';

type NavigationProp = StackNavigationProp<RootStackParamList, 'DetalhesVeiculo'>;

interface VeiculoCardProps {
  veiculo: {
    id: number;
    marca: string;
    modelo: string;
    ano: number;
    placa: string;
    quilometragem: number;
    tp_combustivel: string;
    dt_aquisicao: string;
    status: string;
  };
}

export default function VeiculoCard({ veiculo }: VeiculoCardProps) {
  const navigation = useNavigation<NavigationProp>();

  const handleCardPress = () => {
    navigation.navigate('DetalhesVeiculo', { veiculo });
  };

  return (
    <Pressable
      onPress={handleCardPress}
      accessibilityRole="button"
      accessibilityLabel={`${veiculo.marca} ${veiculo.modelo}, placa ${veiculo.placa}`}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <IconTile name="bus-outline" />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {veiculo.marca} {veiculo.modelo}
        </Text>
        <Text style={styles.subtitle}>{veiculo.placa}</Text>

        <View style={styles.badgeRow}>
          <StatusBadge label={veiculo.status} tone={veiculoStatusTone(veiculo.status)} />
        </View>
      </View>

      <Ionicons name="chevron-forward" size={18} color={theme.COLORS.TEXT_TERTIARY} />
    </Pressable>
  );
}
