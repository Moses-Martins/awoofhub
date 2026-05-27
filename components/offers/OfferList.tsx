import { Offer } from '@/types/offer';
import React from 'react';
import { View } from 'react-native';
import OfferCard from './OfferCard';

interface Props {
  offers: Offer[];
}

export default function OfferList({ offers }: Props) {

  return (
    <View>
      {offers.map((offer) => (
        <OfferCard offer={offer} key={offer.id} />
      ))}
    </View>
  );
};

