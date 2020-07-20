<style lang="scss" scoped src="./index.scss"></style>
<style lang="scss" scoped src="./index-mobile.scss"></style>

<template>
  <div>
    <div class="archives">
      <div class="year-box"
        v-for="(key, index) in Object.keys(group)"
        :key="index">
        <h1>{{key}} 年</h1>
        <ul class="al_mon_list"
          v-for="(ident, i) in Object.keys(group[key])"
          :key="i">
          <li>
            <span>{{ident}}月<em>（{{group[key][ident].length}}篇文章）</em></span>
            <ul class="al-post-list">
              <li v-for="(item, j) in group[key][ident]"
                :key="j">
                {{(new Date(item.time)).getDate()}}日
                <nuxt-link :to="`/article?id=${item.id}`">{{item.title}}</nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>