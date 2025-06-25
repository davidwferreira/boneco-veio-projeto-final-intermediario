/**
 * Formata um valor numérico para o formato de moeda brasileiro.
 * Exemplo: 123.45 → "R$ 123,45"
 * @param {number|string} value - valor a ser formatado
 * @returns {string} - valor formatado como moeda
 */
export const formatPrice = (value) => {
  const number = parseFloat(value);
  if (isNaN(number)) return "R$ 0,00";

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
