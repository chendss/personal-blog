<style lang="scss" scoped src="./index.scss"></style>

<template>
  <div class="article-box">
    <div class="layer" id="id-cover-article">
      <img :src="cover" />
    </div>
    <div class="markdown">
      <le-preview ref="md-preview" :is-md="true" :value="article"></le-preview>
    </div>
  </div>
</template>

<script src="./article.js"></script>