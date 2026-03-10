import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { ThemedText } from '../components/theme/themed-text';
import { ThemedView } from '../components/theme/themed-view';
import { ThemedButton } from '../components/theme/themed-button';
import AddModal from '../components/add-modal';



export default function HomeScreen() {
  const [showModal, setShowModal] = useState(false);

  return (
    <ThemedView>
      <AddModal visible={showModal} onClose={() => {setShowModal(false); console.log('Modal closed - state=', showModal)}} />
        <Image
            source={{uri: 'https://thumbs.dreamstime.com/b/google-logo-vector-format-white-background-illustration-407571048.jpg'}}
          style={styles.image}
        />
      <ThemedText> Home Page </ThemedText>
      <ThemedText> This is the home page. </ThemedText>
      <ThemedButton title="Add Post" onPress={() => {setShowModal(true); console.log('Modal opened - state=', showModal)}} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    gap: 30,
  },
  image: {
    width: 100,
    height: 100,
  },
});
