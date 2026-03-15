import React, { ReactNode } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  useColorScheme,
} from 'react-native';
import { Colors } from '../../theme';
import { ThemedText } from './themed-text';

interface CustomModalProps {
  style?: object;
  visible: boolean;
  onClose: (event?: GestureResponderEvent) => void;
  children?: ReactNode;
}


export default function ThemedModal({ visible, onClose, children, style }: CustomModalProps) {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[ colorScheme === 'dark' ? 'dark' : 'light'].modalBackground;
  
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, {backgroundColor}, style]}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <ThemedText style={styles.closeText}> X </ThemedText>
          </TouchableOpacity>
          {children ?? <ThemedText>This is a modal!</ThemedText>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  closeText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});

