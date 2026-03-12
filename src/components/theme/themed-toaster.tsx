import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useThemeColor } from '../../app/hooks';
import { ThemedText } from './themed-text';

interface ToastProps {
  visible: boolean;
  title: string;
  description: string;
  onHide: () => void;
}


export default function Toast({ visible, title, description, onHide }: ToastProps) {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const backgroundColor = useThemeColor({ light: '#dee6e6', dark: '#292e30' }, 'background');

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(slideAnim, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }).start(onHide);
        }, 2000);
      });
    }
  }, [visible, slideAnim, onHide]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toast,
        { transform: [{ translateY: slideAnim }], backgroundColor },
      ]}
    >
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={styles.description}>{description}</ThemedText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
  },
});
