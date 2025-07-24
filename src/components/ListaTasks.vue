<template>
    <div class="lista-tasks">
        <h3>{{ lista.nome }}</h3>
        <p>{{lista.descricao }}</p>
        <ul>
            <li v-for="(tarefa, index) in lista.tarefas" :key="index">{{ tarefa }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ListaTasks',
    props: {
        lista: {
            type: Object,
            required: true
        }
    }
}
</script>