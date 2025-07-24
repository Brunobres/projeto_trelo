<template>
  <div id="app">   <!-- opcional, se tiver um componente de Navbar -->
        <!-- 3.1 Navbar -->
    <nav class="navbar">
      <div class="navbar__menu">
        <router-link to="/" >Home</router-link>
        <span class="navbar__sep">|</span>
        <router-link to="/listas" >Listas</router-link>
      </div>
    </nav>
    <main class="main-content">
      <router-view /> 
    </main>
    <footer class="footer">© 2025 Bruno Brescianini • Todos os direitos reservados</footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 1) Full height para html, body e #app */
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  background: #f9fafe;
  font-family: Arial, sans-serif;
}

/* 2) Flex container em coluna: navbar + main + footer */
#app {
  display: flex;
  flex-direction: column;
}

/* 3) main-content vai crescer para ocupar o espaço entre navbar e footer */
.main-content {
  flex: 1;
  overflow: auto;
  padding: 16px;
}

/* Navbar */
.navbar {
  width: 100%;
  background: #111;
  padding: 20px 0;
}
.navbar__menu {
  max-width: 800px;
  margin: 0 auto;
  color: white;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
}
.navbar__menu a {
  color: white;
  text-decoration: none;
}
.navbar__sep {
  margin: 0 12px;
  color: #555;
}

/* Footer fixado ao pé pelo flex do #app */
.footer {
  width: 100%;
  background: #111;
  color: #ccc;
  text-align: center;
  padding: 20px 0;
}
</style>
