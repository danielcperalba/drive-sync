import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
  Alert,
} from "react-native";
import { useAuth } from "../../contexts/auth";

import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from "./styles";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [secureText, setSecureText] = useState(true); // Estado para alternar visibilidade da senha
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; senha?: string }>({});

  async function handleSign() {
    // Validação exibida no próprio campo, em vez de um alerta genérico.
    const nextErrors = {
      email: email ? undefined : "Informe seu e-mail.",
      senha: senha ? undefined : "Informe sua senha.",
    };

    if (nextErrors.email || nextErrors.senha) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await signIn(email, senha);
    } catch (error) {
      Alert.alert("Erro", "O login falhou. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Bem vindo(a)!</Text>
          <Text style={styles.subtitle}>Entre com sua conta para continuar.</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="E-mail"
            icon="mail-outline"
            placeholder="seu@email.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            returnKeyType="next"
          />

          <Input
            label="Senha"
            icon="lock-closed-outline"
            placeholder="Sua senha"
            secureTextEntry={secureText} // Controla a visibilidade da senha
            value={senha}
            onChangeText={(text) => {
              setSenha(text);
              if (errors.senha) setErrors((prev) => ({ ...prev, senha: undefined }));
            }}
            error={errors.senha}
            rightIcon={secureText ? "eye-off-outline" : "eye-outline"} // Alterna o ícone
            onRightIconPress={() => setSecureText(!secureText)}
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={handleSign}
          />

          <Button title="Entrar" onPress={handleSign} isLoading={loading} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
