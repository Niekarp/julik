<template>
  <div>
    <h2>Pokarm</h2>
    <p>Jedzenie które Julik zajada sie (<a v-on:click="addFood" href="javascript:void(0)" title="dodaj jedzonko">znasz jeszcze jakies?</a>)</p>
    <ul>
      <li v-for="food in foodList" :key="food.id" class="food-list__listitem" :class="{ 'food-list__listitem--horror': horrorTheme }">
        <a v-if="food.url" :href="food.url" class="food-list__food-link"> {{ food.name }} </a>
        <span v-else> {{ food.name }} </span>
      </li>
    </ul>
    <p>I inne rzeczy od taty</p>
  </div>
</template>

<script src="./food-list.ts"   module lang="ts"></script>
<style  src="./food-list.scss" scoped lang="scss"></style>
