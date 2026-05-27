import { Offer } from "./offer";


export interface commentData {
  comment: string;
};


export interface Comment {
    id: string,
    comment: string,
    user: {
        id: string,
        name: string,
        profileImageUrl: string,
    },
    offer: Offer
    createdAt: string;
}; 

