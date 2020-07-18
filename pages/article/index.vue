<style lang="scss" scoped src="./index.scss"></style>
<style lang="scss" scoped src="./index-mobile.scss"></style>

<template>
  <div class="article-box">
    <div class="layer"
      id="id-cover-article">
      <img :src="article.cover" />
    </div>
    <div class="markdown">
      <le-preview ref="md-preview"
        hljs-css="atomOneDark"
        toc
        :is-md="true"
        :value="article.html"></le-preview>
    </div>
  </div>
</template>

<script src="./article.js"></script>