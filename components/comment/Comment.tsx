import { useRouter } from "expo-router";
import { Send } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { ActivityIndicator, TextInput } from "react-native-paper";

import { useComment } from "@/features/comment/useComment";
import { useWriteComment } from "@/features/comment/useWriteComment";
import { useUser } from "@/features/user/useUser";
import { commentData } from "@/types/comment";
import { Offer } from "@/types/offer";
import CommentContainer from "./CommentContainer";


interface Props {
    offer: Offer;
}

export default function Comment({ offer }: Props) {
    const { writeComment, isPending } = useWriteComment({
        id: offer.id,
    });

    const { data: comments, isLoading } = useComment({
        id: offer.id,
    });

    const { data: currentUser } = useUser();

    const router = useRouter();


    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<commentData>({
        defaultValues: {
            comment: "",
        },
    });

    const onSubmit = (data: commentData) => {
        if (!currentUser) {
            router.push("/login");
            return;
        }

        writeComment(data);
        reset();
    };

    return (
        <View className="py-6 border-b border-gray-300">
            <View>
                <Text className="text-lg font-baloo-bold">
                    Leave a Comment
                </Text>

                <Text className="mb-5 text-sm font-mont text-gray-400">
                    Share your thoughts about this offer with others
                </Text>

                <View>
                    <Controller
                        control={control}
                        name="comment"
                        rules={{
                            required: "Comment cannot be empty",
                            maxLength: {
                                value: 300,
                                message: "Max 300 characters",
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                mode="outlined"
                                placeholder="Type in a comment"
                                value={value}
                                onChangeText={onChange}
                                style={{ height: 45 }}
                                outlineColor="#94a3b8"  
                                activeOutlineColor="#f97316"
                                right={
                                    <TextInput.Icon
                                        icon={() => (
                                            <View className="h-8 w-8 items-center justify-center rounded-lg bg-orange-600">
                                                <Send size={16} color="white" />
                                            </View>
                                        )}
                                        onPress={handleSubmit(onSubmit)}
                                    />
                                }
                            />
                        )}
                    />

                    {errors.comment && (
                        <Text className="mt-1 ml-2 text-xs text-red-500">
                            {errors.comment.message}
                        </Text>
                    )}
                </View>

            </View>

            {/* Comments */}
            <View className="mt-5">
                {isLoading && !comments?.length ? (
                    <ActivityIndicator size="large" />
                ) : !comments?.length ? (
                    <Text className="text-center text-gray-500">
                        No Comment found.
                    </Text>
                ) : (
                    <CommentContainer comments={comments} />
                )}
            </View>
        </View>
    );
}