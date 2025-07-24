<template>
  <div>
    <input type="text" placeholder="Digite a tarefa" v-model="novaTarefa" @keydown.enter.prevent="adicionarTarefa" />
    <button @click="adicionarTarefa" :disabled="!novaTarefa.trim()">
      Adicionar
      </button>

    <select v-model="filtro">
      <option value="todas">Todas</option>
      <option value="pendentes">Pendentes</option>
      <option value="concluidas">Concluídas</option>
    </select>

    <button @click="marcarComoConcluidas" :disabled="!algumaSelecionada">Marcar como concluídas</button>
    <button @click="removerSelecionadas" :disabled="!algumaSelecionada">Remover selecionadas</button>

    <ul>
      <li v-for="(tarefa, index) in tarefasFiltradas" :key="index">
        <input type="checkbox" v-model="tarefa.selecionada" />
        <span>{{ tarefa.texto }}</span>

        <div v-if="tarefa.editandoDescricao">
            <textarea v-model="tarefa.descricao"></textarea>
            <button @click="tarefa.editandoDescricao = false">Salvar</button>
        </div>
        <div v-else>
            <p>{{ tarefa.descricao }}</p>
            <button @click="tarefa.editandoDescricao = true">Editar</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const novaTarefa = ref('')
const filtro = ref('todas')
const props = defineProps ({
  tarefas: {
    type: Array,
    required: true
  }
})

const adicionarTarefa = () => {
  const texto = novaTarefa.value.trim()
  if (!texto) return

  props.tarefas.push({
    texto: novaTarefa.value.trim(),
    descricao: '',
    selecionada: false,
    concluida: false,
    editandoDescricao: false
  })

  novaTarefa.value = ''
}

const tarefasFiltradas = computed(() => {
  return props.tarefas.filter(tarefa => {
    if (filtro.value === 'pendentes') return !tarefa.concluida
    if (filtro.value === 'concluidas') return tarefa.concluida
    return true
  })
})

const algumaSelecionada = computed(() => 
  props.tarefas.some(t => t.selecionada)
)

const marcarComoConcluidas = () => {
  props.tarefas.forEach(tarefa => {
    if (tarefa.selecionada) {
      tarefa.concluida = true
      tarefa.selecionada = false
    }
  })
}

const removerSelecionadas = () => {
  const filtradas = props.tarefas.filter(tarefa => !tarefa.selecionada)
  props.tarefas.splice(0, props.tarefas.length, ...filtradas)
}
</script>
