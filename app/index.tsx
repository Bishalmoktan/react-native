import { Image, ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "@/components/custom-button";
import { useGlobalContext } from "@/context/global-context";

const Home = () => {
  const { isLoggedIn, loading } = useGlobalContext();

  if (loading) {
    return <View className="h-screen bg-primary"></View>;
  }

  if (isLoggedIn) return <Redirect href={"/home"} />;
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="items-center justify-center w-full min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-4xl font-bold text-center text-white">
              Discover Endless possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-12"
              resizeMode="contain"
            />
          </View>

          <Text className="text-center text-gray-100 font-pregular mt-7">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            loading={false}
            containerStyles={"w-full mt-7"}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};
export default Home;
