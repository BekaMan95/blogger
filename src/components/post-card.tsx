import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from './theme/themed-text';
import { useThemeColor } from '../app/hooks';
import { useAppDispatch } from '../app/store';
import { selectPost } from '../screens/posts/slices/fetch-posts-slice';
import { PostCardProps } from './types';
import { toTtileCase } from '../utils';




export default function Card({post, nav}: PostCardProps) {

//   const [expanded, setExpanded] = useState(false);
  const backgroundColor = useThemeColor({ light: '#eeeeee', dark: '#292e30' }, 'background');
  const dispatch = useAppDispatch();
  
  function handleDetailNavigation() {
    console.log('handled from card')
    dispatch(selectPost(post));  
    nav.navigation.navigate('Post Detail');
  }


  return (
    <View style={[styles.card, { backgroundColor }]}>
      <ThemedText style={styles.title}>{toTtileCase(post.title)}</ThemedText>
      <ThemedText
        style={styles.description}
        numberOfLines={1}
      >
        {post.body}
      </ThemedText>
      <TouchableOpacity onPress={() => {handleDetailNavigation(); console.log('read more: ', post) }} >
        <ThemedText style={styles.readMore}>
          {'Read More'}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
  },
  readMore: {
    alignSelf: 'flex-end',
    marginTop: 6,
    color: '#3498db',
    fontWeight: '600',
  },
});
