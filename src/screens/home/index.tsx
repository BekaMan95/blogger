import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { ThemedText } from '../../components/theme/themed-text';
import { ThemedView } from '../../components/theme/themed-view';
import { ThemedButton } from '../../components/theme/themed-button';
import AddPostModal from '../../components/add-post-modal';
import Toast from '../../components/theme/themed-toaster';



export default function HomeScreen() {
  const header = 'Welcome to Blogger!';
  const subHeader = 'Your go-to app for reading and sharing blog posts.';
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  console.log('HomeScreen rendered with showModal:', showModal, 'and showToast:', showToast);

  return (
    <ThemedView style={{ flex: 1, padding: 20, gap: 30 }}>
      <AddPostModal visible={showModal} onClose={() => {setShowModal(false); console.log(showModal)}} />
        <Image
            source={require('../../../assets/logo.png')}
          style={styles.image}
        />
      <ThemedText style={styles.title}>{header}</ThemedText>
      <ThemedText style={styles.subTitle}>{subHeader}</ThemedText>
      <ThemedButton title="Add Post" onPress={() => {setShowModal(true);}} />
      
      {/* Toast Component Testing Button */}
      {/* <ThemedButton title="Show Toast" variant='outline' onPress={() => setShowToast(true)} />
      <Toast
        visible={showToast}
        title="Success!"
        description="Your action was completed."
        onHide={() => setShowToast(false)}
      /> */}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
    lineHeight: 30,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 20,
    width: '70%',
    alignContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});
