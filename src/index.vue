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
            <el-table-column prop="code" label="错误码" width="90"></el-table-column>
            <el-table-column prop="title" label="错误信息" width="250"></el-table-column>
            <el-table-column prop="description" label="详细信息"></el-table-column>
            <el-table-column prop="solution" label="解决办法"></el-table-column>
            <el-table-column label="操作" inline-template :context="_self" fixed="right" width="150">
              <el-dropdown trigger="click">
                <el-button type="primary" size="small">
                  操作菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><el-button type="primary" icon="information" @click="handleView(row)" >详细</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button type="primary" icon="edit">编辑</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button type="primary" icon="delete">删除</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button type="primary" icon="more" @click="handleRedirect(row)">更多</el-button></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>           
            </el-table-column>
        </el-table>

        <!-- 对话框 //-->
        <el-dialog title="详细信息" v-model="ui.dialogVisible">
          <el-form :model="editForm" label-width="80px" ref="editForm">
            <el-form-item label="错误码" prop="code">
    					<el-input v-model="editForm.code" auto-complete="off" readonly="editForm.ui.dialogReadonly"></el-input>
		    		</el-form-item>
            <el-form-item label="错误信息" prop="title">
              <el-input v-model="editForm.title" aria-autocomplete="off" readonly="editForm.ui.dialogReadonly"></el-input>
            </el-form-item>
            <el-form-item label="详细信息" prop="description">
              <el-input type="textarea" v-model="editForm.description" aria-autocomplete="off" readonly="editForm.ui.dialogReadonly"></el-input>
            </el-form-item>
            <el-form-item label="解决办法" prop="solution">
              <el-input type="textarea" v-model="editForm.solution" aria-autocomplete="off" readonly="editForm.ui.dialogReadonly"></el-input>
            </el-form-item>
          </el-form>
        </el-dialog>
    <div>
</template>
<script>
export default {
  mounted: function () {
    this.loadAllCodes();
  },
  data() {
    return {
      ui: {
        dialogVisible: false,
        dialogReadonly: true
      },
      editForm: {},
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
    handleView: function(row) {
      this.ui.dialogVisible = true;
      this.editForm.id = row.id;
      this.editForm.code = row.code;
      this.editForm.title = row.title;
      this.editForm.description = row.description;
      this.editForm.solution = row.solution;
    },
    handleRedirect: function(row) {
      let code = row.code;
      console.log('#/codes/'+code);
      this.$router.push({path: '/codes/'+code});
    },
    onSubmit: function() {
      console.log('submit!');
    }
  }
}
</script>