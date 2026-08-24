import { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from 'axios';
import { MOCK_DELAY } from '../../config/mock';
import { mockStore } from './data';

/**
 * Adaptador do axios usado no modo de demonstração: responde às rotas da API
 * com os dados de `data.ts`, sem rede. Ver `src/config/mock.ts`.
 */

const espera = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const responder = (config: AxiosRequestConfig, status: number, data: any): AxiosResponse => ({
  data,
  status,
  statusText: status === 201 ? 'Created' : 'OK',
  headers: {},
  config: config as any,
});

/** Remove a baseURL e a query string, deixando só o caminho da rota. */
const caminhoDe = (config: AxiosRequestConfig) => {
  const url = config.url ?? '';
  const semQuery = url.split('?')[0];
  const semHost = semQuery.replace(/^https?:\/\/[^/]+/i, '');
  return `/${semHost.replace(/^\/+/, '')}`;
};

const corpoDe = (config: AxiosRequestConfig) => {
  if (!config.data) return {};
  if (typeof config.data === 'string') {
    try {
      return JSON.parse(config.data);
    } catch {
      return {};
    }
  }
  return config.data;
};

const atualizarStatusVeiculo = (veiculoId: any, status: string) => {
  const veiculo = mockStore.veiculos.find((v) => String(v.id) === String(veiculoId));
  if (veiculo) veiculo.status = status;
};

export const mockAdapter: AxiosAdapter = async (config) => {
  await espera(MOCK_DELAY);

  const metodo = (config.method ?? 'get').toLowerCase();
  const caminho = caminhoDe(config);
  const corpo = corpoDe(config);

  /* --- Conta / autenticação --- */

  if (metodo === 'post' && /\/api\/Account\/LoginUser$/i.test(caminho)) {
    return responder(config, 200, {
      token: 'mock-token',
      name: mockStore.usuario.nome,
      email: corpo.email || mockStore.usuario.email,
    });
  }

  if (metodo === 'get' && /\/api\/Account\/GetUserByEmail\//i.test(caminho)) {
    const email = decodeURIComponent(caminho.split('/').pop() ?? '');
    return responder(config, 200, { ...mockStore.usuario, email: email || mockStore.usuario.email });
  }

  /* --- Viagens --- */

  if (metodo === 'get' && /\/api\/Viagens$/i.test(caminho)) {
    const ordenadas = [...mockStore.viagens].sort((a, b) => b.id - a.id);
    return responder(config, 200, ordenadas);
  }

  if (metodo === 'post' && /\/api\/Viagens$/i.test(caminho)) {
    const novaViagem = {
      ...corpo,
      id: mockStore.proximoIdViagem++,
      status: 0, // em andamento
      data_inicio: corpo.dataInicio,
      localizacaoEncerramento: null,
      dataEncerramento: null,
      observacoesEncerramento: null,
    };
    mockStore.viagens.unshift(novaViagem);
    atualizarStatusVeiculo(corpo.veiculoId, 'Em uso');
    return responder(config, 201, novaViagem);
  }

  if (metodo === 'put' && /\/api\/Viagens\/EncerrarViagem\//i.test(caminho)) {
    const id = caminho.split('/').pop();
    const viagem = mockStore.viagens.find((v) => String(v.id) === String(id));

    if (!viagem) {
      return Promise.reject(new Error(`[mock] Viagem ${id} não encontrada`));
    }

    Object.assign(viagem, corpo, {
      status: 1, // encerrada
      dataEncerramento: new Date().toISOString(),
    });
    atualizarStatusVeiculo(viagem.veiculoId, 'Disponível');
    return responder(config, 200, viagem);
  }

  if (metodo === 'get' && /\/api\/Viagens\/[^/]+$/i.test(caminho)) {
    const id = caminho.split('/').pop();
    const viagem = mockStore.viagens.find((v) => String(v.id) === String(id));
    return responder(config, viagem ? 200 : 404, viagem ?? null);
  }

  /* --- Veículos --- */

  if (metodo === 'get' && /\/api\/Veiculos\/VeiculoPorPlaca$/i.test(caminho)) {
    const placa = String(config.params?.placa ?? '').trim().toUpperCase();
    const veiculo = mockStore.veiculos.find((v) => v.placa.toUpperCase() === placa);
    return responder(config, 200, veiculo ?? null);
  }

  if (metodo === 'get' && /\/api\/Veiculos$/i.test(caminho)) {
    return responder(config, 200, mockStore.veiculos);
  }

  if (metodo === 'get' && /\/api\/Veiculos\/[^/]+$/i.test(caminho)) {
    const id = caminho.split('/').pop();
    const veiculo = mockStore.veiculos.find((v) => String(v.id) === String(id));
    return responder(config, veiculo ? 200 : 404, veiculo ?? null);
  }

  return Promise.reject(new Error(`[mock] Rota não mapeada: ${metodo.toUpperCase()} ${caminho}`));
};

export default mockAdapter;
