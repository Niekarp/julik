<template>
  <div>

  <div class="moon">
    <transition name="fade">
        <img src="/assets/moon.png" class="moon__img" v-if="wishesShow"/>
    </transition>
  </div>

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
    <div class="present" :class="{ rotate: wishesShow }">
      <span v-on:click="onPresentClick">{{mewage}}</span>
    </div>

  <transition name="fade">
    <div  class="cloud cloud--moving" v-if="wishesShow" ref="cloud">
      <a href="https://www.dropbox.com/sh/97u7jsrr27ss96p/AACmY9VVbfXBdW2EzRejeJ0Ha?dl=0">☁</a>
    </div>
  </transition>

  <transition name="fade">
    <div  class="tree" v-if="wishesShow">
      🎄
    </div>
  </transition>

   <transition name="fade">
    <img src="/assets/mosler.png" class="mosler" :class="{'mosler--attack': moslerAttack }" v-if="wishesShow" ref="mosler" />
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
