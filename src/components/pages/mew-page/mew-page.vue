<template>
  <div>
    <div class="mew">
      <div class="mew__letter">
        <div class="stick" :class="{ 'stick--left': letterShow }"></div>
        <div class="stick" :class="{ 'stick--right': letterShow }"></div>
        <div class="stick" :class="{ 'stick--left': letterShow }"></div>
        <div class="stick" :class="{ 'stick--right': letterShow }"></div>
      </div>
      <div class="mew__letter">
        <div class="stick" :class="{ 'stick--top': letterShow }"></div>
        <div class="stick" :class="{ 'stick--vert1': letterShow }"></div>
        <div class="stick" :class="{ 'stick--vert2': letterShow }"></div>
        <div class="stick" :class="{ 'stick--vert3': letterShow }"></div>
      </div>
      <div class="mew__letter">
        <div class="stick" :class="{ 'stick--right': letterShow }"></div>
        <div class="stick" :class="{ 'stick--left': letterShow }"></div>
        <div class="stick" :class="{ 'stick--right': letterShow }"></div>
        <div class="stick" :class="{ 'stick--left': letterShow }"></div>
      </div>
    </div>
    <transition name="fade">
      <div v-show="wishesShow" class="wishes">🎉 Wszystkiego najlepszego II: 🎉</div>
    </transition>

  <transition name="fade">
    <Snowf
      v-if="wishesShow"
      id="snow-container"
        :amount="50"
        :size="5"
        :speed="1.5"
        :wind="0"
        :opacity="0.8"
        :swing="1"
        :image="null"
        :zIndex="null"
        :resize="true"
        color="#fff"
      />
    </transition>
  </div>
</template>

<script src="./mew-page.mjs"  module></script>
<style  src="./mew-page.scss" scoped lang="scss"></style>
