<script>
import TopNavBar from './components/TopNavBar.vue';
export default {
  components: {
    TopNavBar
  }
};
</script>

<template>
  <main>
    <div class="container">
      <div class="columns">
        <div class="column">
          <TopNavBar/>
        </div>
      </div>
      <div class="columns">
        <div class="column">
            <h3>SOCIAL ASSISTANCE FUND</h3>
        </div>
    </div>
      <div class="columns">
        <div class="column">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </main>
</template>

