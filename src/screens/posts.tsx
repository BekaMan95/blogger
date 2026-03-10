import { StyleSheet } from 'react-native';
import { ThemedText } from '../components/theme/themed-text';
import { ThemedView } from '../components/theme/themed-view';
import { ThemedButton } from '../components/theme/themed-button';
import { NavigationProps } from '../type';




export default function PostScreen({ navigation }: NavigationProps) {

  return (
    <ThemedView>
        <ThemedText> Post Page </ThemedText>
        <ThemedText> This is the post page. </ThemedText>
        <ThemedButton title="Post Details" onPress={() => navigation.navigate('Post Detail')} />
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
