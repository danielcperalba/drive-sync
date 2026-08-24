import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import styles from './styles';
import api from '../../services/api';
import Button from '../../components/Button';
import Card from '../../components/Card';
import LocalizacaoCard from '../../components/LocalizacaoCard';
import Callout from '../../components/Callout';
import ChecklistItem from '../../components/ChecklistItem';
import Input from '../../components/Input';
import SectionHeader from '../../components/SectionHeader';
import SelectField from '../../components/SelectField';
import { useAuth } from "../../contexts/auth";

export default function NovaViagem({ navigation }) {
  const [checkList, setCheckList] = useState({
    Freios: false,
    Pneus: false,
    Luzes: false,
    Combustivel: false,
    Equipamentos: false,
    Estepe: false,
    Extintor: false
  });

  const [veiculos, setVeiculos] = useState([]);
  const [selectedVeiculo, setSelectedVeiculo] = useState("");
  const [location, setLocation] = useState(null);
  const [locationText, setLocationText] = useState("Obtendo localização...");
  const [observacoes, setObservacoes] = useState("");
  const [enviando, setEnviando] = useState(false);
  const { user, signOut } = useAuth();
  const [obdData, setObdData] = useState({
    nivelCombustivelInicio: 0,
    statusControleEmissaoInicio: true,
    monitorCatalisadorInicio: true,
    monitorSensor02Inicio: true,
    temperaturaSensor02Inicio: 0,
    temperaturaTransmissaoInicio: 0,
    statusTransmissaoInicio: 'string',
    codigoFalhaInicio: 'string',
    statusMonitoresEmissaoInicio: true,
    voltagemBateriaInicio: 0
  });

  useEffect(() => {
    const fetchVeiculos = async () => {
      try {
        const response = await api.get('/api/Veiculos');
        const veiculosDisponiveis = response.data.filter(veiculo => veiculo.status === "Disponível");
        setVeiculos(veiculosDisponiveis);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      }
    };

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

    fetchVeiculos();
    fetchLocation();
  }, []);

  const handleCheckBoxChange = (item) => {
    setCheckList(prevState => ({ ...prevState, [item]: !prevState[item] }));
  };

  const handleIniciarViagem = async () => {
    const checklistCompleto = Object.values(checkList).every(Boolean);

    if (!checklistCompleto) {
      Alert.alert('Checklist Incompleto', 'Por favor, complete todos os itens de segurança.');
      return;
    }

    if (!selectedVeiculo) {
      Alert.alert('Seleção de Veículo', 'Por favor, selecione um veículo.');
      return;
    }

    if (!location) {
      Alert.alert('Localização', 'Aguarde enquanto obtemos sua localização.');
      return;
    }

    setEnviando(true);

    try {
      // Suponha que você tenha uma função para obter o e-mail do usuário logado.
      const emailUsuario = user?.email; // Substitua isso com a lógica que obtém o e-mail do usuário

      // Chama o endpoint para obter o motoristaId usando o e-mail do usuário
      const responseEmail = await api.get(`/api/Account/GetUserByEmail/${emailUsuario}`);

      if (responseEmail.status === 200 && responseEmail.data) {
        const motoristaId = responseEmail.data.id; // Suponha que o ID esteja na propriedade 'id' da resposta

        const response = await api.post('/api/Viagens', {
          motoristaId: motoristaId,  // Agora o motoristaId é obtido dinamicamente
          veiculoId: selectedVeiculo,
          localizacaoInicio: locationText,
          checklist: checkList,
          observacoesInicio: observacoes,
          nivelCombustivelInicio: obdData.nivelCombustivelInicio,
          statusControleEmissaoInicio: obdData.statusControleEmissaoInicio,
          monitorCatalisadorInicio: obdData.monitorCatalisadorInicio,
          monitorSensor02Inicio: obdData.monitorSensor02Inicio,
          temperaturaSensor02Inicio: obdData.temperaturaSensor02Inicio,
          temperaturaTransmissaoInicio: obdData.temperaturaTransmissaoInicio,
          statusTransmissaoInicio: obdData.statusTransmissaoInicio,
          codigoFalhaInicio: obdData.codigoFalhaInicio,
          statusMonitoresEmissaoInicio: obdData.statusMonitoresEmissaoInicio,
          voltagemBateriaInicio: obdData.voltagemBateriaInicio,
          dataInicio: new Date().toISOString()
        });

        if (response.status === 201) {
          Alert.alert('Sucesso', 'Viagem iniciada com sucesso!');
          // 'Home' está dentro da pilha da aba 'Início'; navegar direto para
          // 'Home' daqui não é tratado por nenhum navegador.
          navigation.navigate('Início');
        } else {
          Alert.alert('Erro', 'Erro ao iniciar a viagem.');
        }
      } else {
        Alert.alert('Erro', 'Não foi possível obter o ID do motorista.');
      }
    } catch (error) {
      console.log('Erro desconhecido ao iniciar viagem:', error);
      Alert.alert('Erro', `Não foi possível iniciar a viagem: ${error.message}`);
    } finally {
      setEnviando(false);
    }
  };

  const handleExtrairDados = () => {
    setObdData({
      nivelCombustivelInicio: 65, // Percentual do tanque de combustível
      statusControleEmissaoInicio: true, // Controle de emissões funcionando corretamente
      monitorCatalisadorInicio: true, // Catalisador está sendo monitorado
      monitorSensor02Inicio: true, // Sensores O2 estão ativos e sendo monitorados
      temperaturaSensor02Inicio: 85, // Temperatura do sensor de oxigênio em graus Celsius
      temperaturaTransmissaoInicio: 70, // Temperatura da transmissão em graus Celsius
      statusTransmissaoInicio: 'Normal', // Status geral da transmissão
      codigoFalhaInicio: 'P0133', // Código de falha simulado indicando resposta lenta do sensor O2 (exemplo comum)
      statusMonitoresEmissaoInicio: true, // Todos os monitores de emissão ativos
      voltagemBateriaInicio: 12.6 // Tensão da bateria do veículo em volts
    });

  };

  const handleLimparCampos = () => {
    setObdData({
      nivelCombustivelInicio: 0,
      statusControleEmissaoInicio: true,
      monitorCatalisadorInicio: true,
      monitorSensor02Inicio: true,
      temperaturaSensor02Inicio: 0,
      temperaturaTransmissaoInicio: 0,
      statusTransmissaoInicio: 'string',
      codigoFalhaInicio: 'string',
      statusMonitoresEmissaoInicio: true,
      voltagemBateriaInicio: 0
    });
  };

  const itensChecklist = Object.keys(checkList);
  const itensConcluidos = itensChecklist.filter(item => checkList[item]).length;

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
          <SectionHeader title="Ponto de partida" />

          <LocalizacaoCard endereco={locationText} location={location} />
        </View>

        <View style={styles.section}>
          <SectionHeader title="Veículo" />

          <SelectField
            selectedValue={selectedVeiculo}
            onValueChange={setSelectedVeiculo}
            helperText={
              veiculos.length > 0
                ? 'Apenas veículos disponíveis são listados.'
                : 'Nenhum veículo disponível no momento.'
            }
          >
            <Picker.Item label="Selecione um veículo" value="" />
            {veiculos.map(veiculo => (
              <Picker.Item
                key={veiculo.id}
                label={`${veiculo.marca} - ${veiculo.modelo} - ${veiculo.placa}`}
                value={veiculo.id}
              />
            ))}
          </SelectField>
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Checklist de segurança"
            subtitle={`${itensConcluidos} de ${itensChecklist.length} itens confirmados`}
          />

          <Card style={styles.checklistCard}>
            {itensChecklist.map((item, index) => (
              <ChecklistItem
                key={item}
                label={item}
                checked={checkList[item]}
                onToggle={() => handleCheckBoxChange(item)}
                last={index === itensChecklist.length - 1}
              />
            ))}
          </Card>
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
              value={obdData.nivelCombustivelInicio.toString()}
              onChangeText={(text) => setObdData({ ...obdData, nivelCombustivelInicio: parseFloat(text) })}
            />

            <Input
              label="Status controle emissão"
              placeholder="Status controle emissão"
              value={obdData.statusControleEmissaoInicio.toString()}
              onChangeText={(text) => setObdData({ ...obdData, statusControleEmissaoInicio: text === 'true' })}
            />

            <Input
              label="Monitor catalisador"
              placeholder="Monitor catalisador"
              value={obdData.monitorCatalisadorInicio.toString()}
              onChangeText={(text) => setObdData({ ...obdData, monitorCatalisadorInicio: text === 'true' })}
            />

            <Input
              label="Monitor sensor 02"
              placeholder="Monitor sensor 02"
              value={obdData.monitorSensor02Inicio.toString()}
              onChangeText={(text) => setObdData({ ...obdData, monitorSensor02Inicio: text === 'true' })}
            />

            <Input
              label="Temperatura sensor 02"
              placeholder="Temperatura sensor 02"
              keyboardType="numeric"
              value={obdData.temperaturaSensor02Inicio.toString()}
              onChangeText={(text) => setObdData({ ...obdData, temperaturaSensor02Inicio: parseFloat(text) })}
            />

            <Input
              label="Temperatura transmissão"
              placeholder="Temperatura transmissão"
              keyboardType="numeric"
              value={obdData.temperaturaTransmissaoInicio.toString()}
              onChangeText={(text) => setObdData({ ...obdData, temperaturaTransmissaoInicio: parseFloat(text) })}
            />

            <Input
              label="Status transmissão"
              placeholder="Status transmissão"
              value={obdData.statusTransmissaoInicio}
              onChangeText={(text) => setObdData({ ...obdData, statusTransmissaoInicio: text })}
            />

            <Input
              label="Código de falha"
              placeholder="Código de falha"
              autoCapitalize="characters"
              value={obdData.codigoFalhaInicio}
              onChangeText={(text) => setObdData({ ...obdData, codigoFalhaInicio: text })}
            />

            <Input
              label="Status monitores emissão"
              placeholder="Status monitores emissão"
              value={obdData.statusMonitoresEmissaoInicio.toString()}
              onChangeText={(text) => setObdData({ ...obdData, statusMonitoresEmissaoInicio: text === 'true' })}
            />

            <Input
              label="Voltagem da bateria"
              placeholder="Voltagem da bateria"
              keyboardType="numeric"
              value={obdData.voltagemBateriaInicio.toString()}
              onChangeText={(text) => setObdData({ ...obdData, voltagemBateriaInicio: parseFloat(text) })}
            />
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Observações" />

          <Input
            placeholder="Anote algo relevante sobre a partida (opcional)"
            value={observacoes}
            onChangeText={setObservacoes}
            multiline
          />
        </View>

        <Button
          title="Iniciar viagem"
          icon="play"
          onPress={handleIniciarViagem}
          isLoading={enviando}
          style={styles.submit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
