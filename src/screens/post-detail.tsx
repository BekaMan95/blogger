import { ThemedButton } from '../components/theme/themed-button';
import { ThemedText } from '../components/theme/themed-text';
import { ThemedView } from '../components/theme/themed-view';
import { NavigationProps } from '../type';




export default function PostDetailScreen({ navigation }: NavigationProps) {

  return (
    <ThemedView style={{ flex: 1, padding: 20, gap: 30 }}>
        <ThemedText> Post Detail </ThemedText>
        <ThemedText> This is the post detail page. </ThemedText>
         <ThemedButton title="User Detail" onPress={() => navigation.navigate('User Detail')} />
        <ThemedButton variant="outline" title="Go Back" onPress={() => navigation.goBack()} />
    </ThemedView>
  );
}