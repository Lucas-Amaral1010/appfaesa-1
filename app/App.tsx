import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const App = () => {
  const [texto, setTexto] = useState('Clique no botão para gerar Lorem Ipsum');
  const [historico, setHistorico] = useState([]);

  // Gerador de Lorem Ipsum
  const gerarLoremIpsum = (paragrafos = 1) => {
    const lorem = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl.",
      "Vestibulum auctor dapibus neque.",
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      "Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc.",
      "Quisque euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc.",
      "Sed euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc.",
      "Cras euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc.",
      "Fusce euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc.",
      "Vivamus euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc."
    ];

    let resultado = [];
    for (let i = 0; i < paragrafos; i++) {
      const frasesPorParagrafo = Math.floor(Math.random() * 3) + 2; // 2-4 frases por parágrafo
      const frasesSelecionadas = [];
      
      for (let j = 0; j < frasesPorParagrafo; j++) {
        const randomIndex = Math.floor(Math.random() * lorem.length);
        frasesSelecionadas.push(lorem[randomIndex]);
      }
      
      resultado.push(frasesSelecionadas.join(' '));
    }

    return resultado.join('\n\n');
  };

  const handleGerarTexto = () => {
    const novoTexto = gerarLoremIpsum(Math.floor(Math.random() * 3) + 1); // 1-3 parágrafos
    setTexto(novoTexto);
    setHistorico([...historico, novoTexto]);
  };

  const handleLimparHistorico = () => {
    setHistorico([]);
    setTexto('Histórico limpo. Gere novos textos.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerador de Lorem Ipsum</Text>
      
      <ScrollView style={styles.card}>
        <Text style={styles.texto}>{texto}</Text>
      </ScrollView>

      <View style={styles.botoesContainer}>
        <TouchableOpacity 
          style={styles.botao}
          onPress={handleGerarTexto}
        >
          <Text style={styles.textoBotao}>Gerar Lorem Ipsum</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.botao, styles.botaoLimpar]}
          onPress={handleLimparHistorico}
        >
          <Text style={styles.textoBotao}>Limpar Histórico</Text>
        </TouchableOpacity>
      </View>

      {historico.length > 0 && (
        <View style={styles.historicoContainer}>
          <Text style={styles.subtitulo}>Histórico de textos gerados:</Text>
          <ScrollView style={styles.historicoLista}>
            {historico.map((item, index) => (
              <Text key={index} style={styles.itemHistorico}>
                {`${index + 1}. ${item.split('\n')[0]}...`}
              </Text>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#34495e',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  texto: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 5,
  },
  botaoLimpar: {
    backgroundColor: '#e74c3c',
  },
  textoBotao: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  historicoContainer: {
    flex: 1,
    marginTop: 10,
  },
  historicoLista: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  itemHistorico: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color: '#555',
  },
});

export default App;