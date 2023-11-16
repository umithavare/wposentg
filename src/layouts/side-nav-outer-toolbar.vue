<template>
  <div class="default-layout">
    <nav>
      <ul>
        <li><router-link to="/">Payment</router-link></li>
        <li>
          <router-link to="/paymentresultreq"
            >Payment-Result-Manuel</router-link
          >
        </li>
      </ul>
    </nav>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

nav {
  background-color: #c6ddc9;
  color: #da3a3a;
  padding: 10px;
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
}

nav ul li {
  margin-right: 20px;
}

main {
  flex-grow: 1;
  padding: 20px;
}
</style>
