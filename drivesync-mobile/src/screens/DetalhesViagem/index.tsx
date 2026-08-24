import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import api from '../../services/api';
import theme from '../../theme';
import Card from '../../components/Card';
import InfoRow from '../../components/InfoRow';
import SectionHeader from '../../components/SectionHeader';
import styles from './styles';

const isEmpty = (value: any) => value === null || value === undefined || value === '';

/** Uma parada do trajeto (partida ou chegada). */
const Stop = ({ icon, label, local, data, observacao, isLast = false }) => (
  <View style={styles.stop}>
    <View style={styles.stopMarker}>
      <Ionicons name={icon} size={18} color={theme.COLORS.TEXT_SECONDARY} />
      {!isLast ? <View style={styles.stopLine} /> : null}
    </View>

    <View style={styles.stopContent}>
      <Text style={styles.stopLabel}>{label}</Text>
      <Text style={styles.stopTitle}>{local || 'Local não informado'}</Text>
      {data ? <Text style={styles.stopMeta}>{data}</Text> : null}
      {observacao ? <Text style={styles.stopNote}>{observacao}</Text> : null}
    </View>
  </View>
);

/** Linha do comparativo: métrica, valor no início e no encerramento da viagem. */
const DiagnosticoRow = ({ label, inicio, encerramento, unidade = '', last = false }) => {
  const format = (value: any) =>
    isEmpty(value) ? '—' : unidade ? `${value} ${unidade}` : `${value}`;

  return (
    <View style={[styles.diagnosticoRow, !last && styles.diagnosticoDivider]}>
      <View style={styles.colLabel}>
        <Text style={styles.metricLabel}>{label}</Text>
      </View>
      <View style={styles.colValue}>
        <Text style={isEmpty(inicio) ? styles.metricValueEmpty : styles.metricValue}>
          {format(inicio)}
        </Text>
      </View>
      <View style={styles.colValue}>
        <Text style={isEmpty(encerramento) ? styles.metricValueEmpty : styles.metricValue}>
          {format(encerramento)}
        </Text>
      </View>
    </View>
  );
};

const DetalhesViagem = ({ route }) => {
  const { viagem } = route.params; // Obtém os detalhes da viagem passados como parâmetros
  const [veiculo, setVeiculo] = useState(null); // Estado para armazenar os dados do veículo

  // Função para buscar os detalhes do veículo pela API
  const buscarDetalhesVeiculo = async (id) => {
    try {
      const response = await api.get(`/api/Veiculos/${id}`); // Faz a requisição à API
      setVeiculo(response.data); // Atualiza o estado com os dados do veículo
    } catch (error) {
      console.error("Erro ao buscar dados do veículo", error);
    }
  };

  useEffect(() => {
    if (viagem.veiculoId) {
      buscarDetalhesVeiculo(viagem.veiculoId); // Chama a função para buscar os dados do veículo
    }
  }, [viagem.veiculoId]);

  const formatarData = (data) => {
    if (!data) return ''; // Verifica se a data existe
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) + ' · ' +
      new Date(data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Seção: trajeto da viagem */}
      <View style={styles.section}>
        <SectionHeader title="Informações da viagem" />

        <Card>
          <Stop
            icon="navigate-outline"
            label="Partida"
            local={viagem.localizacaoInicio}
            data={formatarData(viagem.dataInicio)}
            observacao={viagem.observacoesInicio}
          />
          <Stop
            icon="flag-outline"
            label="Chegada"
            local={viagem.localizacaoEncerramento}
            data={formatarData(viagem.dataEncerramento)}
            observacao={viagem.observacoesEncerramento}
            isLast
          />
        </Card>
      </View>

      {/* Seção: Informações do Veículo */}
      <View style={styles.section}>
        <SectionHeader title="Informações do veículo" />

        <Card noPadding style={styles.infoCard}>
          {veiculo ? (
            <>
              <InfoRow label="Veículo" value={`${veiculo.marca} ${veiculo.modelo}`} />
              <InfoRow label="Ano" value={veiculo.ano} />
              <InfoRow label="Placa" value={veiculo.placa} />
              <InfoRow label="Quilometragem" value={`${veiculo.quilometragem} km`} />
              <InfoRow label="Tipo de combustível" value={veiculo.tp_combustivel} />
              <InfoRow label="Cor" value={veiculo.cor} />
              <InfoRow label="Passageiros" value={veiculo.cap_passageiros} last />
            </>
          ) : (
            <InfoRow label="Veículo" value={null} fallback="Carregando..." last />
          )}
        </Card>
      </View>

      {/* Seção: comparativo do diagnóstico (início x encerramento) */}
      <View style={styles.section}>
        <SectionHeader
          title="Diagnóstico do veículo"
          subtitle="Comparativo entre a partida e o encerramento"
        />

        <Card noPadding style={styles.infoCard}>
          <View style={styles.diagnosticoHeader}>
            <View style={styles.colLabel} />
            <View style={styles.colValue}>
              <Text style={styles.columnTitle}>Início</Text>
            </View>
            <View style={styles.colValue}>
              <Text style={styles.columnTitle}>Fim</Text>
            </View>
          </View>

          <DiagnosticoRow
            label="Nível do combustível"
            inicio={viagem.nivelCombustivelInicio}
            encerramento={viagem.nivelCombustivelEncerramento}
            unidade="%"
          />
          <DiagnosticoRow
            label="Temperatura do sensor"
            inicio={viagem.temperaturaSensor02Inicio}
            encerramento={viagem.temperaturaSensor02Encerramento}
            unidade="°C"
          />
          <DiagnosticoRow
            label="Temperatura da transmissão"
            inicio={viagem.temperaturaTransmissaoInicio}
            encerramento={viagem.temperaturaTransmissaoEncerramento}
            unidade="°C"
          />
          <DiagnosticoRow
            label="Código de falha"
            inicio={viagem.codigoFalhaInicio}
            encerramento={viagem.codigoFalhaEncerramento}
          />
          <DiagnosticoRow
            label="Voltagem da bateria"
            inicio={viagem.voltagemBateriaInicio}
            encerramento={viagem.voltagemBateriaEncerramento}
            unidade="V"
          />
          <DiagnosticoRow
            label="Status da transmissão"
            inicio={viagem.statusTransmissaoInicio}
            encerramento={viagem.statusTransmissaoEncerramento}
            last
          />
        </Card>
      </View>
    </ScrollView>
  );
};

export default DetalhesViagem;
