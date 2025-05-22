import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [tela, setTela] = useState(1);

  // Estados para registro
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [historico, setHistorico] = useState([1]);

  // Funções de navegação
  const navegarPara = (novaTela: number) => {
    setHistorico((prev) => [...prev, novaTela]);
    setTela(novaTela);
  };

  const voltar = () => {
    setHistorico((prev) => {
      if (prev.length > 1) {
        const novoHistorico = prev.slice(0, -1);
        setTela(novoHistorico[novoHistorico.length - 1]);
        return novoHistorico;
      }
      return prev;
    });
  };

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
        <Text style={styles.href} onPress={() => navegarPara(2)}>Esqueceu a senha?</Text>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navegarPara(4)}
        >
          <Text style={styles.textoBotao}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.href2} onPress={() => navegarPara(3)}>Novo usuário? Clique aqui</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (tela === 2) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.voltar} onPress={voltar}>
          <Ionicons name="arrow-back" size={40} color="#333" />
        </TouchableOpacity>
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
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navegarPara(3)}
        >
          <Text style={styles.textoBotao}>Alterar</Text>
        </TouchableOpacity>
        <Text style={styles.href2} onPress={() => navegarPara(3)}>Novo usuário? Clique aqui</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (tela === 3) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.voltar} onPress={voltar}>
          <Ionicons name="arrow-back" size={40} color="#333" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Registrar</Text>
        <Text style={styles.texto}>Crie sua conta para explorar conteúdos incríveis, seguir autores e participar da comunidade.</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navegarPara(4)}
        >
          <Text style={styles.textoBotao}>Registrar</Text>
        </TouchableOpacity>
        <Text style={styles.href2} onPress={() => navegarPara(3)}>Já tem cadastro? Clique aqui</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (tela === 4) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.voltar} onPress={voltar}>
          <Ionicons name="arrow-back" size={40} color="#333" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Meu Perfil</Text>
        <Image
          source={require('./assets/avatar.png')}
          style={styles.avatar}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
        <TouchableOpacity
          style={styles.botao}
        >
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>
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
  titulo: {
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
  voltar: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  botao: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    width: '65%',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  href: {
    color: '#000',
    fontSize: 12,
    marginBottom: 20,
    width: '65%',
    textAlign: 'right',
  },
  href2: {
    color: '#000',
    fontSize: 12,
    marginBottom: 20,
    width: '65%',
    textAlign: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});