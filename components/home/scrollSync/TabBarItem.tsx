import { LayoutChangeEvent, Text, TouchableOpacity } from 'react-native';

export default function TabBarItem({
  tab,
  activeIndex,
  onLayout,
  index,
  onPress,
}: {
  tab: string;
  activeIndex: number;
  onLayout: (event: LayoutChangeEvent, index: number) => void;
  index: number;
  onPress: (index: number, manual: boolean) => void;
}) {
  const isActive = index === activeIndex;

  return (
    <TouchableOpacity
      className="px-2 rounded-2xl"
      onPress={() => onPress(index, true)}
      onLayout={e => onLayout(e, index)}
      activeOpacity={0.8}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Text
        className={`text-sm font-bold rounded-full py-1 px-3 ${
          isActive ? 'text-white bg-primary' : 'text-black bg-gray-200'
        }`}
      >
        {tab}
      </Text>
    </TouchableOpacity>
  );
}