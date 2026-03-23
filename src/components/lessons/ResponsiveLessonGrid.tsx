// src/components/lessons/ResponsiveLessonGrid.tsx
import React from 'react';
import { FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import LessonProgressCard from './LessonProgressCard';
import { useAppTheme } from '../../context/ThemeContext';

interface Lesson {
  id: string;
  title: string;
  thumbnail: any;
  progress: number;
  duration: string;
  isLocked: boolean;
}

interface Props {
  lessons: Lesson[];
  onLessonPress: (lesson: Lesson) => void;
}

const ResponsiveLessonGrid = ({ lessons, onLessonPress }: Props) => {
  const { width } = useWindowDimensions();
  const { isDarkMode } = useAppTheme();

  const numColumns = width < 375 ? 1 : width < 768 ? 2 : 3;

  return (
    <FlatList
      data={lessons}
      numColumns={numColumns}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
      renderItem={({ item }) => (
        <LessonProgressCard
          title={item.title}
          thumbnail={item.thumbnail}
          progress={item.progress}
          duration={item.duration}
          isLocked={item.isLocked}
          onPress={() => onLessonPress(item)}
        />
      )}
    />
  );
};

export default ResponsiveLessonGrid;

const styles = StyleSheet.create({
  list: { padding: 16 },
  row: { justifyContent: 'space-between' },
});
