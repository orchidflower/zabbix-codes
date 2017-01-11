<template> 
    <div>
			<!--<app-header/>-->
			<el-row type="flex" justify="center">
				<el-col :span=18>
					<transition name="bounce">
						<router-view></router-view>
					</transition>
				</el-col>
			</el-row>
			<!--<app-footer/>-->
	</div>
</template>
<style>
	.appnav {
		padding: 10px 0px 2px 0px;
		margin-bottom: 5px;
		border-bottom: 1px solid #EEEEEE;
	}

	.appheader {
		padding-left: 50px;
	}

	.appfooter {
		margin-top: 40px;
		padding: 10px;
	}
</style>
<script>
export default {
//   name: 'app',
//   components: {
//   }
}
</script>