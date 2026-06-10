import { User } from "@/types/user";
import { format } from "date-fns";
import { View } from "react-native";
import { AboutItem } from "./AboutItem";

import { Calendar, Globe, Mail, MapPin, Shield, User as UserIcon } from "lucide-react-native";

interface Props {
    profile: User;
}

export function About({ profile }: Props) {

    const { name, email, website, bio, address, createdAt, role } = profile;

    const roleLabel = role === "user" ? "Individual" : role === "business" ? "Business" : "Admin";

    return (
        <View className="mt-5 px-5 gap-4 w-full">
            <AboutItem field="Name" value={name} Icon={UserIcon} />

            <AboutItem field="Email" value={email} Icon={Mail} />

            <AboutItem field="Account Type" value={roleLabel} Icon={Shield} />

            <AboutItem field="Website" value={website} Icon={Globe} />

            <AboutItem field="Address" value={address} Icon={MapPin} />

            <AboutItem
                field="Joined"
                value={createdAt ? format(new Date(createdAt), "MMMM d, yyyy") : "Not set"}
                Icon={Calendar}
            />
        </View>
    );
}