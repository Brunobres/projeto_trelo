<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <h2>Editar Lista</h2>

      <label>Nome:</label>
      <input type="text" v-model="listaEdit.nome" />

      <label>Descrição:</label>
      <textarea v-model="listaEdit.descricao" placeholder="Descreva sua lista"></textarea>

      <label>Tarefa:</label>
      <input type="text" v-model="novaTarefa" @keydown.enter.prevent="adicionarTarefa" placeholder="Nova tarefa">
      <button @click="adicionarTarefa" :disabled="!novaTarefa.trim()">Adicionar tarefa</button>

     <ul>
       <li
         v-for="(tarefa, i) in listaEdit.tarefas"
         :key="i">
         <!-- checkbox para seleção/removal, se quiser manter -->
         <input type="checkbox" v-model="tarefa.selecionada" />

         <!-- texto fixo da tarefa -->
         <strong>{{ tarefa.texto }}</strong>

         <!-- edição de descrição -->
         <div v-if="tarefa.editandoDescricao">
           <textarea
             v-model="tarefa.descricao"
             rows="2"
           ></textarea>
           <button @click="tarefa.editandoDescricao = false">
             Salvar
           </button>
         </div>
         <div>
           <p>{{ tarefa.descricao }}</p>
           <button @click="tarefa.editandoDescricao = true">
             Editar
           </button>
         </div>
       </li>
     </ul>

      <div class="actions">
        <button @click="onSave">Salvar alterações</button>
        <button @click="removerSelecionadas" :disabled="!anySelected">Remover selecionadas</button>
        <button @click="$emit('cancel')">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import ListaTarefasRemoveOnly from '@/components/ListaTarefasRemoveOnly.vue';

export default {
  name: 'ModalEditarLista',
  components: { ListaTarefasRemoveOnly },
  props: {
    visible: { type: Boolean, required: true },
    lista:   { type: Object,  required: true }
  },
  emits: ['save-edited','cancel'],
  data() {
    return {
      listaEdit: JSON.parse(JSON.stringify(this.lista)),
      novaTarefa: ''
    };
  },
  watch: {
    lista(newVal) {
      this.listaEdit = JSON.parse(JSON.stringify(newVal));
    }
  },
  computed: {
    anySelected() {
      return this.listaEdit.tarefas.some(t => t.selecionada);
    }
  },
  methods: {
    adicionarTarefa() {
      const texto = this.novaTarefa.trim();
      if (!texto) return;
      this.listaEdit.tarefas.push({
        texto,
        descricao: '',
        selecionada: false,
        concluida: false,
        editandoDescricao: true,
      });
      this.novaTarefa = ''
    },
    removerSelecionadas() {
      this.listaEdit.tarefas = this.listaEdit.tarefas.filter(
        t => !t.selecionada
      );
    },
    onSave() {
      this.$emit('save-edited', this.listaEdit);
    },
  }
};
</script>

<style scoped>

</style>
