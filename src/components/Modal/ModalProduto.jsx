// src/components/ModalProduto/ModalProduto.jsx
import * as Dialog from '@radix-ui/react-dialog';
import ProdutoForm from '../ProdutoForm/ProdutoForm';
import styles from './ModalProduto.module.css';

export default function ModalProduto({
  produto = null,
  modoEdicao = false,
  onClose,
  onSave,
  adicionarProduto,
  editarProduto,
  carregarProdutos,
  mostrarSnackbar,
}) {
  const handleSubmit = async (produtoData) => {
    if (modoEdicao) {
      await editarProduto(produto.id, produtoData);
    } else {
      await adicionarProduto(produtoData);
    }

    await carregarProdutos();
    onSave?.(); // Fecha o modal após salvar
  };

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.modal}>
          <Dialog.Close asChild>
            <button className={styles.closeBtn} aria-label="Fechar modal">X</button>
          </Dialog.Close>

          <ProdutoForm
            initialData={modoEdicao ? produto : null}
            modoEdicao={modoEdicao}
            onSubmit={handleSubmit}
            onCancel={onClose}
            onSubmitCallback={mostrarSnackbar}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
