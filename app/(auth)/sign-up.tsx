import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/form-field";
import { useState } from "react";
import CustomButton from "@/components/custom-button";
import { Link, router } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import { createUser } from "@/lib/appWrite";
import { useGlobalContext } from "@/context/global-context";

const SignUp = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setCurrentUser, setIsLoggedIn } = useGlobalContext();

  const onSumbit = async () => {
    if (!formState.email || !formState.username || !formState.password) {
      Alert.alert("Error", "Fill all the fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const user = await createUser(
        formState.username,
        formState.email,
        formState.password
      );
      // @ts-expect-error
      setCurrentUser(user);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "Something went wrong!");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ScrollView>
          <View className="items-center justify-center w-full h-[75vh] px-4 my-6">
            <Image
              source={images.logo}
              className="w-[115px] h-[35px]"
              resizeMode="contain"
            />

            <Text className="mt-10 text-2xl text-white font-psemibold">
              Sign up to Aora
            </Text>

            <FormField
              title="Username"
              value={formState.username}
              placeholder="Your username"
              handleTextChange={(text) =>
                setFormState({ ...formState, username: text })
              }
              otherStyles="mt-7"
            />

            <FormField
              title="Email"
              value={formState.email}
              placeholder="Your email"
              handleTextChange={(text) =>
                setFormState({ ...formState, email: text })
              }
              otherStyles="mt-7"
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={formState.password}
              placeholder="Your password"
              handleTextChange={(text) =>
                setFormState({ ...formState, password: text })
              }
              otherStyles="mt-7"
            />

            <CustomButton
              title="Sign Up"
              handlePress={onSumbit}
              containerStyles="mt-7 w-full"
              loading={isSubmitting}
            />

            <View className="flex-row justify-center gap-2 pt-5">
              <Text className="text-lg text-gray-100 font-pregular">
                Already have an account?
              </Text>
              <Link
                className="text-lg font-psemibold text-secondary"
                href={"/sign-in"}
              >
                Sign In
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default SignUp;
