import { User } from "./user";

export interface ActivityData {
    id: string;
    user: User;
    type: string;
    title: string;
    message: string;
    entityId: string;
    isRead: boolean;
    createdAt: string;
}; 

