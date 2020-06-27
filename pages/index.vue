<style lang="scss" scoped src="./index/index.scss"></style>
<style lang="scss" scoped src="./index/index-mobile.scss"></style>
<template>
  <div class="home-page">
    <div class="top">
      <div class="mask"
        id="id-cover-mask">
        <div class="layer"
          id="id-cover-layer">
          <img src="https://ae01.alicdn.com/kf/H2505f877399c4bb3b28c4c62c3775134j.jpg">
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
      <div class="logo-box">
        <img :src="packUp==='true'?'/logo-home.png':'/logo.png'">
        <div class="menu"
          @click="menuClick">
          <svg class="icon"
            aria-hidden="true">
            <use xlink:href="#icon-menu"
              v-if="packUp==='true'"></use>
            <use xlink:href="#icon-cha"
              v-else></use>
          </svg>
        </div>
      </div>
      <div id="post0">
        <p>{{today}}</p>
        <h2><a data-id="6643"
            class="posttitle">{{day.name}}</a></h2>
        <p class="content">{{day.text}}</p>
      </div>
      <div class="nav"
        @click="menuClick"
        :packup="packUp">
        <div id="menu-menu"
          class="menu">
          <div class="menu_item"
            rel="noopener noreferrer"
            v-for="(item, index) in infos"
            :key="index">
            {{item.name}}
          </div>
        </div>
        <p class="copyright">© 少爷. {{today}}. </p>
      </div>
    </div>
  </div>
</template>
<script src="./index/index.js"></script>
