import { EditProfileForm } from "@/components/profile/EditProfileForm";
import { useRouter } from "expo-router";

export default function EditScreen() {
    const router = useRouter();
    const onSuccess = () => {
        router.back();
    }

    return <EditProfileForm onSuccess={onSuccess} />
};
