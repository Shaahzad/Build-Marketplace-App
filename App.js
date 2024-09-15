import { StyleSheet, Text, View } from 'react-native';
import Loginscreen from './Apps/screens/Loginscreen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import Tabnavigation from './Apps/Navigation/Tabnavigation';

export default function App() {
  const publishkey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
  return (
    <ClerkProvider publishableKey={publishkey}>
    <View className="flex-1 bg-slate-300">
      <SignedIn>
        <NavigationContainer>
          <Tabnavigation/>
        </NavigationContainer>
      </SignedIn>
      <SignedOut>
      <Loginscreen/>
      </SignedOut>
    </View>
    </ClerkProvider>
  );
}

