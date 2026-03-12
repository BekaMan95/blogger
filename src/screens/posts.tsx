import { FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '../components/theme/themed-text';
import { ThemedView } from '../components/theme/themed-view';
import { ThemedButton } from '../components/theme/themed-button';
import { NavigationProps } from '../type';
import { useAppDispatch, useAppSelector } from '../app/store';
import Card from '../components/post-card';
import { fetchPostRequested } from '../slices/post-slice';
import { useEffect } from 'react';




export default function PostScreen({ navigation }: NavigationProps) {
  const header = 'Find some blog posts here...';
  const dispatch = useAppDispatch();
  const { posts, isLoading } = useAppSelector((s) => s.post);

  useEffect(() => {
    const params = { userId: 5 };
    dispatch(fetchPostRequested(params))
  }, [dispatch])

  return (
    <ThemedView style={styles.container}>
        <ThemedText style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }} > {header} </ThemedText>
        <ThemedView style={styles.container}>
          {isLoading && posts.length === 0 ? (
            <ThemedText>
              Loading blogs...
            </ThemedText>
          ) : posts.length === 0 ? (
            <ThemedText>
              No blogs found
            </ThemedText>
          ) : (
            <FlatList
              data={posts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                  <Card post={item} nav={{navigation}} />
              )}
            />
          )}
        </ThemedView>
    </ThemedView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 30,
  },
  image: {
    width: 100,
    height: 100,
  },
});
