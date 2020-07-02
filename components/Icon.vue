<style lang="scss" scoped>
.icon-box {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
}
.icon + .text {
  margin-left: 8px;
}
</style>

<template>
  <svg class="icon" @click="onClick" v-if="text==null" aria-hidden="true">
    <use :xlink:href="`#${icon}`" />
  </svg>
  <div class="icon-box" @click="onClick" v-else>
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="`#${icon}`" />
    </svg>
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
export default {
  props: ["icon", "text"],
  methods: {
    onClick(e) {
      this.$emit("click", e)
    }
  }
}
</script>