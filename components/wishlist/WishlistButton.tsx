import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useToggleWishlist } from "../../features/wishlist/useToggleWishlist";


interface Props {
  offerId: string;
  size: number;
  position?: string;
}


export default function WishlistButton({ offerId, size, position = "" }: Props) {

  const { toggleWishlist, isWishlisted: isFavorite } = useToggleWishlist(offerId);

  return (
    <TouchableOpacity
      onPress={toggleWishlist}
      className={position}
      activeOpacity={0.7}
    >
      <MaterialIcons
        name={isFavorite ? "favorite" : "favorite-border"}
        size={size}
        color={isFavorite ? "#EF4444" : "#59585880"}
      />
    </TouchableOpacity>
  );
};

