import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import BisoLogo from '../../assets/B-iso.svg';

interface BridgestoneLogoProps {
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export default function Logo({ size = 'medium', style }: BridgestoneLogoProps) {
  const logoStyle = {
    small: { width: 60, height: 60 },
    medium: { width: 80, height: 80 },
    large: { width: 100, height: 100 },
  };

  return (
    <View style={[styles.container, style]}>
      <BisoLogo 
        width={logoStyle[size].width} 
        height={logoStyle[size].height} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});