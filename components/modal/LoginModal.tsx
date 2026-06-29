import { Portal, Dialog, ActivityIndicator } from "react-native-paper";
import { Text, View } from "react-native";

interface LoadingModalProps {
  visible: boolean;
  message?: string;
}

export default function LoadingModal({
  visible,
  message = "Logging you in...",
}: LoadingModalProps) {
  return (
    <Portal>
      <Dialog
        visible={visible}
        dismissable={false}
        style={{
          borderRadius: 16,
          backgroundColor: "white",
        }}
      >
        <Dialog.Content>
          <View
            style={{
              alignItems: "center",
              paddingVertical: 20,
            }}
          >
            <ActivityIndicator
              size="large"
              color="#f97316"
            />

            <Text
              style={{
                marginTop: 16,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {message}
            </Text>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}