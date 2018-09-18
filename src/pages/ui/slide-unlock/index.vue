<template lang="pug">
.ui-slide-unlock
  el-row
    el-col(:span="24")
      .w300
        slide-unlock(@unlock="unlockSuccess")
  el-row.mt20
    el-col(:span="24")
      h3 {{unlock}}
</template>

<script>
export default {
  data () {
    return {
      /**
       * 是否解锁
       * @type {Boolean}
       */
      unlock: '未解锁'
    }
  },
  methods: {
    /**
     * 解锁成功
     * @function [unlockSuccess]
     */
    unlockSuccess () {
      this.unlock = '解锁成功'
    }
  }
}
</script>

