import { migrateDbIfNeeded } from "@/services/DBService";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { Suspense } from "react";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <Suspense fallback={<Text>Cargando base de datos...</Text>}>
      <QueryClientProvider client={queryClient}>
        <SQLiteProvider
          databaseName="test.db"
          onInit={migrateDbIfNeeded}
          useSuspense
        >
          <SafeAreaProvider>
            <Stack>
              <Stack.Screen
                name="index"
                options={{ title: "Lista de tareas" }}
              />
            </Stack>
            <StatusBar style="light" backgroundColor="#123AAA" />
          </SafeAreaProvider>
        </SQLiteProvider>
      </QueryClientProvider>
    </Suspense>
  );
}
