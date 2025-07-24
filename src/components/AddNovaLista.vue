<template>
    <div v-if="visible" class="modal-overlay">
        <div class="modal">
            <h2>Nova lista</h2>

            <label>Nome:</label>
            <input type="text" v-model="novaLista.nome" />

            <label>Descrição:</label>
            <textarea v-model="novaLista.descricao">Descrição</textarea>

            <label>Tarefa:</label>
            <input type="text" v-model="novaTarefa" @keydown.enter.prevent="adicionarTarefa" placeholder="Digite uma tarefa">

            <label>Descrição da tarefa:</label>
            <textarea v-model="novaDescricao" @keydown.enter.prevent="adicionarTarefa" placeholder="Descreva esta tarefa"></textarea>

            <button @click="adicionarTarefa" :disabled="!novaTarefa.trim()">Adicionar tarefa</button>
                <ul>
                    <li v-for="(task, i) in novaLista.tarefas" :key="i" >
                        <strong>{{ task.texto }}</strong>
                        <p class="task-desc">{{ task.descricao }}</p>
                    </li>
                </ul>

        <ListaTarefasreRemoveOnly :tarefas="novaLista.tarefas" :showFilter="false" />

            <button @click="onSave">Salvar</button>
            <button @click="onCancel">Cancelar</button>
         </div>
    </div>
</template>

<script>
import ListaTarefasRemoveOnly from './ListaTarefasRemoveOnly.vue'

export default {
    name: 'AddNovaLista',
    components: { ListaTarefasRemoveOnly },
    props: {
        visible: { type: Boolean, required: true }
    },
    emits: ['save', 'cancel'],
    data() {
        return {
            novaLista: {
                nome: '', 
                descricao: '',
                tarefas: []
            },
            novaTarefa: '',
            novaDescricao: ''
        };
    },

    methods: {
        onSave() {
            // antes dfe emitir, opcionalmente valide nome e descrição
            this.$emit('save', { ...this.novaLista });
            // limpa os campos internos
            this.novaLista = { nome: '', descricao: '', tarefas: [] };
        },
        onCancel() {
            this.$emit('cancel');
            this.novaLista = { nome: '', descricao: '', tarefas: [] };
        },
        adicionarTarefa() {
            const texto = this.novaTarefa.trim();
            if (!texto) return;
            this.novaLista.tarefas.push({
                texto,
                descricao: this.novaDescricao.trim(),
                selecionada: false,
                concluida: false
            });
            this.novaTarefa = '';
            this.novaDescricao = '';
        }
    },
};
</script>