<template>
  <div class="full-screen-dialog drive-in-animation">
    <transition name="fade-fast">
      <div v-show="isVisible" class="dog-picture-dialog">
        <h2 class="dog-picture-dialog__header">Wybierz sobie Julika</h2>
        <hr class="dog-picture-dialog__separator" />
        <div class="images-container">
          <div class="grid-container">
            <span class="dog-picture-dialog__class-title">{{ dogClasses[selectedDogClass.idx].name }}</span>
            <span class="dog-picture-dialog__random-dog" @click="chooseRandomAvatar" title="losowy Julik">?</span>
            <transition-group appear name="fade" class="dog-picture-dialog__grid">
              <div class="dog-picture-dialog__image-container" v-for="avatarUrl in selectedDogClass.imgUrls" v-bind:key="avatarUrl" >
                <img :src="avatarUrl" @click="onAvatarChoose(avatarUrl)" class="dog-picture-dialog__image" />
              </div>
            </transition-group>
          </div>
          <hr class="dog-picture-dialog__image-separator" />
          <div class="wheel">
            <div class="wheel__face wheel__face--0"><img :src="dogClasses[0].imgUrls[0]" @click="rotateToClass(0)" class="wheel__image wheel__image--selected" /></div>
            <div class="wheel__face wheel__face--1"><img :src="dogClasses[1].imgUrls[0]" @click="rotateToClass(1)" class="wheel__image" /></div>
            <div class="wheel__face wheel__face--2"><img :src="dogClasses[2].imgUrls[0]" @click="rotateToClass(2)" class="wheel__image" /></div>
            <div class="wheel__face wheel__face--3"><img :src="dogClasses[3].imgUrls[0]" @click="rotateToClass(3)" class="wheel__image" /></div>
            <div class="wheel__face wheel__face--4"><img :src="dogClasses[4].imgUrls[0]" @click="rotateToClass(4)" class="wheel__image" /></div>
            <div class="wheel__face wheel__face--5"><img :src="dogClasses[5].imgUrls[0]" @click="rotateToClass(5)" class="wheel__image" /></div>
            <div class="wheel__face wheel__face--6"><img :src="dogClasses[6].imgUrls[0]" @click="rotateToClass(6)" class="wheel__image" /></div>
            <div class="wheel__face wheel__face--7"><img :src="dogClasses[7].imgUrls[0]" @click="rotateToClass(7)" class="wheel__image" /></div>
          </div>
          <hr class="dog-picture-dialog__image-separator" />
        </div>
        <div class="dog-picture-dialog__exit" name="cancel" @click="onExit">X</div>
        <!-- random -->
      </div>
   </transition>
  </div>
</template>

<script src="./dog-picture-dialog.ts"   module lang="ts"></script>
<style  src="./dog-picture-dialog.scss" scoped lang="scss"></style>
