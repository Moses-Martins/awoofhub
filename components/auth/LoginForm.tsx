import { useLogin } from "@/features/auth/useLogin";
import { LoginData } from "@/types/auth";
import { LoginFormProps } from "@/types/form-props";
import { Lock, Mail } from "lucide-react-native";
import { Controller, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from "react-native";
import { InputField } from "../form/InputField";

export default function LoginScreen({ onSuccess }: LoginFormProps) {
    const login = useLogin({ onSuccess });
    const { handleSubmit, control } = useForm<LoginData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (data: LoginData) => {
        login.submit(data);
    };


    return (
        <View>
            <Controller
                control={control}
                name="email"
                rules={{
                    required: 'Email is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                    }
                }}
                render={({ field: { onChange, onBlur, value }, fieldState }) => (
                    <InputField
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        compulsory
                        icon={<Mail size={20} color="#718096" />}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        error={fieldState.error}
                    />
                )}
            />

            <Controller
                control={control}
                name="password"
                rules={{
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                }}
                render={({ field: { onChange, onBlur, value }, fieldState }) => (
                    <InputField
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        compulsory
                        icon={<Lock size={20} color="#718096" />}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        error={fieldState.error}
                    />
                )}
            />

            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                className="mt-4 bg-orange-500 h-12 rounded-md items-center justify-center shadow-sm active:opacity-80"
            >
                <Text className="text-white text-base font-semibold font-baloo">
                    Login
                </Text>
            </TouchableOpacity>

        </View>
    );
}
