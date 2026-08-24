import axios from "axios";
import API_BASE_URL from "../config/config"; // Importe a URL do arquivo de configuração
import { USE_MOCK } from "../config/mock";
import mockAdapter from "./mock/adapter";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Modo de demonstração: respostas vêm das fixtures em memória, sem rede.
// `axios.defaults` cobre os serviços que usam o axios direto (ex.: user.ts).
if (USE_MOCK) {
  api.defaults.adapter = mockAdapter;
  axios.defaults.adapter = mockAdapter;
}

export default api;
