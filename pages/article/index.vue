<style lang="scss" scoped src="./index.scss"></style>
<style lang="scss" scoped src="./index-mobile.scss"></style>

<template>
  <div class="article-box">
    <div class="layer"
      id="id-cover-article">
      <img :src="article.cover" />
      <div class="vertical">
        <h1 class="page-title">{{article.title}}</h1>
        <div class="info">
          <p class="time">发表于{{timestapToDate(article.time)}}</p>
          <div class="tag-box">
            <div class="tag"
              v-for="tag in article.tagLabels"
              :key="tag">{{tag}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <Particles class="content-canvas"></Particles>
      <div class="markdown"
        id="id-markdown-content">
        <le-preview ref="md-preview"
          hljs-css="atomOneDark"
          :is-md="true"
          :value="article.html"></le-preview>
      </div>
      <div class="toc-copy"
        id="id-toc-copy"></div>
      <div class="toc"
        id="id-toc">
        <div class="toc-item"
          :level="item.level"
          v-for="item in showToc"
          :key="item.code"
          @click="tocItemClick(item)">{{item.code}}</div>
      </div>
    </div>
  </div>
</template>

<script src="./article.js"></script>