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
      <div id="post0">
        <p>{{today}}</p>
        <h2><a data-id="6643"
            class="posttitle">{{day.name}}</a></h2>
        <p class="content">{{day.text}}</p>
      </div>
    </div>
    <div class="main"
      id="id-home-main"
      type="homepage">
      <div class="article-list">
        <div class="article"
          v-for="(item) in remote.list"
          :key="item.id">
          <div class="left">
            <Icon icon="icon-shijian"
              :text="`发布于${item.time}`"
              type="time"></Icon>
            <div class="title">{{item.title}}</div>
            <div class="focus">
              <Icon icon="icon-yanjing1"
                :text="`${item.browse}热度`"
                type="browse"></Icon>
              <Icon icon="icon-pinglun1"
                :text="`${item.comments}条评论`"
                type="comments"></Icon>
              <Icon icon="icon-wode"
                :text="item.author"
                type="author"></Icon>
            </div>
            <div class="abstract">摘要：{{item.abstract}}</div>
            <div class="operation">
              <Icon icon="icon-gengduo-copy"
                type="op-more"></Icon>
              <Icon icon="icon-tubiao09"
                type="op-edit"></Icon>
            </div>
          </div>
          <div class="right">
            <img :src="item.cover">
          </div>
        </div>
      </div>
      <Particles class="main-canvas"></Particles>
    </div>
  </div>
</template>
<script src="./index/index.js"></script>
