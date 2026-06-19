import { useUploadSinglePhoto } from "@/features/upload/useUpdateProfilePhoto";
import { useUpdateUser } from "@/features/user/useUpdateUser";
import { useUser } from "@/features/user/useUser";
import { notificationsStore } from "@/store/notifications/notifications";
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { Lock, Mail } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, ImageBackground, Pressable, Text, View } from "react-native";

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

    const hasUserEditedAddress = useRef(false);

    const imageUri = watch("profileImageUrl");

    const handlePhotoUpload = async () => {
        if (isUploading) return;
        try {
            const permission =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permission.granted) {
                notificationsStore.getState().showNotification({
                    type: "error",
                    title: "Permission required",
                    message: "Allow access to photos to continue",
                });
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (result.canceled) return;

            const asset = result.assets?.[0];
            if (!asset?.uri) return;

            const file = {
                uri: asset.uri,
                name: asset.fileName ?? `photo_${Date.now()}.jpg`,
                type: asset.mimeType ?? "image/jpeg",
            };

            const res = await uploadPhoto(file);
            setValue("profileImageUrl", res.data);

        } catch (err: any) {
            console.error("Upload error:", err);

            // rollback image if upload fails
            setValue("profileImageUrl", watch("profileImageUrl") || "");

            notificationsStore.getState().showNotification({
                type: "error",
                title: "Upload failed",
                message: err?.message || "Please try again",
            });
        }
    };

    const onSubmit = (data: any) => {
        const { addressPlaceId, ...submitData } = data;

        updateUser.submit(submitData);
    };

    useEffect(() => {
        if (currentUser) {
            reset({
                name: currentUser.name || "",
                bio: currentUser.bio || "",
                website: currentUser.website || "",
                address: currentUser.address || "",
                addressPlaceId: "",
                profileImageUrl: currentUser.profileImageUrl || "",
            });
        }
    }, [currentUser, reset]);

    return (
        <View className="flex-1 px-5 py-6">

            <View className="items-center mb-6">
                <View className="relative w-28 h-28">
                    <View className="w-full h-full rounded-full overflow-hidden border-4 border-gray-300 bg-gray-200">
                        {imageUri ? (
                            <ImageBackground
                                source={{ uri: imageUri }}
                                className="w-full h-full"
                            >
                                <View className="absolute inset-0 bg-black/30" />

                                <Pressable
                                    onPress={handlePhotoUpload}
                                    className="flex-1 items-center justify-center"
                                >
                                    <Feather name="edit-2" size={18} color="white" />
                                </Pressable>
                            </ImageBackground>
                        ) : (
                            <View className="w-full h-full items-center justify-center bg-gray-300">
                                <Feather name="user" size={40} color="gray" />
                            </View>
                        )}

                        {isUploading && (
                            <View className="absolute inset-0 items-center justify-center bg-black/40">
                                <ActivityIndicator color="#fff" />
                            </View>
                        )}
                    </View>

                    {!imageUri && (
                        <Pressable
                            onPress={handlePhotoUpload}
                            className="absolute bottom-0 right-0 bg-black p-2.5 rounded-full z-10 shadow-sm"
                        >
                            <Feather name="camera" size={14} color="white" />
                        </Pressable>
                    )}
                </View>

                <Text className="text-xs text-gray-500 mt-2">
                    Tap to change photo
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
                            if (!value?.trim()) return true;

                            if (!hasUserEditedAddress.current) return true;

                            return !!watch("addressPlaceId") || "Please select a location from suggestions";
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <GoogleInputField
                            label="Address"
                            value={field.value}
                            error={fieldState.error}
                            onChangeText={(text: string) => {
                                hasUserEditedAddress.current = true;

                                field.onChange(text);
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