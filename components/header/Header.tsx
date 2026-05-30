import { LOGO } from '@/config/constants';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import { Image, TouchableOpacity, View } from 'react-native';
import Avatar from './Avatar';
import ExpandableSearchForm from './ExpandableSearchForm';


interface HeaderProps {
    canGoBack?: boolean;
    isSearchOpen: boolean;
    setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ canGoBack = false, isSearchOpen, setIsSearchOpen }: HeaderProps) {
    const router = useRouter();

    return (
        <View className="px-5 bg-white flex-row h-14 justify-between items-center">
            {canGoBack ? (
                <TouchableOpacity onPress={() => router.push("/")}>
                    <FontAwesome6 name="arrow-left" size={20} color="black" />
                </TouchableOpacity>
            ) : (
                <Avatar />
            )}

            <Image source={LOGO} style={{ width: 160, height: 50 }} resizeMode="contain" />
            
            <ExpandableSearchForm onOpen={() => setIsSearchOpen(true)} />
            <ExpandableSearchForm
                isOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </View>
    );
};