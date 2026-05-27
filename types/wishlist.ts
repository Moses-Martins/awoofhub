import { Offer } from "./offer";

export interface Wishlist {
    id: string,
    user: {
        id: string,
    },
    offer: Offer
}; 

