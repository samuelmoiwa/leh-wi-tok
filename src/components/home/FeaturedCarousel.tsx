import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.85;
const SPACING = 16;
const FULL_ITEM_WIDTH = ITEM_WIDTH + SPACING;

const slides = [
  { id: '1', title: 'Master Greetings', subtitle: 'Start with everyday signs', image: require('../../../assets/images/greeting.png') },
  { id: '2', title: 'Offline Dictionary', subtitle: 'Works without internet', image: require('../../../assets/images/dictionary.png') },
  { id: '3', title: 'Real Progress', subtitle: 'Track every sign you learn', image: require('../../../assets/images/progress.png') },
];

const FeaturedCarousel = () => {
  const { isDarkMode } = useAppTheme();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- Autoplay Logic ---
  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = currentIndex + 1;

      if (nextIndex >= slides.length) {
        nextIndex = 0; // Reset to start
      }

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer); // Cleanup on unmount
  }, [currentIndex]);

  // Keep state synced if the user swipes manually
  const onMomentumScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / FULL_ITEM_WIDTH);
    setCurrentIndex(index);
  };

  return (
    <FlatList
      ref={flatListRef}
      data={slides}
      horizontal
      pagingEnabled={false}
      showsHorizontalScrollIndicator={false}
      snapToInterval={FULL_ITEM_WIDTH}
      decelerationRate="fast"
      onMomentumScrollEnd={onMomentumScrollEnd}
      contentContainerStyle={{ paddingHorizontal: SPACING, paddingVertical: 10 }}
      keyExtractor={(item) => item.id}
      getItemLayout={(_, index) => ({
        length: FULL_ITEM_WIDTH,
        offset: FULL_ITEM_WIDTH * index,
        index,
      })}
      renderItem={({ item }) => (
        <View style={[styles.card, { backgroundColor: isDarkMode ? '#1E1E1E' : '#fff' }]}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#111827' }]}>{item.title}</Text>
            <Text style={[styles.subtitle, { color: isDarkMode ? '#A1A1AA' : '#6B7280' }]}>{item.subtitle}</Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: ITEM_WIDTH,
    height: 280,
    marginRight: SPACING,
    borderRadius: 24,
    overflow: 'hidden',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 10 },
      android: { elevation: 5 }
    })
  },
  image: { width: '100%', height: '70%', resizeMode: 'cover' },
  textContainer: { padding: 16, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, marginTop: 2, fontWeight: '500' },
});

export default FeaturedCarousel;
