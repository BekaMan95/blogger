import ThemedModal from "./theme/themed-modal";
import { ThemedText } from "./theme/themed-text";
import { ThemedInput } from "./theme/themed-input";
import { ThemedButton } from "./theme/themed-button";
import { useAppDispatch, useAppSelector } from "../app/store";
import { addPostRequested } from "../screens/home/slices/add-post-slice";
import { AddPostModalProps } from "./types";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StyleSheet } from "react-native";



const AddPostSchema = Yup.object().shape({
    title: Yup.string()
        .min(4, 'Min 4 caracters!')
        .max(50, 'Max 50 characters!')
        .required('Required'),
    body: Yup.string()
        .min(10, 'Min 10 caracters!')
        .max(1500, 'Max 1500 cahracters!')
        .required('Required'),
});


export default function AddPostModal({ visible, onClose }: AddPostModalProps) {
    const modalTitle = 'Add Post';
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector((s) => s.addPost)

    return (
        <ThemedModal 
            visible={visible} onClose={() => {onClose()}} 
            style={{
                paddingTop: 50,
                width: '80%',
                gap: 5,
            }}
        >
            <Formik
                initialValues={{
                    userId: 101,
                    title: '',
                    body: '',
                }}
                validationSchema={AddPostSchema}
                onSubmit={(values, { resetForm }) => {
                    dispatch(addPostRequested(values))
                    resetForm();
                    onClose();
                }}
            >
                {({ handleChange, handleSubmit, errors, touched, values }) => (
                    <>
                        <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }} >{modalTitle}</ThemedText>
                        <ThemedInput placeholder="Title" variant="outlined" 
                            style={{ marginTop: 10, width: '90%' }}
                            value={values.title}
                            onChangeText={handleChange('title')}
                        />
                        {errors.title && touched.title ? (
                            <ThemedText style={styles.errorText}>{errors.title}</ThemedText>
                        ) : null}
                        <ThemedInput placeholder="Content" variant="outlined" multiline 
                            style={{ height: 100, marginTop: 20, width: '90%' }} 
                            value={values.body}
                            onChangeText={handleChange('body')}
                        />
                        {errors.body && touched.body ? (
                            <ThemedText style={styles.errorText}>{errors.body}</ThemedText>
                        ) : null}
                        <ThemedButton 
                            variant="primary" 
                            title={isLoading ? "Adding..." : "Add"} 
                            onPress={handleSubmit}
                            style={{ marginTop: 30}}
                        />
                    </>
                )}
            </Formik>
        </ThemedModal>
    );
}


const styles = StyleSheet.create({
    errorText: {
        fontSize: 14,
        fontFamily: '',
        color: '#ee5555',
        alignSelf: 'flex-start',
        paddingLeft: 30
    }
});
