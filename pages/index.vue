<style lang="scss" scoped src="./index/index.scss"></style>
<style lang="scss" scoped src="./index/index-mobile.scss"></style>
<template>
  <div class="home-page">
    <div class="top"
      id="id-top">
      <div class="mask"
        id="id-cover-mask">
        <div class="layer"
          id="id-cover-layer">
          <img :src="config.cover">
        </div>
      </div>
      <div id="id-vibrant-mask">
        <svg viewBox="0 0 2880 1620"
          height="100%"
          preserveAspectRatio="xMaxYMax slice">
          <polygon opacity="0.7"
            points="2000,1620 0,1620 0,0 600,0 "
            style="fill: rgb(176, 14, 37);"></polygon>
        </svg>
        <div class="vibrant-div"></div>
      </div>
      <div id="post0">
        <p>{{today}}</p>
        <h2><a data-id="6643"
            class="posttitle">{{day.name}}</a></h2>
        <p class="content">{{day.text}}</p>
      </div>
    </div>
    <HomeMain :remote="remote"></HomeMain>
  </div>
</template>
<script src="./index/index.js"></script>
