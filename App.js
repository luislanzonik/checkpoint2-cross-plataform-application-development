import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function App() {
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("1");
  const [lista, setLista] = useState([]);

  function adicionarProduto() {
    if (produto.trim() === "") {
      return;
    }

    const novoProduto = {
      id: Date.now().toString(),
      nome: produto,
      quantidade: Number(quantidade) || 1,
    };

    setLista([...lista, novoProduto]);

    setProduto("");
    setQuantidade("1");
  }

  function aumentarQuantidade(id) {
    const novaLista = lista.map((item) =>
      item.id === id
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
    );

    setLista(novaLista);
  }

  function diminuirQuantidade(id) {
    const novaLista = lista.map((item) =>
      item.id === id && item.quantidade > 1
        ? { ...item, quantidade: item.quantidade - 1 }
        : item
    );

    setLista(novaLista);
  }

  function excluirProduto(id) {
    const novaLista = lista.filter((item) => item.id !== id);

    setLista(novaLista);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minha Lista de Compras</Text>

      <Text style={styles.subtitulo}>
        Adicione os produtos que precisa comprar
      </Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.inputProduto}
          placeholder="Nome do produto"
          value={produto}
          onChangeText={setProduto}
        />

        <TextInput
          style={styles.inputQuantidade}
          placeholder="Qtd"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={adicionarProduto}
        >
          <Text style={styles.textoBotaoAdicionar}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>
            Sua lista ainda está vazia.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.dadosProduto}>
              <Text style={styles.nomeProduto}>{item.nome}</Text>

              <Text style={styles.quantidadeTexto}>
                Quantidade: {item.quantidade}
              </Text>
            </View>

            <View style={styles.botoes}>
              <TouchableOpacity
                style={styles.botaoQuantidade}
                onPress={() => diminuirQuantidade(item.id)}
              >
                <Text style={styles.textoQuantidade}>-</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoQuantidade}
                onPress={() => aumentarQuantidade(item.id)}
              >
                <Text style={styles.textoQuantidade}>+</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoExcluir}
                onPress={() => excluirProduto(item.id)}
              >
                <Text style={styles.textoExcluir}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 30,
    paddingTop: 60,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subtitulo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
  },

  formulario: {
    flexDirection: "row",
    marginBottom: 25,
    gap: 10,
  },

  inputProduto: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },

  inputQuantidade: {
    width: 70,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    textAlign: "center",
  },

  botaoAdicionar: {
    backgroundColor: "#2009f5",
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 8,
  },

  textoBotaoAdicionar: {
    color: "#fff",
    fontWeight: "bold",
  },

  listaVazia: {
    textAlign: "center",
    marginTop: 40,
    color: "#888",
    fontSize: 16,
  },

  item: {
    backgroundColor: "#fff",
    padding: 18,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dadosProduto: {
    flex: 1,
  },

  nomeProduto: {
    fontSize: 18,
    fontWeight: "bold",
  },

  quantidadeTexto: {
    color: "#666",
    marginTop: 4,
  },

  botoes: {
    flexDirection: "row",
    gap: 8,
  },

  botaoQuantidade: {
    width: 38,
    height: 38,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },

  textoQuantidade: {
    fontSize: 20,
    fontWeight: "bold",
  },

  botaoExcluir: {
    backgroundColor: "#d32f2f",
    paddingHorizontal: 12,
    justifyContent: "center",
    borderRadius: 6,
  },

  textoExcluir: {
    color: "#fff",
    fontWeight: "bold",
  },
});