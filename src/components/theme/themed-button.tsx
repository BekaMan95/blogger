import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';
import { useThemeColor } from '../../app/hooks';
import { ThemedText } from './themed-text';

export type ThemedButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  title?: string;
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  variant = 'primary',
  title,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'buttonBackground'
  );
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'buttonText'
  );

  return (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor },
        variant === 'primary' ? styles.primary : undefined,
        variant === 'secondary' ? styles.secondary : undefined,
        variant === 'outline' ? styles.outline : undefined,
        pressed && { opacity: 0.7 },
        style,
      ]}
      {...rest}
    >
      <ThemedText
        style={[
          styles.text,
          variant === 'outline' ? { color: '#2196F3' } : undefined,
        ]}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#2196F3',
  },
  secondary: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  outline: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2196F3',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
