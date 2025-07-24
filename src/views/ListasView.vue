<template>
  <div class="listas-view">
    <h1>Todas as Listas</h1>

    <!-- 5.1 pesquisa -->
  <div class="search-bar"> 
    <span class="search-icon">🔍</span>
      <input
        class="search-input"
        type="text"
        v-model="searchTerm"
        placeholder="Pesquisar listas, descrição ou trarefa..."/>
  </div>

    <div v-if="filteredLists.length">
      <div
        v-for="(lista, idx) in filteredLists"
        :key="idx"
        class="lista-preview"
      >
        <h2>{{ lista.nome }}</h2>
        <p>{{ lista.descricao }}</p>
        <ul>
          <li
            v-for="(t, i) in lista.tarefas.slice(0,3)"
            :key="i"
          >
            • {{ t.texto || t }}
          </li>
        </ul>
      </div>
    </div>
    <p v-else>Nenhuma lista encontrada.</p>
  </div>
</template>

<script>
export default {
  name: 'ListasView',
  data() {
    return {
      searchTerm: ''
    }
  },
  computed: {
    // 5.2 lista filtrada por nome, descrição ou tarefas
    filteredLists() {
      const q = this.searchTerm.trim().toLowerCase()
        if (!q) return this.$root.$data.listas || []  // ou use Vuex/store
          return (this.$root.$data.listas || []).filter(lista => {
        if (lista.nome.toLowerCase().includes(q)) return true
        if (lista.descricao.toLowerCase().includes(q)) return true
          return lista.tarefas.some(t => 
            (t.texto || t).toLowerCase().includes(q) ||
            (t.descricao || '').toLowerCase().includes(q)
        )
      })
    }
  }
}
</script>

<style scoped>

.search-bar {
  max-width: 1480px;
  margin: 16px auto;
  position: relative;
}
.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #555;
}
.search-input {
  box-sizing: border-box;
  width: 100%;
  padding: 14px 20px 14px 44px;
  border: 2px solid #ccc;
  border-radius: 6px;
  font-size: 1.2rem;
  border-radius: 6px;
}

</style>