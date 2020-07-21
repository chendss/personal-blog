<template>
  <vue-particles color="#292929"
    :moveSpeed="4"
    v-if="!isMobile&&load"
    :linesWidth="1"
    hoverMode="grab"
    :particleSize="2"
    shapeType="circle"
    :lineLinked="true"
    :lineOpacity="0.8"
    :hoverEffect="true"
    :clickEffect="true"
    :particleOpacity="1"
    linesColor="#b00e25"
    :linesDistance="150"
    :particlesNumber="80"
    clickMode="remove"></vue-particles>
</template>

<script>
import { isMobile } from "../static/utils"

export default {
  data () {
    return {
      isMobile: false,
      load: false
    }
  },
  created () {
    if (process.client) {
      this.isMobile = isMobile()
    }
  },
  mounted () {
    this.$nextTick(() => this.load = true)
  }
}
</script>