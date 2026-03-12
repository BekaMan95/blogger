import { useAppSelector } from '../app/hooks';
import { ThemedButton } from '../components/theme/themed-button';
import { ThemedText } from '../components/theme/themed-text';
import { ThemedView } from '../components/theme/themed-view';
import { NavigationProps } from '../type';
import { TouchableOpacity, StyleSheet } from 'react-native';




export default function PostDetailScreen({ navigation }: NavigationProps) {
  const { selectedPost } = useAppSelector((s) => s.post);

  if(!selectedPost) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={{ fontSize: 18 }}>Post not found!!</ThemedText>
        <ThemedButton title="Go Back" onPress={() => navigation.goBack()} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>{selectedPost.title}</ThemedText>
        <ThemedText style={styles.description}>{selectedPost.body}</ThemedText>
        <TouchableOpacity onPress={() => navigation.navigate('UserDetail', {id: selectedPost.userId})}>
          <ThemedText style={styles.writtenBy}>
            {'Written By'}
          </ThemedText>
        </TouchableOpacity>
        <ThemedButton variant="outline" title="Go Back" onPress={() => navigation.goBack()} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
    width: '90%',
  },
  description: {
    fontSize: 14,
    width: '80%',
    minHeight: 200,
  },
  writtenBy: {
    alignSelf: 'flex-end',
    marginTop: 6,
    color: '#3498db',
    fontWeight: '600',
  },
});
