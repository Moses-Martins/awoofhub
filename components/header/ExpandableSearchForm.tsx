import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface Props {
    isOverlay?: boolean;
    isOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}

export default function ExpandableSearchForm({
    isOverlay,
    isOpen,
    onOpen,
    onClose
}: Props) {

    const searchParams = useGlobalSearchParams();
    const router = useRouter();

    const handleChange = useCallback(
        (term: string) => {
            if (term) {
                router.push({
                    pathname: "/offers",
                    params: { q: term },
                });
            } else {
                router.push("/offers");
            }
        },
        [router]
    );

    if (isOverlay) {
        return (
            <View className={`absolute top-0 left-0 right-0 bottom-0 bg-white flex-row items-center px-6 z-[200] ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <TextInput
                    placeholder="Search for Offers"
                    value={searchParams.q?.toString() ?? ''}
                    onChangeText={handleChange}
                    className="flex-1 text-[16px] py-2"
                    autoFocus={isOpen}
                />

                <TouchableOpacity onPress={onClose}>
                    <AntDesign name="close" size={20} color="black" />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <TouchableOpacity onPress={onOpen}>
            <Fontisto name="search" size={20} color="black" />
        </TouchableOpacity>
    );
}