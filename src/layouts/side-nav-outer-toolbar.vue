<template>
  <div class="default-layout">
    <nav class="navbar">
      <ul>
        <li><router-link to="/">Payment</router-link></li>
        <li>
          <router-link to="/paymentresultreq">Manual Payment Result</router-link>
        </li>
      </ul>
    </nav>

    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background-color: #34495e;
  color: #ecf0f1;
  padding: 10px;
  padding-left: 70px;
  padding-right: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.navbar ul {
  list-style: none;
  padding: 0;
  display: flex;
}

.navbar ul li {
  margin-right: 20px;
}

.navbar a {
  color: #ecf0f1;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
}

.navbar a:hover {
  text-decoration: underline;
}

.content {
  padding: 50px;
  margin-top: 20px;
  background-color: #c6e6ee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>

<script>
export default {
  name: "DefaultLayout",
};
</script>
