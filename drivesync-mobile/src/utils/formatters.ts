/**
 * Formatação de datas do app.
 *
 * Todas as funções aceitam qualquer valor vindo da API e devolvem `null`
 * quando não é uma data válida — cabe a quem chama decidir o texto de fallback.
 */

const paraData = (valor?: string | number | Date | null): Date | null => {
  if (valor === null || valor === undefined || valor === '') return null;
  const data = valor instanceof Date ? valor : new Date(valor);
  return Number.isNaN(data.getTime()) ? null : data;
};

/** "23/08/2026" — compacto, para métricas e espaços estreitos. */
export function formatarDataCurta(valor?: string | number | Date | null): string | null {
  const data = paraData(valor);
  return data ? data.toLocaleDateString('pt-BR') : null;
}

/** "23 de ago. de 2026" reduzido para "23 ago 2026". */
export function formatarData(valor?: string | number | Date | null): string | null {
  const data = paraData(valor);
  if (!data) return null;

  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/** "23 ago 2026 · 19:18" */
export function formatarDataHora(valor?: string | number | Date | null): string | null {
  const data = paraData(valor);
  if (!data) return null;

  const dia = formatarData(data);
  const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return `${dia} · ${hora}`;
}
