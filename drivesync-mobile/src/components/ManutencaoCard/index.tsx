import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import IconTile from "../IconTile";

interface Manutencao {
  id: number;
  dt_manutencao: string;
  tp_manutencao: string;
  veiculoId: number;
  servico: string;
  descricao: string;
  custo: number;
}

interface ManutencaoCardProps {
  manutencao: Manutencao;
}

export default function ManutencaoCard({ manutencao }: ManutencaoCardProps) {
  return (
    <View style={styles.card}>
      <IconTile name="construct-outline" size={40} />

      <View style={styles.content}>
        <Text style={styles.overline}>Manutenção {manutencao.tp_manutencao}</Text>

        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>{manutencao.servico}</Text>
          <Text style={styles.date}>
            {new Date(manutencao.dt_manutencao).toLocaleDateString('pt-BR')}
          </Text>
        </View>

        {manutencao.descricao ? (
          <Text style={styles.description}>{manutencao.descricao}</Text>
        ) : null}
      </View>
    </View>
  );
}
