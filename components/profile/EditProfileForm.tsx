import { Lock, Mail } from "lucide-react-native";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

import { useUploadSinglePhoto } from "@/features/upload/useUpdateProfilePhoto";
import { useUpdateUser } from "@/features/user/useUpdateUser";
import { useUser } from "@/features/user/useUser";
import { notificationsStore } from "@/store/notifications/notifications";
import { capitalizeFirstLetter } from "@/utils/truncate";

import { EditProfileFormProps } from "@/types/form-props";
import { GoogleInputField } from "../form/AutoComplete";
import { InputField } from "../form/InputField";

export const EditProfileForm = ({ onSuccess }: EditProfileFormProps) => {
    const { data: currentUser } = useUser();
    const updateUser = useUpdateUser({ onSuccess });
    const { uploadPhoto, isPending: isUploading } = useUploadSinglePhoto();

    const { control, handleSubmit, reset, setValue, watch } = useForm<any>({
        defaultValues: {
            address: "",
            addressPlaceId: "",
        },
    });

    const photoUrl = watch("profileImageUrl");

    const handlePhotoUpload = async () => {
        const result = await launchImageLibrary({
            mediaType: "photo",
            quality: 0.8,
        });

        const asset = result.assets?.[0];
        if (!asset?.uri) return;

        try {
            const file = {
                uri: asset.uri,
                type: asset.type,
                name: asset.fileName,
            };

            const res = await uploadPhoto(file);
            setValue("profileImageUrl", res.data);
        } catch (err: any) {
            notificationsStore.getState().showNotification({
                type: "error",
                title: "Error",
                duration: 5000,
                message: err?.message || "Something went wrong",
            });
        }
    };

    const onSubmit = (data: any) => {
        updateUser.submit(data);
    };

    useEffect(() => {
        if (currentUser) {
            reset({
                name: currentUser.name || "",
                bio: currentUser.bio || "",
                website: currentUser.website || "",
                address: currentUser.address || "",
                profileImageUrl: currentUser.profileImageUrl || "",
            });
        }
    }, [currentUser, reset]);

    return (
        <View className="flex-1 px-5 py-6">

            {/* PROFILE IMAGE */}
            <View className="items-center mb-6">
                <View className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 items-center justify-center border-4 border-gray-300">
                    {photoUrl ? (
                        <Image source={{ uri: photoUrl }} className="w-full h-full" />
                    ) : (
                        <View className="w-full h-full bg-green-500 items-center justify-center">
                            <Text className="text-white text-3xl font-bold">
                                {capitalizeFirstLetter(currentUser?.name || "User")}
                            </Text>
                        </View>
                    )}
                </View>

                <Pressable
                    onPress={handlePhotoUpload}
                    className="absolute bottom-0 right-[40%] bg-black p-3 rounded-full"
                >
                    {isUploading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white">📷</Text>
                    )}
                </Pressable>

                <Text className="text-xs text-gray-500 mt-2">
                    Click camera to update photo
                </Text>
            </View>

            {/* FORM */}
            <View>

                <Controller
                    control={control}
                    name="name"
                    rules={{
                        required: "Name is required",
                        maxLength: { value: 50, message: "Max 50 characters" },
                    }}
                    render={({ field, fieldState }) => (
                        <InputField
                            label="Name"
                            placeholder="Your name"
                            compulsory
                            icon={<Lock size={18} color="#718096" />}
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                            error={fieldState.error}
                        />
                    )}
                />

                {/* BIO */}
                <Controller
                    control={control}
                    name="bio"
                    rules={{
                        maxLength: { value: 200, message: "Max 200 characters" },
                    }}
                    render={({ field, fieldState }) => (
                        <InputField
                            label="Bio"
                            placeholder="Tell something about yourself"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                            error={fieldState.error}
                        />
                    )}
                />

                {/* WEBSITE */}
                <Controller
                    control={control}
                    name="website"
                    rules={{
                        pattern: {
                            value: /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.*)?$/,
                            message: "Enter valid URL",
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <InputField
                            label="Website"
                            placeholder="https://example.com"
                            icon={<Mail size={18} color="#718096" />}
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                            error={fieldState.error}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="address"
                    rules={{
                        validate: (value) => {
                            const placeId = watch("addressPlaceId");

                            if (!value?.trim()) return true;

                            return !!placeId || "Please select a location from suggestions";
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <GoogleInputField
                            label="Address"
                            value={field.value}
                            error={fieldState.error}
                            onChangeText={(text: string) => {
                                field.onChange(text);

                                // user typed manually
                                setValue("addressPlaceId", "");
                            }}
                            onPlaceSelect={(place) => {
                                field.onChange(place.description);

                                // user selected from Google
                                setValue("addressPlaceId", place.placeId, {
                                    shouldValidate: true,
                                });
                            }}
                        />
                    )}
                />

                {/* ACTION BUTTONS */}
                <View className="flex-row justify-between mt-6">

                    <Pressable
                        onPress={() => reset()}
                        className="bg-gray-300 px-4 py-3 rounded-xl w-[48%] items-center"
                    >
                        <Text>Reset</Text>
                    </Pressable>

                    <Pressable
                        onPress={handleSubmit(onSubmit)}
                        disabled={updateUser.isPending}
                        className="bg-black px-4 py-3 rounded-xl w-[48%] items-center"
                    >
                        {updateUser.isPending ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text className="text-white">Update</Text>
                        )}
                    </Pressable>

                </View>
            </View>
        </View>
    );
};