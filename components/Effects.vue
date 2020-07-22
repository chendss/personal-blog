<style lang="scss" scoped>
.content-canvas {
  width: 100%;
  position: fixed;
  height: 100%;
  top: 0;

  /deep/ {
    #bgCanvas {
      position: relative !important;
    }
  }
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 1024px) {
  .content-canvas {
    display: none;
  }
}
</style>

<template>
  <div
    :id="id"
    class="content-canvas"
    :style="`height:${height};top:${top}`"
  ></div>
</template>

<script>
import Effects from '../static/utils/canvas'
import { random } from '../static/utils'
export default {
  data () {
    return {
      id: random()
    }
  },
  props: ['height', 'top'],
  mounted () {
    this.Effects = new Effects(`#${this.id}`)
  }
}
</script>