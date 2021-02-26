<template>
  <aside class="navbar">
    <div class="navbar__tab" :class="{ 'navbar__tab--active': activeTab === 0 }" v-on:click="scrollToTarget(0)">🎉</div>
    <div class="navbar__tab" :class="{ 'navbar__tab--active': activeTab === 1 }" v-on:click="scrollToTarget(1)">🐶</div>
    <div class="navbar__tab" :class="{ 'navbar__tab--active': activeTab === 2 }" v-on:click="scrollToTarget(2)">💰</div>
  </aside>
</template>

<script src="./navbar.ts"   module lang="ts"></script>
<style  src="./navbar.scss" scoped lang="scss"></style>
