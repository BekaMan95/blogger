import ThemedModal from "./theme/themed-modal";
import { ThemedText } from "./theme/themed-text";
import { GestureResponderEvent } from "react-native";
import { ThemedInput } from "./theme/themed-input";
import { ThemedButton } from "./theme/themed-button";
import { useAppDispatch, useAppSelector } from "../app/store";
import { addPostRequested } from "../slices/post-slice";
import { useState } from "react";

interface AddModalProps {
  visible: boolean;
  onClose: (event?: GestureResponderEvent) => void;
}

export default function AddModal({ visible, onClose }: AddModalProps) {
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector((s) => s.post)
    const [formData, setFormData] = useState({
        userId: 0,
        title: '',
        body: '',
    })

    function handleSubmit() {
        if (!formData.title || !formData.body) return

        const postData = {
            userId: 100,
            title: formData.title,
            body: formData.body
        }

        dispatch(addPostRequested(postData))
        setFormData({ userId: 0, title: '', body: '' })
        onClose()
    }

    return (
        <ThemedModal 
            visible={visible} onClose={() => {onClose()}}
        >
            <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }} > Add Post </ThemedText>
            <ThemedInput placeholder="Title" variant="outlined" 
                style={{ marginVertical: 10, width: '90%' }}
                value={formData.title}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, title: text }))}
            />
            <ThemedInput placeholder="Content" variant="outlined" multiline 
                style={{ height: 100, marginVertical: 20, width: '90%' }} 
                value={formData.body}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, body: text }))}
            />
            <ThemedButton variant="primary" title={isLoading ? "Adding..." : "Add"} onPress={handleSubmit} />
        </ThemedModal>
    );
}
