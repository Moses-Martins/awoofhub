import { useLogin } from "@/features/auth/useLogin";
import { LoginData } from "@/types/auth";
import { LoginFormProps } from "@/types/form-props";
import { Lock, Mail } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { InputField } from "../form/InputField";
import { Portal, Modal, ActivityIndicator } from "react-native-paper";
// ─── Theme constants ─────────────────────────────────────────────────────────
const COLORS = {
  primary: "#F15A22",
  iconMuted: "#ffffff",
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function LoginForm({ onSuccess }: LoginFormProps) {
  const login = useLogin({ onSuccess });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginData) => {
    login.submit(data);
  };

  return (
    <>  
      <Portal>
        <Modal
          visible={login.isPending}
          dismissable={false}
          contentContainerStyle={{
            backgroundColor: "white",
            marginHorizontal: 32,
            paddingVertical: 30,
            paddingHorizontal: 24,
            borderRadius: 24,
            alignItems: "center",
          }}
        >
            <View className="flex-row items-center justify-center">
                
          <ActivityIndicator
            animating
            size="small"
            color={COLORS.primary}
          />

          <Text
            style={{
              marginTop: 18,
              fontSize: 18,
              fontWeight: "700",
              color: "#0F172A",
            }}
          >
            Loading...
          </Text>
            </View>

        </Modal>
      </Portal>


    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingBottom: 48 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >

      <View
        className="h-52 flex-row pb-8 gap-2 items-center bg-[#F15A22] rounded-br-[120px]"
      >
        <Text className="text-4xl font-bold text-white leading-tight">
          Welcome
        </Text>
        <Text className="text-4xl font-bold text-black leading-tight">
          Back!
        </Text>
      </View>

      <View className="px-6 pt-6">
        <Text className="text-sm text-slate-400 leading-relaxed mb-6">
          Login to manage your offers and get personalised recommendations.
        </Text>

     
        <View className="gap-5">
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <InputField
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                compulsory
                icon={<Mail size={18} color={COLORS.iconMuted} />}
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
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <InputField
                label="Password"
                type="password"
                placeholder="••••••••"
                compulsory
                icon={<Lock size={18} color={COLORS.iconMuted} />}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={fieldState.error}
              />
            )}
          />
        </View>

        <TouchableOpacity
          className="self-end mt-3"
          activeOpacity={0.7}
          onPress={() => { /* navigate to forgot password */ }}
        >
          <Text className="text-sm font-medium" style={{ color: COLORS.primary }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

       
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.75}
          disabled={isSubmitting}
          className={`mt-8 h-14 rounded-2xl items-center justify-center ${
            isSubmitting ? "opacity-50" : "opacity-100"
          }`}
          style={{ backgroundColor: COLORS.primary }}
        >
          <Text className="text-[15px] font-bold text-white tracking-wide">
            {isSubmitting ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <View className="flex-row items-center justify-center mt-6">
          <Text className="text-sm text-slate-400">
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => { /* navigate to signup */ }}>
            <Text className="text-sm font-semibold" style={{ color: COLORS.primary }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
    </>
  );
}
