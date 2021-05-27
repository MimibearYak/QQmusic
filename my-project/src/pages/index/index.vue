<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-03-04 13:27:28
 * @LastEditors: Seven
 * @LastEditTime: 2021-03-09 16:23:45
-->
<template>
	<view class="index-box">
		<view class='header'>QQ音乐</view>
		<mvContent v-if="active==2" :mvList="mvList" :Rheight="Rheight" :RmvList="RmvList" :Mheight="Mheight" @allow="allow"></mvContent>
		<MusicItem v-else :RnewMusic='RnewMusic' @musicList='showlist'></MusicItem>
		<showPlay v-if="showPlayMusic.name!=undefined && active==1" @showList='showList'></showPlay>
		<view class='bottom App-flex '>
			<view :class="active==1?'bottom-item App-flex activebottom':'bottom-item App-flex '" @click="handleClick(1)">
				<text class='iconfont icon-bofang' style='font-size:55rpx'></text>
				<text>音乐</text>
			</view>
			<view :class="active==2?'bottom-item App-flex activebottom':'bottom-item App-flex '" @click="handleClick(2)">
				<text class='iconfont icon-yinyue' style='font-size:55rpx'></text>
				<text>视频</text>
			</view>
		</view>
		<musicList v-if='musicList' @showListCancel='cancel'></musicList>
	</view>
</template>

<script>
import musicList from '../../components/musicList'
import showPlay from '../../components/showPlay'
import MusicItem from '../../components/MusicItem'
import mvContent from '../../components/mvContent'
	export default {
		data() {
			return {
				title: 'Hello',
				active:2,
				mvList:[],
				Rheight:0,
				RmvList:[],
				Mheihgt:0,
				offset:1,
				Mheight:0,
				arrowd:1000,
				RnewMusic:[],
				musicList: false,
				
			}
		},
		computed:{
			showPlayMusic(){
				return this.$store.state.currentMusic
			}
		},
		components:{
			mvContent,
			MusicItem,
			showPlay,
			musicList,
		},
		onLoad() {
			this.getReData()
			this.getMVData(this.offset)
			this.getNewMusic()
		},
		onReachBottom (){
			console.log('chudi')
			if(this.arrowd==10){
				this.offset=this.offset+1
				this.getMVData(this.offset)
			}

		},
		methods: {
			allow(e){
				console.log(e)
				this.arrowd=e
			},
			handleClick(num){
				this.active=num
			},
			getReData(){
				this.request('/mv/all','GET',{limit:20,area:'韩国',offset:1}).then(res=>{
					// console.log(res)
					this.mvList=res.data
					if(res.data.length%2==0){
						this.Rheight=res.data.length*200/2+400+300+(res.data.length-10)+13.5
					}else{
						this.Rheight=res.data.length*200/2+400+450+(res.data.length-10)+13.5
					}
				})
			},
			getMVData(offset){
				this.request('/mv/all','GET',{limit:10,area:'欧美',offset:offset}).then(res=>{
					console.log(res)
					let list=[...this.RmvList,...res.data]
					this.RmvList=list
					this.Mheight=list.length*200/2+250
				})
			},
			getNewMusic(){
				this.request('/personalized/newsong','GET').then(res=>{
					console.log(res)
					this.RnewMusic=res.result
				})
			},
			cancel(){
				this.musicList=false
			},
			showList(){
				this.musicList=true
			},
		}
	}
</script>

<style scoped lang='stylus'>
	.activebottom{
		color rgba(102,205,0,.8 )
	}
	.index-box
		background rgba(176,196,222,.2)
		padding-top 70rpx  
		.header
			z-index 1000 
			position fixed
			top 0
			width 750rpx
			height 60rpx
			line-height 60rpx
			text-align center
			background-color rgba(1,1,1,.2)
		.bottom
			position fixed
			bottom 0
			width 750rpx
			height 100rpx
			padding-top 10rpx
			color black 
			border-top 2px solid rgba(255,99,71,.8)
			background-color rgba(255,240,245,.9)
			.bottom-item
				flex 1
				font-size 50rpx
				padding-left 100rpx 
			text:nth-of-type(1)
				padding-top 14rpx
			text:nth-of-type(2)
				margin-left 10rpx

</style>
