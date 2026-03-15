import { ThemedText } from '../../components/theme/themed-text';
import { ThemedView } from '../../components/theme/themed-view';
import { ThemedButton } from '../../components/theme/themed-button';
import { UserDetailProps } from './types';
import { StyleSheet, ScrollView } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchUserRequested } from './slices/fetch-user-slice';
import { useEffect } from 'react';





export default function UserDetailScreen({ navigation, route }: UserDetailProps) {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((s) => s.fetchUser);
  const { id } = route.params;
  
  useEffect(() => {
    const params = { id: id.toString() };
    dispatch(fetchUserRequested(params))
  }, [dispatch])

  console.log('Fetched User: ', user);

  return (
    <ScrollView 
      style={{ flex: 1}}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={true} 
    >
      {isLoading && user.length === 0 ? (
        <ThemedText>
          Loading User Data...
        </ThemedText>
      ) : user.length === 0 ? (
        <ThemedText>
          User not found!!
        </ThemedText>
      ) : (
        <>
        <ThemedView style={styles.section}>
          <ThemedText style={styles.title}>Basic Info</ThemedText>
          <ThemedText style={styles.item}>Name: {user[0].name}</ThemedText>
          <ThemedText style={styles.item}>Username: {user[0].username}</ThemedText>
          <ThemedText style={styles.item}>Email: {user[0].email}</ThemedText>
          <ThemedText style={styles.item}>Phone: {user[0].phone}</ThemedText>
          <ThemedText style={styles.item}>Website: {user[0].website}</ThemedText>
        </ThemedView>


        <ThemedView style={styles.section}>
          <ThemedText style={styles.title}>Address</ThemedText>
          <ThemedText style={styles.item}>Street: {user[0].address.street}</ThemedText>
          <ThemedText style={styles.item}>Suite: {user[0].address.suite}</ThemedText>
          <ThemedText style={styles.item}>City: {user[0].address.city}</ThemedText>
          <ThemedText style={styles.item}>Zipcode: {user[0].address.zipcode}</ThemedText>
          <ThemedText style={styles.item}>
            Geo: {user[0].address.geo.lat}, {user[0].address.geo.lng}
          </ThemedText>
        </ThemedView>

        
        <ThemedView style={styles.section}>
          <ThemedText style={styles.title}>Company</ThemedText>
          <ThemedText style={styles.item}>Name: {user[0].company.name}</ThemedText>
          <ThemedText style={styles.item}>Catch Phrase: {user[0].company.catchPhrase}</ThemedText>
          <ThemedText style={styles.item}>Business: {user[0].company.bs}</ThemedText>
        </ThemedView>
        </>
      )}
      
      
      <ThemedButton variant="outline" title="Go Back" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginTop: 60,
    minHeight: '100%',
    padding: 16,
    paddingBottom: 150,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    maxHeight: 200,
    width: '90%',
    margin: 10,
    padding: 12,
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    alignContent: 'center',
    fontSize: 14,
    marginBottom: 4,
  },
});
