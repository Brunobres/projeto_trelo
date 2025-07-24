<template>
  <div>
    <!-- Mesmo comportamento de filtragem do componente original -->
    <select v-if="showFilter" v-model="filtro">
      <option value="todas">Todas</option>
      <option value="pendentes">Pendentes</option>
      <option value="concluidas">Concluídas</option>
    </select>

    <!-- Botão remover apenas (não marcar como concluída) -->
    <button @click="removerSelecionadas" :disabled="!algumaSelecionada">
      Remover selecionadas
    </button>

    <ul>
      <li v-for="(tarefa, index) in tarefasFiltradas" :key="index">
        <input type="checkbox" v-model="tarefa.selecionada" />
        <span>{{ tarefa.texto }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  tarefas: { type: Array, required: true },
  showFilter: { type: Boolean, default: true }
})

// filtro
const filtro = ref('todas')

// seleção global
const algumaSelecionada = computed(() =>
  props.tarefas.some(t => t.selecionada)
)

// tarefas filtradas
const tarefasFiltradas = computed(() =>
  props.tarefas.filter(t => {
    if (filtro.value === 'pendentes') return !t.concluida
    if (filtro.value === 'concluidas') return t.concluida
    return true
  })
)

// remover selecionadas
const removerSelecionadas = () => {
  for (let i = props.tarefas.length - 1; i >= 0; i--) {
    if (props.tarefas[i].selecionada) {
      props.tarefas.splice(i, 1)
    }
  }
}
</script>

<style scoped>

</style>

