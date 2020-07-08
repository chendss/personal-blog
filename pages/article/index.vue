<style lang="scss" scoped src="./index.scss"></style>

<template>
  <div class="markdown markdown-body">
    <le-editor v-model="article"
      hljs-css="dark"
      @save="save"></le-editor>
  </div>
</template>

<script src="./article.js"></script>