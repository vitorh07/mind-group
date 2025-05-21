import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [tela, setTela] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000); // 5 segundos
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require('./assets/splash.png')} style={styles.splashImage} resizeMode="cover" />
      </View>
    );
  }

  // Telas após a splash
  if (tela === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Bem-vindo de volta!</Text>
        <Text style={styles.texto}>Acesse sua conta para acompanhar artigos exclusivos, favoritar e muito mais.</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
        />
        <Button title="Ir para Tela 2" onPress={() => setTela(2)} />
        <StatusBar style="auto" />
      </View>
    );
  }

  if (tela === 2) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Esqueci a senha</Text>
        <Text style={styles.texto}>Sem problemas! Informe seu e-mail e enviaremos um link para redefinir sua senha.</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Nova Senha"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar nova senha"
          secureTextEntry
        />
        <Button title="Ir para Tela 3" onPress={() => setTela(3)} />
        <Button title="Voltar para Tela 1" onPress={() => setTela(1)} />
        <StatusBar style="auto" />
      </View>
    );
  }

  if (tela === 3) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Registrar</Text>
        <Text style={styles.texto}>Crie sua conta para explorar conteúdos incríveis, seguir autores e participar da comunidade.</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          secureTextEntry
        />
        <Button title="Voltar para Tela 2" onPress={() => setTela(2)} />
        <StatusBar style="auto" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  texto: {
    fontSize: 12,
    marginBottom: 20,
    width: '80%',
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
});