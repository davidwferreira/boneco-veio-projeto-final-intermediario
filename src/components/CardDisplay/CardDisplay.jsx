// src/components/CardDisplay/CardDisplay.jsx
import { IconButton, Box, CardMedia } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatPrice } from "../../utils/formatPrice";

import styles from "./CardDisplay.module.css";

/**
 * Componente visual de cartão de produto.
 * Exibe imagem, título, preço, desconto, tags, nota, ações (editar/excluir).
 */
export default function CardDisplay({
  imageSrc,
  title,
  description,
  rating = 0,
  isFavorite = false,
  isNew = false,
  originalPrice = "",
  price = "",
  discount = "",
  isDeleting = false,
  onBuyClick = () => {},
  onCartClick = () => {},
  onEditClick = () => {},
  onDeleteClick = () => {},
  onToggleFavorite = () => {},
  onSetRating = () => {},
}) {
  return (
    <div className={styles.card}>
      
      {/* Topo: tags e botão de favorito */}
      <Box className={styles.topBox}>
        <Box className={styles.tags}>
          {isNew && <div className={styles.chipYellow}>Novidade</div>}
          {discount && <div className={styles.chipBlue}>{`${discount}% off`}</div>}
        </Box>

        <IconButton
          onClick={onToggleFavorite}
          className={styles.favoriteButton}
          aria-label="Marcar como favorito"
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      {/* Imagem do produto */}
      <Box className={styles.imageContainer}>
        <CardMedia
          component="img"
          className={styles.cardMedia}
          image={imageSrc}
          alt={title}
        />
      </Box>

      {/* Estrelas de avaliação */}
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((value) => (
          <IconButton
            key={value}
            onClick={() => onSetRating(value)}
            sx={{ p: 0 }}
            aria-label={`Avaliar com ${value} estrelas`}
          >
            {value <= rating ? (
              <StarIcon sx={{ fontSize: 18, color: "#0B0C10" }} />
            ) : (
              <StarBorderIcon sx={{ fontSize: 18, color: "#0B0C10" }} />
            )}
          </IconButton>
        ))}
      </div>

      {/* Título e descrição */}
      <div className={styles.cardContent}>
        <h1 className={styles.title}>{title}</h1>
        {/* ocultar o descrição */}
        {/* <p className={styles.description}>{description}</p> */} 
      </div>

      {/* Preço atual e original */}
      <div className={styles.priceAndButtons}>
        <div className={styles.priceBlock}>
          {originalPrice && originalPrice !== price && (
            <span className={styles.oldPrice}>{formatPrice(originalPrice)}</span>
          )}
          <span className={styles.newPrice}>{formatPrice(price)}</span>
        </div>

        {/* Botões de ação: comprar e carrinho */}
        <div className={styles.actions}>
          <button className={styles.buyButton} onClick={onBuyClick}>
            Comprar
          </button>
          <button className={styles.cartButton} onClick={onCartClick}>
            <img
              src="/icons/Linear.svg"
              alt="Carrinho"
              className={styles.icon}
            />
          </button>
        </div>
      </div>

      {/* Ações administrativas: editar e excluir */}
      <Box className={styles.editDeleteButtons}>
        <IconButton
          className={styles.actionBtn}
          onClick={onEditClick}
          aria-label="Editar produto"
        >
          <EditIcon />
        </IconButton>

        <IconButton
          className={styles.actionBtn}
          onClick={onDeleteClick}
          disabled={isDeleting}
          aria-label="Excluir produto"
        >
          {isDeleting ? <span>Excluindo...</span> : <DeleteIcon />}
        </IconButton>
      </Box>
    </div>
  );
}
