import ThemedModal from "./theme/themed-modal";
import { ThemedText } from "./theme/themed-text";
import { GestureResponderEvent } from "react-native";
import { ThemedInput } from "./theme/themed-input";
import { ThemedButton } from "./theme/themed-button";

interface AddModalProps {
  visible: boolean;
  onClose: (event?: GestureResponderEvent) => void;
}

export default function AddModal({ visible, onClose }: AddModalProps) {

    return (
        <ThemedModal 
            visible={visible} onClose={() => {onClose()}}
        >
            <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }} > Add Post </ThemedText>
            <ThemedInput placeholder="Title" variant="outlined" style={{ marginVertical: 10, width: '90%' }} />
            <ThemedInput placeholder="Content" variant="outlined" multiline style={{ height: 100, marginVertical: 20, width: '90%' }} />
            <ThemedButton variant="primary" title="Add" />
        </ThemedModal>
    );
}
