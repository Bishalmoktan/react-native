import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/form-field";
import { useState } from "react";
import CustomButton from "@/components/custom-button";
import { Link, router } from "expo-router";
import { signIn } from "@/lib/appWrite";

const SignIn = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSumbit = async () => {
      if (!formState.email  || !formState.password) {
        Alert.alert("Error", "Fill all the fields");
        return;
      }
      setIsSubmitting(true);
      try {
        await signIn(
          formState.email,
          formState.password
        );

        // set global state

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
          <View className="items-center justify-center w-full h-[80vh] px-4 my-6">
            <Image
              source={images.logo}
              className="w-[115px] h-[35px]"
              resizeMode="contain"
            />

            <Text className="mt-10 text-2xl text-white font-psemibold">
              Log in to Aora
            </Text>

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
              title="Sign In"
              handlePress={onSumbit}
              containerStyles="mt-7 w-full"
              loading={isSubmitting}
            />

            <View className="flex-row justify-center gap-2 pt-5">
              <Text className="text-lg text-gray-100 font-pregular">
                Don't have an account?
              </Text>
              <Link
                className="text-lg font-psemibold text-secondary"
                href={"/sign-up"}
              >
                Sign Up
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default SignIn;
