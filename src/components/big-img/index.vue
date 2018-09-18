<template lang="pug">
.bigImg
  el-col.img-view(@click="bigImg")
    el-col.img-layer
    el-col.img
      img(:src="imgSrc")
</template>

<script>
export default {
  props: ['imgSrc'],
  methods: {
    bigImg () {
      this.$emit('bigImg')
    }
  }
}
</script>
