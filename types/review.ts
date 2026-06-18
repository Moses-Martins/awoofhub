import { Offer } from "./offer";

export interface reviewData {
    rating: number;
};

export interface Review {
    id: string,
    rating: number,
    user: {
        id: string,
    },
    offer: Offer
};

