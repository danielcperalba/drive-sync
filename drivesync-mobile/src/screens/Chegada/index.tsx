import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native";
import * as Location from 'expo-location';
import styles from './styles';
import api from '../../services/api';
import Button from '../../components/Button';
import Callout from '../../components/Callout';
import LocalizacaoCard from '../../components/LocalizacaoCard';
import Input from '../../components/Input';
import SectionHeader from '../../components/SectionHeader';

export default function EncerrarViagem({ route, navigation }) {
  const { viagem } = route.params;
  const [location, setLocation] = useState(null);
  const [locationText, setLocationText] = useState("Obtendo localização...");
  const [observacoes, setObservacoes] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [encerramentoData, setEncerramentoData] = useState({
    nivelCombustivelEncerramento: 0,
    statusControleEmissaoEncerramento: true,
    monitorCatalisadorEncerramento: true,
    monitorSensor02Encerramento: true,
    temperaturaSensor02Encerramento: 0,
    temperaturaTransmissaoEncerramento: 0,
    statusTransmissaoEncerramento: 'string',
    codigoFalhaEncerramento: 'string',
    statusMonitoresEmissaoEncerramento: true,
    voltagemBateriaEncerramento: 0
  });

  useEffect(() => {
    const fetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da permissão para acessar sua localização.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High, // Ajuste a precisão se necessário
      });


      // Realiza a reversão das coordenadas para um nome de local
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Verifica se a reversão foi bem-sucedida e define o texto da localização
      if (address && address.length > 0) {
        const { district, subregion, region, street } = address[0];
        setLocation(location);

        // Pega todas as letras maiúsculas da string da região
        const regionAbbreviation = region
          ? region
            .match(/[A-Z]/g) // Encontra todas as letras maiúsculas
            .join('') // Junta as letras em uma string
          : 'RG'; // Valor padrão se region não existir

        setLocationText(`${street ? street : 'Rua desconhecida'}, ${subregion ? subregion : 'Cidade desconhecida'}, ${regionAbbreviation}`);
      } else {
        setLocationText('Localização desconhecida');
      }
    };

    fetchLocation();
  }, []);

  const handleEncerrarViagem = async () => {
    if (!location) {
      Alert.alert('Localização', 'Aguarde enquanto obtemos sua localização.');
      return;
    }

    setEnviando(true);

    try {
      const payload = {
        id: viagem.id,
        motoristaId: viagem.motoristaId,
        veiculoId: viagem.veiculoId,
        localizacaoEncerramento: locationText,
        observacoesEncerramento: observacoes,
        nivelCombustivelEncerramento: encerramentoData.nivelCombustivelEncerramento,
        statusControleEmissaoEncerramento: encerramentoData.statusControleEmissaoEncerramento,
        monitorCatalisadorEncerramento: encerramentoData.monitorCatalisadorEncerramento,
        monitorSensor02Encerramento: encerramentoData.monitorSensor02Encerramento,
        temperaturaSensor02Encerramento: encerramentoData.temperaturaSensor02Encerramento,
        temperaturaTransmissaoEncerramento: encerramentoData.temperaturaTransmissaoEncerramento,
        statusTransmissaoEncerramento: encerramentoData.statusTransmissaoEncerramento,
        codigoFalhaEncerramento: encerramentoData.codigoFalhaEncerramento,
        statusMonitoresEmissaoEncerramento: encerramentoData.statusMonitoresEmissaoEncerramento,
        voltagemBateriaEncerramento: encerramentoData.voltagemBateriaEncerramento,
      };

      const response = await api.put(`/api/Viagens/EncerrarViagem/${viagem.id}`, payload);

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Viagem encerrada com sucesso!');
        // Tira esta tela da pilha de origem e volta para o início da aba
        // 'Início' — 'Home' não existe no nível em que esta tela é aberta.
        navigation.popToTop();
        navigation.navigate('Início', { screen: 'Home' });
      } else {
        console.error('Erro no servidor:', response);
        Alert.alert('Erro', `Erro ao encerrar a viagem: ${response.statusText || response.status}`);
      }
    } catch (error) {
      console.error('Erro ao encerrar a viagem:', error);
      Alert.alert('Erro', `Não foi possível encerrar a viagem: ${error.message}`);
    } finally {
      setEnviando(false);
    }
  };

  // Função para preencher os campos automaticamente com dados simulados
  const handleExtrairDados = () => {
    setEncerramentoData({
      nivelCombustivelEncerramento: 40, // Percentual do tanque após consumo durante a viagem
      statusControleEmissaoEncerramento: true, // Controle de emissões ainda operacional
      monitorCatalisadorEncerramento: true, // Catalisador continua sendo monitorado
      monitorSensor02Encerramento: true, // Sensores O2 ainda ativos e monitorados
      temperaturaSensor02Encerramento: 95, // Temperatura do sensor de oxigênio aumentou levemente
      temperaturaTransmissaoEncerramento: 85, // Temperatura da transmissão subiu devido ao uso
      statusTransmissaoEncerramento: 'Normal', // Transmissão ainda operando normalmente
      codigoFalhaEncerramento: 'Nenhum', // Sem códigos de falha no encerramento
      statusMonitoresEmissaoEncerramento: true, // Todos os monitores de emissão ainda ativos
      voltagemBateriaEncerramento: 12.4 // Tensão da bateria levemente reduzida devido ao uso do sistema elétrico
    });

  };

  const handleLimparCampos = () => {
    setEncerramentoData({
      nivelCombustivelEncerramento: 0,
      statusControleEmissaoEncerramento: true,
      monitorCatalisadorEncerramento: true,
      monitorSensor02Encerramento: true,
      temperaturaSensor02Encerramento: 0,
      temperaturaTransmissaoEncerramento: 0,
      statusTransmissaoEncerramento: 'string',
      codigoFalhaEncerramento: 'string',
      statusMonitoresEmissaoEncerramento: true,
      voltagemBateriaEncerramento: 0
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <SectionHeader title="Sua localização" />

          <LocalizacaoCard endereco={locationText} location={location} />
        </View>

        <View style={styles.section}>
          <SectionHeader title="Dados do veículo (OBD)" />

          <Callout
            tone="warning"
            message="Esta é uma versão de teste. Para simular a extração dos dados, toque em “Extrair dados OBD”."
          />

          <View style={styles.buttonRow}>
            <Button
              title="Extrair dados OBD"
              variant="secondary"
              size="sm"
              icon="download-outline"
              onPress={handleExtrairDados}
              style={styles.buttonRowItem}
            />
            <Button
              title="Limpar dados"
              variant="ghost"
              size="sm"
              onPress={handleLimparCampos}
              style={styles.buttonRowItem}
            />
          </View>

          <View style={styles.fieldsGroup}>
            <Input
              label="Nível de combustível (%)"
              placeholder="Nível de combustível"
              keyboardType="numeric"
              value={encerramentoData.nivelCombustivelEncerramento.toString()}
              onChangeText={(text) => setEncerramentoData({ ...encerramentoData, nivelCombustivelEncerramento: parseFloat(text) })}
            />

            <Input
              label="Status controle emissão"
              placeholder="Status controle emissão"
              value={encerramentoData.statusControleEmissaoEncerramento.toString()}
              onChangeText={(text) => setEncerramentoData({ ...encerramentoData, statusControleEmissaoEncerramento: text === 'true' })}
            />

            <Input
              label="Monitor catalisador"
              placeholder="Monitor catalisador"
              value={encerramentoData.monitorCatalisadorEncerramento.toString()}
              onChangeText={(text) => setEncerramentoData({ ...encerramentoData, monitorCatalisadorEncerramento: text === 'true' })}
            />

            <Input
              label="Monitor sensor 02"
              placeholder="Monitor sensor 02"
              value={encerramentoData.monitorSensor02Encerramento.toString()}
              onChangeText={(text) => setEncerramentoData({ ...encerramentoData, monitorSensor02Encerramento: text === 'true' })}
            />

            <Input
              label="Temperatura sensor 02"
              placeholder="Temperatura sensor 02"
              keyboardType="numeric"
              value={encerramentoData.temperaturaSensor02Encerramento.toString()}
              onChangeText={(text) => setEncerramentoData({ ...encerramentoData, temperaturaSensor02Encerramento: parseFloat(text) })}
            />

            <Input
              label="Temperatura transmissão"
              placeholder="Temperatura transmissão"
              keyboardType="numeric"
              value={encerramentoData.temperaturaTransmissaoEncerramento.toString()}
              onChangeText={(text) => setEncerramentoData({ ...encerramentoData, temperaturaTransmissaoEncerramento: parseFloat(text) })}
            />

            <Input
              label="Status transmissão"
              placeholder="Status transmissão"
              value={encerramentoData.statusTransmissaoEncerramento}
              onChangeText={(text) => setEncerramentoData({ ...encerramentoData, statusTransmissaoEncerramento: text })}
            />

            <Input
              label="Código de falha"
              placeholder="Código de falha"
              autoCapitalize="characters"
              value={encerramentoData.codigoFalhaEncerramento}
              onChangeText={(text) => setEncerramentoData({ ...encerramentoData, codigoFalhaEncerramento: text })}
            />

            <Input
              label="Status monitores emissão"
              placeholder="Status monitores emissão"
              value={encerramentoData.statusMonitoresEmissaoEncerramento.toString()}
              onChangeText={(text) => setEncerramentoData({ ...encerramentoData, statusMonitoresEmissaoEncerramento: text === 'true' })}
            />

            <Input
              label="Voltagem da bateria"
              placeholder="Voltagem da bateria"
              keyboardType="numeric"
              value={encerramentoData.voltagemBateriaEncerramento.toString()}
              onChangeText={(text) => setEncerramentoData({ ...encerramentoData, voltagemBateriaEncerramento: parseFloat(text) })}
            />
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Observações" />

          <Input
            placeholder="Anote algo relevante sobre a chegada (opcional)"
            value={observacoes}
            onChangeText={setObservacoes}
            multiline
          />
        </View>

        <Button
          title="Encerrar viagem"
          icon="flag"
          onPress={handleEncerrarViagem}
          isLoading={enviando}
          style={styles.submit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
