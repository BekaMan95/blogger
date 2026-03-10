import { TextInput, StyleSheet, type TextInputProps } from 'react-native';
import { useThemeColor } from '../../app/hooks';

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'default' | 'outlined' | 'filled';
};

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  variant = 'default',
  ...rest
}: ThemedInputProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'text'
  );

  return (
    <TextInput
      style={[
        { color: textColor, backgroundColor },
        variant === 'default' ? styles.default : undefined,
        variant === 'outlined' ? styles.outlined : undefined,
        variant === 'filled' ? styles.filled : undefined,
        style,
      ]}
      placeholderTextColor={variant === 'filled' ? '#888' : '#aaa'}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    fontFamily: 'georgia',
  },
  outlined: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    fontSize: 16,
    fontFamily: 'georgia',
  },
  filled: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
    fontFamily: 'georgia',
  },
});
