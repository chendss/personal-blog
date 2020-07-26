<style lang="scss" scoped src="./index.scss"></style>
<style lang="scss" scoped src="./index-mobile.scss"></style>

<template>
  <div>
    <div class="archives">
      <div class="year-box"
        v-for="groupItem in group"
        :key="groupItem.key">
        <h1>{{groupItem.key}} 年</h1>
        <ul class="al_mon_list"
          v-for="(ident, i) in Object.keys(groupItem.value)"
          :key="i">
          <li>
            <span>{{ident}}月<em>（{{groupItem.value[ident].length}}篇文章）</em></span>
            <ul class="al-post-list">
              <li v-for="(item, j) in groupItem.value[ident]"
                :key="j">
                {{(new Date(item.time)).getDate()}}日
                <a href="javascript:void(0)"
                  @click="goUrl(item.id)">{{item.title}}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>