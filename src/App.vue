<script>
import MainForm from './components/MainForm.vue';
import MainList from './components/MainList.vue';
import TopNavBar from './components/TopNavBar.vue';

export default {
  components: {
    MainForm,
    MainList,
    TopNavBar
  },

  data() {
    return {
      users: [],
      error: null,
    };
  },
  async created() {
    
  }
};
</script>

<template>
  <div class="columns">
    <div class="column">
      <TopNavBar/>
    </div>
  </div>
  <div class="columns container">
    <div class="column">
      <MainForm/>
    </div>
  </div>
</template>

