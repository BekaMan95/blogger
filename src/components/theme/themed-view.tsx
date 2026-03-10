import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '../../app/hooks';


export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ 
    backgroundColor, 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100%' 
  }, style]} {...otherProps} />;
}
