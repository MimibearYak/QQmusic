<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-03-04 13:27:28
 * @LastEditors: Seven
 * @LastEditTime: 2021-03-06 23:16:05
-->
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			index:0
		}
	}
</script>

<style lang='stylus'>
@import './iconfont/iconfont.css';
	/*每个页面公共css */
	.App-flex{
		display: flex;
		align-items center
	}
	.App-flex-one
		display flex
		justify-content space-between
		flex-wrap wrap
	view 
		box-sizing:border-box
	.strange
		box-sizing:border-box
	.App-ft
		position relative
	.App-son
		position absolute
		top 50%
		left 50%
		transform translate(-50%,-50%)
	.App-text-hd
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	.App-flex-bc
		display flex 
		justify-content space-between
		align-items center
		
</style>
