import axios from "axios";

/**
 * Instância base da API (ajuste a URL conforme seu ambiente)
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // Se futuramente usar cookies/sessão:
  // withCredentials: true,
});

/**
 * Normaliza campos para o front (garante nomes e defaults que a UI espera)
 */
function normalizeProduct(p) {
  return {
    id: p.id,
    imageSrc: p.imageSrc,
    title: p.title,
    description: p.description,
    originalPrice: p.originalPrice,
    price: p.price,
    discount: p.discount ?? null,
    stock: p.stock ?? 0,
    rating: typeof p.rating === "number" ? p.rating : 0,
    isNew: Boolean(p.isNew),
    // Enquanto favorito per-usuário não estiver ligado no front,
    // garanta um booleano para evitar undefined na UI
    isFavorite: typeof p.isFavorite === "boolean" ? p.isFavorite : false,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}

/**
 * LISTAR PRODUTOS (Paginação mínima) → retorna SEMPRE ARRAY
 * - Se a API responder array: devolve array.
 * - Se a API responder objeto paginado { items, total, page, perPage }: devolve apenas items.
 * - Aceita query params, mas o hook atual pode chamar sem nada.
 *
 * @param {Object} [params]
 * @param {number} [params.page]     - página (opcional)
 * @param {number} [params.perPage]  - itens por página (opcional)
 * @param {string} [params.q]        - busca (opcional)
 * @param {boolean} [params.isNew]   - filtro novidade (opcional)
 * @param {number} [params.minPrice] - filtro (opcional)
 * @param {number} [params.maxPrice] - filtro (opcional)
 * @returns {Promise<Array<Object>>}
 */
export async function listarProdutos(params = {}) {
  const { page, perPage, q, isNew, minPrice, maxPrice } = params;

  const resp = await api.get("/produtos", {
    params: {
      // só envia se existir (para não forçar paginação no back)
      ...(page ? { page } : {}),
      ...(perPage ? { perPage } : {}),
      ...(q ? { q } : {}),
      ...(typeof isNew === "boolean" ? { isNew } : {}),
      ...(typeof minPrice === "number" ? { minPrice } : {}),
      ...(typeof maxPrice === "number" ? { maxPrice } : {}),
    },
  });

  const data = resp.data;

  // Caso 1: API já retorna array
  if (Array.isArray(data)) {
    return data.map(normalizeProduct);
  }

  // Caso 2: API retorna wrapper paginado
  if (data && Array.isArray(data.items)) {
    return data.items.map(normalizeProduct);
  }

  // Fallback seguro: nada reconhecido → array vazio
  return [];
}

/**
 * GET por ID (mantém contrato antigo: { id, ... } ou erro)
 */
export async function getProdutoPorId(id) {
  const resp = await api.get(`/produtos/${id}`);
  return normalizeProduct(resp.data);
}


export async function adicionarProduto(_produto) {
  throw new Error("adicionarProduto: não implementado na API pública ainda.");
}

export async function atualizarProduto(_id, _patch) {
  throw new Error("atualizarProduto: use rota/admin ou endpoint de favoritos quando disponível.");
}

export async function removerProduto(_id) {
  throw new Error("removerProduto: não implementado na API pública ainda.");
}
