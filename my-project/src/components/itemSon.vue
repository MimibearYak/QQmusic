<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-03-04 15:40:44
 * @LastEditors: Seven
 * @LastEditTime: 2021-03-04 16:48:58
-->
<template>
  <view >
    <view class='item' @click='getFather' v-for="(item,index) in list" :key='index'>{{item}}</view>
    <slot></slot>
  </view>  
</template>

<script>
export default {
  props:{
    list:{
      type:Array
    }
  },
  methods:{
    getFather(){
      this.$emit('getFatherM','给父亲')
    }
  }

}
</script>

<style lang='stylus'>
  .item
    height 60rpx
    background-color red
    margin-top 20rpx
</style>
