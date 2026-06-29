import { Heart } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
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
      <Heart
        size={size}
        color={isFavorite ? "#EF4444" : "#59585880"} 
        fill={isFavorite ? "#EF4444" : "transparent"} 
        strokeWidth={2} 
      />
    </TouchableOpacity>
  );
};

