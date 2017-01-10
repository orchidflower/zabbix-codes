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
<script>
export default {
//   name: 'app',
//   components: {
//   }
}
</script>