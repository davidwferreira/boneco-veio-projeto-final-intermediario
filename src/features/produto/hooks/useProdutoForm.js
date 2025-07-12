// src/hooks/useProdutoForm.js
import { useState, useEffect } from "react";
import { uploadImage } from "../../../services/cloudinary";

/**
 * Hook personalizado para controle do formulário de produto.
 * Lida com estado interno, validação, preview de imagem e envio.
 */
export function useProdutoForm({ initialData, modoEdicao = false, onSubmitCallback}) {
  // Estado dos campos do formulário
  const [dadosFormulario, setDadosFormulario] = useState({
    imagemArquivo: null,
    imagemUrl: "",
    titulo: "",
    descricao: "",
    preco: "",
    desconto: "",
    ehNovo: false,
    favorito: false,
    nota: 0,
  });

  // Visualização prévia da imagem
  const [previewImagem, setPreviewImagem] = useState(null);

  // Estados auxiliares
  const [enviando, setEnviando] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  /**
   * Se for edição, preenche o formulário com os dados do produto.
   */
  useEffect(() => {
    if (initialData) {
      setDadosFormulario({
        imagemArquivo: null,
        imagemUrl: initialData?.imageSrc || "",
        titulo: initialData?.title || "",
        descricao: initialData?.description || "",
        preco: initialData?.originalPrice ?? "",
        desconto: initialData?.discount ?? "",
        ehNovo: !!initialData?.isNew,
        favorito: !!initialData?.isFavorite,
        nota: initialData?.rating ?? 0,
      });

      setPreviewImagem(initialData?.imageSrc || null);
    }
  }, [initialData]);

  /**
   * Atualiza o estado do formulário conforme o usuário digita ou interage.
   */
  const lidarComMudanca = (evento) => {
    const { name, value, type, checked, files } = evento.target;

    const novoValor =
      type === "checkbox" ? checked : type === "file" ? files[0] : value;

    if (type === "file" && files[0]) {
      setPreviewImagem(URL.createObjectURL(files[0]));
    }

    setDadosFormulario((anterior) => ({ ...anterior, [name]: novoValor }));
  };

  /**
   * Calcula e retorna o preço com desconto (visualmente no formulário).
   */
  const calcularPrecoComDesconto = () => {
    const precoNumerico = parseFloat(dadosFormulario.preco);
    const descontoNumerico = parseFloat(dadosFormulario.desconto);

    if (isNaN(precoNumerico) || isNaN(descontoNumerico)) return "-";

    const precoFinal = precoNumerico - (precoNumerico * descontoNumerico) / 100;
    return `R$ ${precoFinal.toFixed(2).replace(".", ",")}`;
  };

  /**
   * Valida os dados, faz upload se necessário, e envia para o manipulador recebido.
   */
  const enviarFormulario = async (aoEnviar) => {
    setEnviando(true);

    try {
      const imagemInvalida =
        !dadosFormulario.imagemArquivo ||
        !/\.(jpe?g|png|webp)$/i.test(dadosFormulario.imagemArquivo.name);

      const formularioInvalido =
        !dadosFormulario.titulo ||
        !dadosFormulario.descricao ||
        isNaN(parseFloat(dadosFormulario.preco)) ||
        dadosFormulario.preco < 0 ||
        (dadosFormulario.desconto &&
          (dadosFormulario.desconto < 0 || dadosFormulario.desconto > 100)) ||
        (!modoEdicao && imagemInvalida);

      if (formularioInvalido) {
        throw new Error(
          modoEdicao
            ? "Preencha título, descrição e preço corretamente."
            : "Adicione uma imagem (.jpg, .jpeg, .png ou .webp), título, descrição e preço válidos."
        );
      }

      // Faz upload da imagem se for cadastro
      let urlFinalImagem = dadosFormulario.imagemUrl;
      if (!modoEdicao && dadosFormulario.imagemArquivo) {
        urlFinalImagem = await uploadImage(dadosFormulario.imagemArquivo);
      }

      // Conversão e preparação dos campos
      const preco = parseFloat(dadosFormulario.preco);
      const desconto = parseFloat(dadosFormulario.desconto);
      const precoOriginal = !isNaN(preco) ? preco : null;
      const precoFinal =
        !isNaN(preco) && !isNaN(desconto)
          ? preco - (preco * desconto) / 100
          : preco;

      const produtoFinal = {
        imageSrc: urlFinalImagem,
        title: dadosFormulario.titulo,
        description: dadosFormulario.descricao,
        isNew: dadosFormulario.ehNovo,
        isFavorite: dadosFormulario.favorito,
        discount: isNaN(desconto) ? null : desconto,
        rating: Number(dadosFormulario.nota),
        price: Number(precoFinal.toFixed(2)),
        originalPrice: Number(precoOriginal?.toFixed(2)),
      };

      await aoEnviar(produtoFinal);

      // dispara aviso para fora do hook
      if (typeof onSubmitCallback === "function") {
        onSubmitCallback(
          modoEdicao
            ? "Produto atualizado com sucesso!"
            : "Produto cadastrado com sucesso!"
        );
      }

      // Limpa o formulário
      setDadosFormulario({
        imagemArquivo: null,
        imagemUrl: "",
        titulo: "",
        descricao: "",
        preco: "",
        desconto: "",
        ehNovo: false,
        favorito: false,
        nota: 0,
      });
      setPreviewImagem(null);
    } catch (erro) {
      setMensagemFeedback({
        open: true,
        message: erro.message || "Erro ao salvar. Tente novamente.",
        severity: "error",
      });
    } finally {
      setEnviando(false);
    }
  };

  /**
   * Fecha o Snackbar de feedback
   */
  const fecharSnackbar = () => {
    setMensagemFeedback((anterior) => ({ ...anterior, open: false }));
  };

  return {
    dadosFormulario,
    previewImagem,
    enviando,
    mensagemFeedback,
    lidarComMudanca,
    calcularPrecoComDesconto,
    enviarFormulario,
    fecharSnackbar,
  };
}
