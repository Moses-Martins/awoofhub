import { Link } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

interface Props {
    targetUserId: string;
    children: React.ReactNode;
    className?: string;
}

export default function MessageButton({ targetUserId, children, className }: Props) {
    
    return (
        <Link href={`/message/${targetUserId}`} asChild>
            <TouchableOpacity activeOpacity={0.8} className={className}>
                {children}
            </TouchableOpacity>
        </Link>
    );
}
