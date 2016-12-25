<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item><el-form-item>
                <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item><el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="code" label="错误码" width="180"></el-table-column>
            <el-table-column prop="title" label="错误信息" width="250"></el-table-column>
            <el-table-column prop="description" label="详细信息"></el-table-column>
        </el-table>
    <div>
</template>
<script>
export default {
  mounted: function () {
    this.loadAllCodes();
  },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: []
    }
  },
  methods: {
    loadAllCodes: function() {
      console.log("*************************************");
      this.$http.get('/codes/all').then((response) => { // Success
        console.log(response.body);
        if (response.body.success==true) {
          this.tableData = response.body.data;
        }
      }, (response) => { // Failure

      })
    },
    onSubmit: function() {
      console.log('submit!');
    }
  }
}
</script>