// src/components/FabButton.tsx
import React, { useState } from 'react';
import { FAB, Portal } from 'react-native-paper';
import { router } from 'expo-router';
import { Alert } from 'react-native';

const FabButton = () => {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      icon: 'book-open-page-variant',
      label: 'Lessons',
      onPress: () => router.push('/lessons'), // will create later
    },
    {
      icon: 'book-search',
      label: 'Dictionary',
      onPress: () => router.push('/dictionary'),
    },
    {
      icon: 'translate',
      label: 'Tok (Translator)',
      onPress: () => router.push('/tok'),
    },
    {
      icon: 'chart-line',
      label: 'Progress',
      onPress: () => router.push('/progress'),
    },
  ];

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        actions={actions}
        onStateChange={({ open }) => setOpen(open)}
        onPress={() => {
          if (open) setOpen(false);
        }}
        fabStyle={{ backgroundColor: '#C0266F' }} // matches your app theme
      />
    </Portal>
  );
};

export default FabButton;
