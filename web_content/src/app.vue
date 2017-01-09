<template> 
    <div>
			<app-header></app-header>
			<!--<router-view name="header"></router-view>-->
			<el-row type="flex" justify="center">
				<el-col :span=18>
					<transition name="bounce">
						<router-view></router-view>
					</transition>
				</el-col>
			</el-row>
			<app-footer></app-footer>
			<!--<router-view name="footer"></router-view>-->
	</div>
</template>
<script>
export default {
  name: 'app',
  components: {
  }
}
</script>