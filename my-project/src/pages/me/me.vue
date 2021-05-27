<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-03-04 15:41:46
 * @LastEditors: Seven
 * @LastEditTime: 2021-03-04 17:10:57
-->
<template>
  <view>
    <sonItem :list='list' @getFatherM='getData'></sonItem>
    <view>
      <input type="text">
      <radio></radio>
    </view>
  </view>
</template>

<script>
import sonItem from '../../components/itemSon'
export default {
  data(){
    return{
      list:['web','java','php']
    }
  },
  components:{
    sonItem
  },
  onLoad(){
		console.log(this.baiduUrl)
    //获取小程序实例 getApp()
    console.log(getApp().globalData.index)
    
    this.request('/banner').then(res=>{
      console.log(res)
    })
  },
  methods:{
    getData(e){
      console.log(e)
      console.log('得到 son的数据')
    }
  }
}
</script>

<style>

</style>