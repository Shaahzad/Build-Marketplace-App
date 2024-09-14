import { View, Text, Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { useWarmUpBrowser } from '../../hooks/WarmupBrowser'
import { useOAuth } from '@clerk/clerk-expo'

WebBrowser.maybeCompleteAuthSession()
export default function Loginscreen() {
 

   useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })


    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow()
    
          if (createdSessionId) {
            setActive({ session: createdSessionId })
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error('OAuth error', err)
        }
      }, [])
  
  return (
    <View>
      <Image source={require('./../../assets/E-commerce.png')}
       className="h-[400px] w-full object-cover"/>
        <View className="p-8 bg-slate-300 mt-[-20px] rounded-t-3xl">
        <Text className="text-[25px] font-bold">Community Marketplace</Text>
        <Text className="text-[16px] text-slate-500 mt-6">Buy Sell Marketplace Where You Can sell old item and make real money</Text>
        <TouchableOpacity onPress={onPress} className="p-4 bg-blue-500 rounded-full mt-20">
            <Text className="text-white text-center font-bold text-[16px]">Get Started</Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}