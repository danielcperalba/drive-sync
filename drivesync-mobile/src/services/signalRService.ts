import { HubConnectionBuilder } from '@microsoft/signalr';
import API_BASE_URL from "../config/config"; // Importe a URL do arquivo de configuração
import { USE_MOCK } from "../config/mock";

// Variável para armazenar a conexão do SignalR
let connection = null;

// Função para conectar ao SignalR
export const connectSignalR = () => {
  // No modo de demonstração não há servidor: o tempo real fica desligado.
  if (USE_MOCK) return null;

  if (connection) {
    console.log('Já conectado ao SignalR!');
    return connection;  // Se já estiver conectado, retorna a conexão existente
  }

  connection = new HubConnectionBuilder()
    .withUrl(`${API_BASE_URL}/viagensHub`)  // Substitua pela URL do seu servidor SignalR
    .build();

  connection.start()
    .then(() => {
      console.log('Conectado ao SignalR!');
    })
    .catch((error) => {
      console.error('Erro ao conectar ao SignalR:', error);
      connection = null;  // Garante que a variável connection seja resetada em caso de falha
    });

  return connection;
};

// Função para escutar atualizações do SignalR
export const listenToUpdates = (onUpdate) => {
  if (USE_MOCK) return;

  if (connection) {
    connection.on('AtualizarViagens', (data) => {
      console.log('Atualização de viagem recebida:', data);
      onUpdate(data);  // Chama a função de callback que será passada como parâmetro
    });
  } else {
    console.warn('Conexão SignalR não estabelecida. Por favor, conecte primeiro.');
  }
};

// Função para escutar atualizações de veículo
export const listenToVeiculoUpdates = (onUpdate) => {
  if (USE_MOCK) return;

  if (connection) {
    connection.on('VeiculoAtualizado', (data) => {
      console.log('Atualização de veículo recebida:', data);
      onUpdate(data);  // Chama a função de callback que será passada como parâmetro
    });
  } else {
    console.warn('Conexão SignalR não estabelecida. Por favor, conecte primeiro.');
  }
};

// Função para desconectar do SignalR
export const disconnectSignalR = () => {
  if (USE_MOCK) return;

  if (connection) {
    connection.stop()
      .then(() => {
        console.log('Desconectado do SignalR');
        connection = null;  // Reseta a conexão após a desconexão
      })
      .catch((error) => {
        console.error('Erro ao desconectar do SignalR:', error);
      });
  } else {
    console.warn('Nenhuma conexão ativa para desconectar.');
  }
};
