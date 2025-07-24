<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <h2>{{ lista.nome }}</h2>
      <p>{{ lista.descricao }}</p>

      <select v-model="filtro">
        <option value="todas">Todas</option>
        <option value="pendentes">Pendentes</option>
        <option value="concluidas">Concluídas</option>
      </select>

      <!-- Gerenciamento de tarefas com checkboxes e ação de concluir -->
      <ul>
        <li
          v-for="(tarefa, i) in tarefasFiltradas"
         :key="i">
         <div>
           <input type="checkbox" v-model="tarefa.selecionada" />
           <span>
             {{ tarefa.texto }}
           </span>
         </div>
         <!-- Aqui mostramos a descrição da tarefa -->
         <p>
           {{ tarefa.descricao }}
         </p>
       </li>
      </ul>
      <div class="actions">
        <button 
          @click="marcarSelecionadasConcluidas"
          :disabled="!anyPendentesSelected">
          Marcar como concluido
        </button>
        <button 
        @click="desmarcarSelecionadas"
        :disabled="!anyConcluidasSelected">
        Desmarcar concluidas
        </button>
        <button 
        @click="$emit('edit')">
        Editar lista
        </button>
        <button class="close-button" @click="$emit('cancel')">✕</button>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ModalAbrirLista',
  props: { 
    visible: { type: Boolean, required: true },
    lista: { type: Object, required: true }
    },
  emits: ['cancel', 'edit'],
    data() {
      return {filtro: 'todas' };
    },
  watch: {
    visible(newVal) {
      if (newVal) this.filtro = 'todas';
    }
  },
  computed: {
    anySelected() {
      return this.lista.tarefas.filter(t => t.selecionada);
    },
    anyPendentesSelected() {
      return this.lista.tarefas.some(t => t.selecionada && !t.concluida);
    },
    anyConcluidasSelected() {
      return this.lista.tarefas.some(t => t.selecionada && t.concluida);
    },
      tarefasFiltradas() {
        return this.lista.tarefas.filter(t => {
          if (this.filtro === 'pendentes') return !t.concluida;
          if (this.filtro === 'concluidas') return t.concluida;
          return true;
        });
    }
  },
  methods: {
    marcarSelecionadasConcluidas() {
      this.lista.tarefas.forEach(t => {
        if (t.selecionada) {
          t.concluida = true;
          t.selecionada = false;
        }
      });
    },
    desmarcarSelecionadas() {
      this.lista.tarefas.forEach(t => {
        if (t.selecionada && t.concluida) {
          t.concluida = false;
          t.selecionada = false;
        }
      });
    },
  }
};
</script>

<style>

</style>
