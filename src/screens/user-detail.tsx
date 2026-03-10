import { ThemedText } from '../components/theme/themed-text';
import { ThemedView } from '../components/theme/themed-view';
import { ThemedButton } from '../components/theme/themed-button';
import { NavigationProps } from '../type';



export default function UserDetailScreen({ navigation }: NavigationProps) {

  return (
    <ThemedView style={{ flex: 1, padding: 20, gap: 30 }}>
        <ThemedText> User Detail </ThemedText>
        <ThemedText> This is the user detail page. </ThemedText>
        <ThemedText> End of Stack. </ThemedText>
        <ThemedButton variant="outline" title="Go Back" onPress={() => navigation.goBack()} />
    </ThemedView>
  );
}
