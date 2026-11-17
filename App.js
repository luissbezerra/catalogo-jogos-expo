import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  ActivityIndicator, 
  SafeAreaView, 
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default function App() {
  const [jogos, setJogos] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Consome a API pública FreeToGame
  const buscarJogos = async () => {
    try {
      const resposta = await fetch('https://www.freetogame.com/api/games');
      if (!resposta.ok) {
        throw new Error('Não foi possível carregar a lista de jogos.');
      }
      const json = await resposta.json();
      setJogos(json);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarJogos();
  }, []);

  // Filtra os jogos pelo título ou género; se a busca estiver vazia, mostra os 30 primeiros
  const jogosFiltrados = busca.trim() === '' 
    ? jogos.slice(0, 30) 
    : jogos.filter((jogo) => {
        const termo = busca.toLowerCase();
        return (
          jogo.title.toLowerCase().includes(termo) ||
          jogo.genre.toLowerCase().includes(termo)
        );
      });

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#6c5ce7" />
        <Text style={styles.textoInfo}>A carregar catálogo de jogos...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.textoErro}>Ops! {erro}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Text style={styles.titulo}>Catálogo de Jogos Gratuitos</Text>

      {/* Barra de Pesquisa */}
      <View style={styles.containerBusca}>
        <TextInput
          style={styles.inputBusca}
          placeholder="Pesquisar por nome ou género..."
          placeholderTextColor="#888888"
          value={busca}
          onChangeText={setBusca}
          autoCorrect={false}
        />
        {busca.length > 0 && (
          <TouchableOpacity onPress={() => setBusca('')} style={styles.botaoLimpar}>
            <Text style={styles.textoLimpar}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        data={jogosFiltrados}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.lista}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={styles.textoVazio}>
            Nenhum jogo encontrado para "{busca}".
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image 
              source={{ uri: item.thumbnail }} 
              style={styles.capa} 
              resizeMode="cover"
            />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.title}</Text>
              <View style={styles.badges}>
                <Text style={styles.badge}>{item.genre}</Text>
                <Text style={styles.badgePlataforma}>{item.platform}</Text>
              </View>
              <Text style={styles.descricao} numberOfLines={2}>
                {item.short_description}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  centro: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  containerBusca: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e26',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#2d3436',
  },
  inputBusca: {
    flex: 1,
    height: 46,
    color: '#ffffff',
    fontSize: 15,
  },
  botaoLimpar: {
    padding: 6,
  },
  textoLimpar: {
    color: '#b2bec3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#1e1e26',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  capa: {
    width: '100%',
    height: 170,
  },
  info: {
    padding: 14,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#6c5ce7',
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgePlataforma: {
    backgroundColor: '#2d3436',
    color: '#dfe6e9',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  descricao: {
    fontSize: 14,
    color: '#b2bec3',
    lineHeight: 20,
  },
  textoInfo: {
    marginTop: 12,
    fontSize: 16,
    color: '#dfe6e9',
  },
  textoErro: {
    fontSize: 16,
    color: '#ff7675',
    textAlign: 'center',
  },
  textoVazio: {
    color: '#b2bec3',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});