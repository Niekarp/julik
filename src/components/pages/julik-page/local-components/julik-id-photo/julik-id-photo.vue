<template>
  <div class="julik-id-photo" :class="{ 'julik-id-photo--horror': horrorTheme }" >
    <img class="julik-id-photo__photo"
        :class="{ 'fade-in': horrorTheme, 'julik-id-photo__photo--horror': horrorTheme, 'julik-id-photo__photo--normal': !horrorTheme }" 
        :src="julikImgUrl" 
        alt="julik dog standing hopefully" 
        ref="julikImg"
        v-on:click="woofAndShake($event); countWoofs()" 
    />
    <div    v-if="!horrorTheme"  class="julik-id-photo__settings" v-on:click="openDialog">⚙</div>
    <button v-show="horrorTheme" class="julik-id-photo__wola-retro-button" v-on:click="notifyParent">
      ollaf
    </button>
  </div>
</template>

<script src="./julik-id-photo.ts"   module lang="ts"></script>
<style  src="./julik-id-photo.scss" scoped lang="scss"></style>
