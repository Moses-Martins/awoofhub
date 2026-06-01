import { LOGO } from '@/config/constants';
import { Fontisto } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Avatar from './Avatar';
import ExpandableSearchForm from './ExpandableSearchForm';

interface HeaderProps {
    isHome?: boolean;
}

export default function Header({ isHome = true }: HeaderProps) {
    const router = useRouter();
    const [isSearchOpen, setIsSearchOpen] = useState(false);


    return (
        <View className="px-5 bg-white flex-row h-14 justify-between items-center">
            {isHome ? (
                <Avatar />
            ) : (
                <TouchableOpacity onPress={() => router.push("/")}>
                    <FontAwesome6 name="arrow-left" size={20} color="black" />
                </TouchableOpacity>
            )}

            <Image source={LOGO} style={{ width: 160, height: 50 }} resizeMode="contain" />

            {isHome ? (
                <TouchableOpacity onPress={() => router.push("/offers")}>
                    <Fontisto name="search" size={20} color="black" />
                </TouchableOpacity>

            ) : (
                <>
                    <ExpandableSearchForm onOpen={() => setIsSearchOpen(true)} />
                    <ExpandableSearchForm
                        isOverlay
                        isOpen={isSearchOpen}
                        onClose={() => setIsSearchOpen(false)} />
                </>
            )}
        </View>
    );
};