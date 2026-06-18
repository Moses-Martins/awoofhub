import { useReview } from "@/features/reviews/useReview";
import { Offer } from "@/types/offer";
import { Star } from 'lucide-react-native';
import { useEffect, useState } from "react";
import StarRating from "react-native-star-rating-widget";

interface Props {
    offer: Offer;
}

export default function Review({ offer }: Props) {
    const [rating, setRating] = useState(0);
    const { review, submitReview } = useReview(offer.id);
    useEffect(() => {
        if (review) {
            setRating(review.rating ?? 0);
        }
    }, [review]);

    return <StarRating
        rating={rating}
        step="full"
        starSize={40}
        onChange={(value) => {
            setRating(value);
            submitReview(value);
        }}
        starStyle={{ marginHorizontal: -0.5 }}
        StarIconComponent={({ type, size }) => (
            <Star
                size={size}
                color={type === "full" ? "#FFD700" : "#ccd1d8"}
                fill={type === "full" ? "#FFD700" : "#ccd1d8"}
            />
        )}
    />

}