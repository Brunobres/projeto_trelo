<template> 
<div>
  <!-- Navbar (adicionar depois-->
  <h1>Minhas listas</h1>

  <div v-if="listas.length > 0">
    <div class="cards-container">
      <div v-for="(lista, idx) in listas.slice(-3)" :key="idx" class="card">
        <h2>{{ lista.nome }}</h2>
        <p class="preview-descricao">{{ lista.descricao }}</p>
        <ul>
          <li v-for="(t, i) in lista.tarefas.slice(0,4)" :key="i" class="card" >
            <span  :style="{ textDecoration: t.concluida ? 'line-through' : 'none' }">
              {{ t.texto || t }}
            </span>
          </li>
        </ul>
      </div>

      <button @click="abrirLista(idx)">Abrir lista</button>
      <button @click="removerLista(idx)">Apagar lista</button>
    </div>
  </div>

    <!-- Botao pra abrir modal-->
    <button @click="abrirModal">Adicionar nova lista</button>

  <!-- Modal de visualização -->
  <ModalAbrirLista 
    v-if="showOpenModal && listaSelecionadaIdx !== null"
    :visible="showOpenModal"
    :lista="listas[listaSelecionadaIdx]"
    @cancel="fecharOpenModal"
    @edit="onEditFromOpen"
  />

    <!-- Modal para criar nova lista -->
  <AddNovaLista
    :visible="mostrarModal"
    @save="salvarLista"
    @cancel="fecharModal"
  />

  <!-- Modal de edição -->
  <ModalEditarLista 
    v-if="showEditModal && listaSelecionadaIdx !== null"
    :visible="showEditModal"
    :lista="listas[listaSelecionadaIdx]"
    @save-edited="salvarEdicao"
    @cancel="fecharEditModal"
   />

</div>
</template>

<script>
import ListaTarefas from '../components/ListaTarefas.vue'
import AddNovaLista from '../components/AddNovaLista.vue'; 
import ListaTasks from '../components/ListaTasks.vue'
import ModalEditarLista from '../components/ModalEditarLista.vue'
import ModalAbrirLista from '../components/ModalAbrirLista.vue'

export default {
  name: "HomeView",
  components: {
    AddNovaLista,
    ListaTasks,
    ModalEditarLista,
    ListaTarefas,
    ModalAbrirLista
  },
    data() {
      return{
        listas: [],
        mostrarModal: false,
        showOpenModal: false,
        showEditModal: false,
        listaSelecionadaIdx: null,
      }
    },
    methods: {
      // abre o modal de criação
      abrirModal() {
        this.mostrarModal = true;
      },
      //abre o modal de visualização
      abrirLista(idx) {
        this.listaSelecionadaIdx = idx;
        this.showOpenModal = true;
      },
      //abrir modal de edição
      abrirEditarLista(idx) {
        this.listaSelecionadaIdx = idx;
        this.showEditModal = true;
      },
      // fecha os modais
      fecharModal() {
        this.mostrarModal = false;
      },
      fecharOpenModal() {
        this.showOpenModal = false;
      },  
      fecharEditModal() {
        this.showEditModal = false;
        this.showOpenModal = true;
      },
      salvarLista(listaNova) {
        // logica de salvar lista inteira
        this.listas.push(listaNova);
        this.fecharModal();
      },
      salvarEdicao(edited) {
        this.listas.splice(this.listaSelecionadaIdx, 1, edited);
        this.showEditModal = false;
        this.showOpenModal = true;
      },
      onEditFromOpen() {
        this.showOpenModal = false;
        this.showEditModal = true;
      },
      // ① remove uma lista após confirmação
      removerLista(idx) {
        const confirma = window.confirm("Deseja mesmo apagar esta lista?");
        if (!confirma) return;
        this.listas.splice(idx, 1);
      },

    }
  };
</script>

<style scoped >

.cards-container {
  display: flex;
  gap: 16px;         
  flex-wrap: wrap;    
}
.card {
  background: #f0f0f0 ;          /* azul bem suave */
  border-radius: 8px;
  padding: 16px;
  flex: 1;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.card ul {
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
}
.card li {
  margin-bottom: 4px;
}

</style>
