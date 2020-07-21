<style lang="scss" scoped src="./index.scss"></style>
<style lang="scss" scoped src="./index-mobile.scss"></style>

<template>
  <div class="resume-box">
    <div class="resume">
      <le-preview ref="md-preview"
        hljs-css="atomOneDark"
        :is-md="true"
        :value="resume.resume"></le-preview>
    </div>
  </div>
</template>

<script src="./index.js"></script>