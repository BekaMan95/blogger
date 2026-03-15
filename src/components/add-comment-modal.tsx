import ThemedModal from "./theme/themed-modal";
import { ThemedText } from "./theme/themed-text";
import { FlatList, StyleSheet } from "react-native";
import { ThemedInput } from "./theme/themed-input";
import { ThemedButton } from "./theme/themed-button";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useEffect } from "react";
import { addCommentRequested } from "../screens/post-detail/slices/add-comment-slice";
import { fetchCommentsRequested } from "../screens/post-detail/slices/fetch-comments-slice";
import { ThemedView } from "./theme/themed-view";
import CommentCard  from "./comment-card";
import { AddCommentModalProps } from "./types";
import { Formik } from 'formik';
import * as Yup from 'yup';




const AddCommentSchema = Yup.object().shape({
    body: Yup.string()
        .required('Required'),
});

export default function AddCommentModal({ visible, onClose, postId }: AddCommentModalProps) {
    const dispatch = useAppDispatch()
    const { comments, isLoadingComments } = useAppSelector((s) => s.fetchComment);
    const { isLoading } = useAppSelector((s) => s.addComment);


    useEffect(() => {
        const params = { postId: postId.toString() };
        dispatch(fetchCommentsRequested(params))
    }, [dispatch, postId])
    

    return (
        <ThemedModal 
            visible={visible} onClose={() => {onClose()}}
            style={{  
                justifyContent: 'center', 
                alignItems: 'center',
                width: '80%',
                height: '80%',
                gap: 10,
            }}
        >
            <Formik
                initialValues={{
                    postId: postId,
                    name: 'From Blogger App',
                    email: 'app@blogger.com',
                    body: '',
                }}
                validationSchema={AddCommentSchema}
                onSubmit={(values, { resetForm }) => {
                    dispatch(addCommentRequested(values))
                    resetForm();
                    
                    // onClose();
                }}
            >
                {({ handleChange, handleSubmit, errors, touched, values }) => (
                    <>
                        <ThemedInput placeholder="Write your comment here..." variant="outlined" multiline 
                            style={{ height: 100, marginTop: 40, width: '100%', justifyContent: 'flex-start' }} 
                            value={values.body}
                            onChangeText={handleChange('body')}
                        />
                        {errors.body && touched.body ? (
                            <ThemedText style={styles.errorText}>{errors.body}</ThemedText>
                        ) : null}
                        <ThemedButton 
                            variant="primary" 
                            style={{ alignSelf: 'flex-end', }} 
                            title={isLoading ? "Sending..." : "Send"} 
                            onPress={handleSubmit} 
                        />
                    </>
                )}
            </Formik>
            <ThemedView style={[styles.container, { width: '100%', backgroundColor: 'transparent' }]}>
                {isLoadingComments && comments.length === 0 ? (
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
    errorText: {
        fontSize: 14,
        fontFamily: '',
        color: '#ee5555',
        alignSelf: 'flex-start',
        paddingLeft: 30
    },
});
