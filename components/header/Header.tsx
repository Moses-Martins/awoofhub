import { LOGO } from '@/config/constants';
import React from 'react';
import { Image, View } from 'react-native';
import ProfileButton from './ProfileButton';
import SearchButton from './SearchButton';

export default function Header() {

    return (
        <View className="px-5 bg-white flex-row h-14 justify-between items-center">
            <ProfileButton />
            <Image source={LOGO} style={{ width: 160, height: 100 }} resizeMode="contain" />
            <SearchButton />
        </View>
    );
};

