import { EditProfileForm } from "@/components/profile/EditProfileForm";
import { useRouter } from "expo-router";

export default function EditScreen() {
    const router = useRouter();
    const onSuccess = () => {
        router.replace("/profile/");
    }

    return <EditProfileForm onSuccess={onSuccess} />
};
