<template>
  <div>
    <transition appear name="fade">
      <h1 class="page-title" v-show="true" :style="{ transitionDelay: headerShowDelaySec }">Katalog utworow {{artist === "Olaf" ? "Olafa" : "Oloa"}}</h1>
    </transition>
    
    <ul class="pieces-list" :class="{ 'pieces-list--inactive': mouseIsCalm }">
      <transition-group appear name="fade">
        <li v-for="(piece, idx) in pieces" :key="piece.name" 
            class="pieces-list__listitem">
          <span class="pieces-list__text-wrapper"
                :class="{ 'pieces-list__text-wrapper--selected': piece === selectedPiece }"
                v-on:click="switchPiece(piece)">
            <span v-if="artist === 'Olaf'">{{ `OWV ${idx + 1} - ${piece.name}` }}</span>
            <span v-else>{{ `OLO ${idx + 1} - ${piece.name}` }}</span>
          </span>
        </li>
      </transition-group>
    </ul>

    <div class="switch-player-button" v-on:click="switchPlayer">></div>

    <transition name="fade-overlay">
      <video
        v-show="!selectedPiece.cover && !blanket"
        class="video-overlay"
        ref="videoOverlay"
        type="video/mp4"
        autoplay="false"
        loop="true"
      ></video>
    </transition>

    <transition name="fade-overlay">
      <div
        v-show="selectedPiece.cover && !blanket" 
        ref="coverOverlay"
        class="cover-overlay">
      </div>
    </transition>
  </div>
</template>

<script src="./wola-retro-page.ts"   module lang="ts"></script>
<style  src="./wola-retro-page.scss" scoped lang="scss"></style>
