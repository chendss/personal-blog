<template>
  <svg class="icon"
    v-if="text==null"
    aria-hidden="true">
    <use :xlink:href="`#${icon}`"></use>
  </svg>
  <div class="icon-box"
    v-else>
    <svg class="icon"
      aria-hidden="true">
      <use :xlink:href="`#${icon}`"></use>
    </svg>
    {{text}}
  </div>
</template>

<script>
export default {
  props: ['icon', 'text']
}
</script>