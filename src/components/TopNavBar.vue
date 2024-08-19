<template>
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img :src="imageSrc" alt="My Image" />
        </b-navbar-item>
      </template>
  
      <template #start>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Applicants
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/create' }">
            Add New Applicant
        </b-navbar-item>
      </template>
    </b-navbar>
  </template>
  
  <script>
  import logo from '@/assets/logo.png';
  export default {
    data() {
    return {
      imageSrc: logo,
    };
  },
  };
  </script>
  
  