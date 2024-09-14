import { StyleSheet, Text, View } from 'react-native';
import Loginscreen from './Apps/screens/Loginscreen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';

export default function App() {
  const publishkey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
  return (
    <ClerkProvider publishableKey={publishkey}>
    <View className="flex-1 bg-slate-300">
      <SignedIn>
        <Text className="mt-10">Hello</Text>
      </SignedIn>
      <SignedOut>
      <Loginscreen/>
      </SignedOut>
    </View>
    </ClerkProvider>
  );
}

