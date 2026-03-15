import ThemedModal from "./theme/themed-modal";
import { ThemedText } from "./theme/themed-text";
import { FlatList, StyleSheet } from "react-native";
import { ThemedInput } from "./theme/themed-input";
import { ThemedButton } from "./theme/themed-button";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useEffect, useState } from "react";
import { addCommentRequested } from "../screens/post-detail/slices/add-comment-slice";
import { fetchCommentsRequested } from "../screens/post-detail/slices/fetch-comments-slice";
import { ThemedView } from "./theme/themed-view";
import CommentCard  from "./comment-card";
import { AddCommentModalProps } from "./types";




export default function AddCommentModal({ visible, onClose, postId }: AddCommentModalProps) {
    const dispatch = useAppDispatch()
    const { comments, isLoadingComment } = useAppSelector((s) => s.fetchComment);

    useEffect(() => {
    const params = { postId: postId.toString() };
    dispatch(fetchCommentsRequested(params))
    }, [dispatch])

    const [formData, setFormData] = useState({
        postId: 0,
        name: '',
        email: '',
        body: '',
    })

    

    function handleSubmit() {
        if (!formData.body) return

        const commentData = {
            postId: 100,
            name: formData.name ? formData.name : 'From Blogger App',
            email: formData.email ? formData.email : 'app@blogger.com',
            body: formData.body
        }

        dispatch(addCommentRequested(commentData))
        setFormData({ postId: 0, name: '', email: '', body: '' })
        // onClose()
    }

    return (
        <ThemedModal 
            visible={visible} onClose={() => {onClose()}}
            style={{  
                justifyContent: 'center', 
                alignItems: 'center',
                width: '80%',
                height: '80%',
                gap: 20,
            }}
        >
            <ThemedInput placeholder="Write your comment here..." variant="outlined" multiline 
                style={{ height: 100, marginTop: 40, width: '100%', justifyContent: 'flex-start' }} 
                value={formData.body}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, body: text }))}
            />
            <ThemedButton 
                variant="primary" 
                style={{ alignSelf: 'flex-end', }} 
                title={isLoadingComment ? "Sending..." : "Send"} 
                onPress={handleSubmit} 
            />
            <ThemedView style={[styles.container, { width: '100%', backgroundColor: 'transparent' }]}>
                {isLoadingComment && comments.length === 0 ? (
                <ThemedText>
                    Loading comments...
                </ThemedText>
                ) : comments.length === 0 ? (
                <ThemedText>
                    No comments found
                </ThemedText>
                ) : (
                <FlatList
                    data={comments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <CommentCard comment={item} />
                    )}
                    style={{ width: '100%' }}
                />
                )}
            </ThemedView>
        </ThemedModal>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 10,
    gap: 30,
    height: 500,
  },
  image: {
    width: 100,
    height: 100,
  },
});
