<template>
  <div>
    <header v-show="!horrorOn">
      <welcome-section class="full-screen" v-bind:scroll-arrow-target="elMainSection"></welcome-section>
    </header>
    
    <div class="main-section" v-bind:class="{ 'main-section--horror': horrorOn }" ref="mainSection">
      <header>
        <h1 v-if="!horrorOn">Julik pies bagienny groźny</h1>
        <h1 v-else class="horror-h1"><span lang="ja">✟ご飯が熱い。</span></h1>
      </header>

      <main>
        <article>
          <section>
            <a name="julik-photo"></a>
            <julik-id-photo class="main-section__julik-id-photo" v-on:woof-target-reach="setHorrorMode" v-on:wola-retro-clicked="onWolaRetroClick" :horror-theme="horrorOn" name="julik-img"></julik-id-photo>
          </section>

          <section>
            <h2> {{ julikIntroductionTitle }} </h2>
            <p>
              <span v-if="!horrorOn"><a href="#julik-photo"> Julik</a> {{ julikIntroduction }}</span>
              <span v-else>{{ julikIntroduction }}</span>
            </p>
          </section>
        
          <section>
            <food-list ref="foodList" :horror-theme="horrorOn" v-on:mew="onMew"></food-list>
          </section>

          <section>
            <h2>Zachowanie</h2>
            <p>{{ julikBehaviour }}</p>
          </section>
        </article>
      </main>

      <hr />
      
      <footer>
        <p v-show="!horrorOn">Kochasz Julika? <a href="mailto:olino00727@gmail.com?cc=skrzynkaof@gmail.com&subject=Uwielbiam%20Juliki&body=Julik%20to%20tak%20jak%20najlepszy%20pies%20na%20podlasiu%20wg.%20mnie.">Daj nam znać co o tym sądzisz</a></p>
        <button v-show="horrorOn" v-on:click="resetFoodListAndTurnHorroOff">Reset</button>    
      </footer>

      <aside>
        <transition name="fade">
          <news-banner v-if="!horrorOn" class="main-section__news-banner"></news-banner>
        </transition>
      </aside>
    </div>

    <div v-show="!horrorOn" class="hero-section baba-hero full-screen">
      <div class="patreons-container">
        <h2 class="patreons-header patreons">Patroni</h2>
        <ul class="patreons-list patreons">
          <li><div>Olaf D.</div></li>
          <hr />
          <li><div>Julik</div></li>
        </ul>
      </div>
    </div>

    <!-- Elements positioned absolutely -->
    <div id="loading-page">
      <div>
        <img src="assets/favicon.ico" id="loading-img">
        <p id="version-string"></p>
      </div>
      <div id="blurred-overlay"></div>
    </div>
    
    <!-- TODO: add fade-out effect -->
    <transition name="fade">
      <div v-show="secondBackgroundOn" v-if="!horrorOn" ref="backgroundContainer" class="background-container"></div>
    </transition>
  </div>
</template>

<script src="./julik-page.mjs"  module></script>
<style  src="./julik-page.scss" scoped lang="scss"></style>
