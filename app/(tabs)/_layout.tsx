import React from "react";
import {
  NativeTabs,
  Icon,
  Label,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Platform, DynamicColorIOS } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Dynamic colors for liquid glass - adapts to light/dark backgrounds
  const dynamicTextColor =
    Platform.OS === "ios"
      ? DynamicColorIOS({ dark: "white", light: "black" })
      : Colors[colorScheme ?? "light"].text;

  const dynamicTintColor =
    Platform.OS === "ios"
      ? DynamicColorIOS({
          dark: "white",
          light: Colors[colorScheme ?? "light"].tint,
        })
      : Colors[colorScheme ?? "light"].tint;

  return (
    <NativeTabs
      // Liquid glass effect automatically applied on iOS 26+
      labelStyle={{
        color: dynamicTextColor,
      }}
      tintColor={dynamicTintColor}
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        {Platform.select({
          ios: <Icon sf={{ default: "house", selected: "house.fill" }} />,
          default: <Icon src={<VectorIcon family={Ionicons} name="home" />} />,
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="programs">
        <Label>Programs</Label>
        {Platform.select({
          ios: (
            <Icon
              sf={{
                default: "list.bullet.rectangle",
                selected: "list.bullet.rectangle.fill",
              }}
            />
          ),
          default: (
            <Icon src={<VectorIcon family={FontAwesome5} name="dumbbell" />} />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="workout">
        <Label>Workout</Label>
        {Platform.select({
          ios: (
            <Icon
              sf={{ default: "figure.run", selected: "figure.run.circle.fill" }}
            />
          ),
          default: (
            <Icon src={<VectorIcon family={FontAwesome5} name="running" />} />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="history">
        <Label>History</Label>
        {Platform.select({
          ios: <Icon sf={{ default: "clock", selected: "clock.fill" }} />,
          default: <Icon src={<VectorIcon family={Ionicons} name="time" />} />,
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        {Platform.select({
          ios: (
            <Icon
              sf={{ default: "person", selected: "person.fill" }}
            />
          ),
          default: (
            <Icon src={<VectorIcon family={Ionicons} name="person" />} />
          ),
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
