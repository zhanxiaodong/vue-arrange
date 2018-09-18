<template lang="pug">
.slide-unlock
  .ml20.mr20.p-rl
    .slider(
      v-bind:style="sliderStyle"
      v-bind:class="{ active: unlock }"
      @touchstart="startDrag"
      @mousedown="startDrag"
      @touchmove="onDrag"
      @mousemove="onDrag")
      span.slider__icon.el-icon-arrow-right(v-if="!unlock")
      span.slider__icon.el-icon-check(v-else)
    .tips
      .tips__hover(v-bind:style="tipsHoverStyle")
      span.tips_text(v-if="!dragging && !unlock") 向右拖动滑块验证
</template>

<script>
export default {
  data () {
    return {
      /**
       * 滑块样式
       * @type {Object}
       */
      sliderStyle: {
        left: 0
      },
      /**
       * tip hover 样式
       * @type {Object}
       */
      tipsHoverStyle: {
        width: 0
      },
      /**
       * 起始位置
       * @type {Object}
       */
      start: {
        x: 0
      },
      /**
       * 是否拖拽中
       * @type {Boolean}
       */
      dragging: false,
      /**
       * 解锁成功
       * @type {Boolean}
       */
      unlock: false
    }
  },
  methods: {
    /**
     * 开始拖拽
     * @function [startDrag]
     * @param {Object} event
     */
    startDrag (event) {
      if (this.unlock) return
      this.start.x = event.clientX
      this.dragging = true
    },

    /**
     * 拖拽中
     * @function [onDrag]
     * @param {Object} event
     */
    onDrag (event) {
      if (!this.dragging) return
      event.preventDefault()
      const offsetLeft = event.pageX - this.start.x
      const x = Math.abs(offsetLeft)
      const parentWidth = this.$el.clientWidth
      const left = (x * 1.15 / parentWidth) * 100
      if (left >= 100) {
        this.unlock = true
        this.dragging = false
        this.sliderStyle.left = '100%'
        this.tipsHoverStyle.width = '110%'
        this.$emit('unlock', true)
      } else {
        this.sliderStyle.left = `${left}%`
        this.tipsHoverStyle.width = `${left + 10}%`
      }
    },

    /**
     * 拖拽结束
     * @function [endDrag]
     */
    endDrag () {
      if (this.unlock && !this.dragging) return
      this.dragging = false
      this.sliderStyle.left = this.tipsHoverStyle.width = 0
    }
  }
}
</script>
