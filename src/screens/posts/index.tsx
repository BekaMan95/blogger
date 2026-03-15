import { FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../../components/theme/themed-text';
import { ThemedView } from '../../components/theme/themed-view';
import { NavigationProps } from './types';
import { useAppDispatch, useAppSelector } from '../../app/store';
import Card from '../../components/post-card';
import { fetchPostsRequested } from './slices/fetch-posts-slice';
import { useEffect, useState } from 'react';
import { 
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  TOTAL_PAGES,
  WINDOW_SIZE
} from '../../utils/constants';



export default function PostScreen({ navigation }: NavigationProps) {
  const header = 'Find some blog posts here...';
  const dispatch = useAppDispatch();
  const { posts, isLoading } = useAppSelector((s) => s.fetchPosts);

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
  const [pageWindowStart, setPageWindowStart] = useState(0); // index of first visible page
  

  // Fetch posts whenever currentPage changes
  useEffect(() => {
    const start = currentPage * DEFAULT_PAGE_SIZE;
    const params = { start: start.toString(), limit: DEFAULT_PAGE_SIZE.toString() };
    dispatch(fetchPostsRequested(params));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Move window backward by one page
  const handlePrevWindow = () => {
    const newStart = Math.max(pageWindowStart - 1, 0);
    setPageWindowStart(newStart);
    setCurrentPage(newStart); // optional: jump to first page in new window
  };

  // Move window forward by one page
  const handleNextWindow = () => {
    const newStart = Math.min(pageWindowStart + 1, TOTAL_PAGES - WINDOW_SIZE);
    setPageWindowStart(newStart);
    setCurrentPage(newStart); // optional: jump to first page in new window
  };

  // Slice the visible pages
  const visiblePages = Array.from({ length: TOTAL_PAGES }, (_, i) => i).slice(
    pageWindowStart,
    pageWindowStart + WINDOW_SIZE
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.header}>{header}</ThemedText>
      <ThemedView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        {isLoading && posts.length === 0 ? (
          <ThemedText>Loading blogs...</ThemedText>
        ) : posts.length === 0 ? (
          <ThemedText>No blogs found</ThemedText>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Card post={item} nav={{ navigation }} />}
            ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
          />
        )}
      </ThemedView>
      {/* Pagination bar */}
      <View style={styles.paginationContainer}>
        {/* Prev window button */}
        {pageWindowStart > 0 && (
          <TouchableOpacity style={styles.pageButton} onPress={handlePrevWindow}>
            <ThemedText>{'<<'}</ThemedText>
          </TouchableOpacity>
        )}

        {/* Visible page numbers */}
        {visiblePages.map((page) => (
          <TouchableOpacity
            key={page}
            style={[
              styles.pageButton,
              currentPage === page && styles.activePageButton,
            ]}
            onPress={() => handlePageChange(page)}
          >
            <ThemedText
              style={currentPage === page ? styles.activePageText : {}}
            >
              {page + 1}
            </ThemedText>
          </TouchableOpacity>
        ))}

        {/* Next window button */}
        {pageWindowStart + WINDOW_SIZE < TOTAL_PAGES && (
          <TouchableOpacity style={styles.pageButton} onPress={handleNextWindow}>
            <ThemedText>{'>>'}</ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    height: '100%',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  pageButton: {
    padding: 8,
    margin: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  activePageButton: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  activePageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
