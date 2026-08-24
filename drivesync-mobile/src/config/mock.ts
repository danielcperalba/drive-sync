/**
 * Modo de demonstração visual.
 *
 * Com `USE_MOCK = true` o app não fala com o backend: as requisições HTTP são
 * respondidas por fixtures em memória (`src/services/mock/`) e o SignalR fica
 * desligado. Serve para testar a interface sem depender da API.
 *
 * Para voltar ao comportamento real, troque para `false`.
 */
export const USE_MOCK = true;

/** Latência simulada (ms) para os estados de carregamento aparecerem. */
export const MOCK_DELAY = 600;
