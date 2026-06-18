import { router } from 'expo-router';

import { useActivityReadStatus } from '@/features/activity/useActivityReadStatus';
import { ActivityData } from '@/types/activity';
import ActivityCard from './ActivityCard';

interface Props {
  prop: ActivityData;
}

export default function Activity({ prop }: Props) {
  const { markAsRead } = useActivityReadStatus({ id: prop.id });

  const navigate = (href: string) => async () => {
    router.push(href);

    if (!prop.isRead) {
      await markAsRead();
    }
  };

  if (prop.type === 'OFFER_CREATED') {
    return (
      <ActivityCard
        title={prop.title}
        createdAt={prop.createdAt}
        isRead={prop.isRead}
        message={prop.message}
        type={prop.type}
        onPress={navigate(`/offers/${prop.entityId}`)}
      />
    );
  }

  return null;
}