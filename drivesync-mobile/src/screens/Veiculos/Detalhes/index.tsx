import React from "react";
import { View, Text, ScrollView } from "react-native";
import ManutencaoCard from "../../../components/ManutencaoCard";
import Card from "../../../components/Card";
import IconTile from "../../../components/IconTile";
import InfoRow from "../../../components/InfoRow";
import SectionHeader from "../../../components/SectionHeader";
import EmptyState from "../../../components/EmptyState";
import StatusBadge, { veiculoStatusTone } from "../../../components/StatusBadge";
import styles from "./styles";

export default function DetalhesVeiculo({ route }) {
  const { veiculo } = route.params;

  // Ordenar manutenções por data (mais recente primeiro)
  const manutencoesOrdenadas = [...(veiculo.manutencoes ?? [])].sort(
    (a, b) => new Date(b.dt_manutencao).getTime() - new Date(a.dt_manutencao).getTime()
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.identity}>
        <IconTile name="bus-outline" variant="solid" size={52} />

        <View style={styles.identityTexts}>
          <Text style={styles.title}>{veiculo.marca} {veiculo.modelo}</Text>
          <Text style={styles.plate}>{veiculo.placa}</Text>
          <StatusBadge label={veiculo.status} tone={veiculoStatusTone(veiculo.status)} />
        </View>
      </View>

      <Card noPadding style={styles.infoCard}>
        <InfoRow label="Quilometragem atual" value={`${veiculo.quilometragem} km`} />
        <InfoRow label="Tipo de combustível" value={veiculo.tp_combustivel} />
        <InfoRow label="Cor" value={veiculo.cor} />
        <InfoRow label="Capacidade" value={veiculo.cap_passageiros} last />
      </Card>

      <View style={styles.section}>
        <SectionHeader title="Últimas manutenções" />

        {manutencoesOrdenadas.length > 0 ? (
          manutencoesOrdenadas.map((manutencao) => (
            <ManutencaoCard key={manutencao.id} manutencao={manutencao} />
          ))
        ) : (
          <EmptyState
            icon="construct-outline"
            title="Nenhuma manutenção cadastrada"
            description="O histórico de manutenções deste veículo aparecerá aqui."
          />
        )}
      </View>
    </ScrollView>
  );
}
