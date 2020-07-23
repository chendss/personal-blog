<style lang="scss" scoped src="./index.scss"></style>
<style lang="scss" scoped src="./index-mobile.scss"></style>

<template>
  <div class="resume-box">
    <Effects
      top="0"
      height="100%"
    ></Effects>
    <!-- <div class="info"
      id="id-resume-info"></div> -->
    <div class="resume">
      <div class="resume-markdown">
        <le-preview
          ref="md-preview"
          hljs-css="atomOneDark"
          :is-md="true"
          :value="resume.resume"
        ></le-preview>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>