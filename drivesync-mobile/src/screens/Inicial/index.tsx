import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '../../components/Button';
import theme from '../../theme';
import styles from './styles';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require('../../assets/SignIn2.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.content,
            { paddingBottom: insets.bottom + theme.SPACING.XL },
          ]}
        >
          <Text style={styles.title}>Controle sua rotina de viagens com o DriveSync</Text>
          <Text style={styles.subtitle}>
            Partidas, chegadas e checklist do veículo registrados em um só lugar.
          </Text>

          <Button
            title="Continuar"
            iconRight="arrow-forward"
            onPress={() => navigation.navigate('Login')}
            style={styles.action}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default OnboardingScreen;
