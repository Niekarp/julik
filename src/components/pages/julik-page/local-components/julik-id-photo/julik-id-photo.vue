<template>
  <div class="julik-id-photo">
    <img class="julik-id-photo__photo" 
        :class="{ 'fade-in': horrorTheme, 'julik-id-photo__photo--horror': horrorTheme }" 
        :src="julikImgUrl" 
        alt="julik dog standing hopefully" 
        ref="julikImg"
        v-on:click="woofAndShake($event); countWoofs()" 
    />
    <button v-show="horrorTheme" class="julik-id-photo__wola-retro-button" v-on:click="notifyParent">
      ollaf
    </button>
  </div>
</template>

<script src="./julik-id-photo.mjs"  module></script>
<style  src="./julik-id-photo.scss" scoped lang="scss"></style>
