<template>
    <div>
        <el-breadcrumb separator="/" class="appnav">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统维护</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="queryForm.code" placeholder="系统"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleQuery">查询</el-button>
            </el-form-item>
            <el-form-item align="right">
                <el-button type="primary" @click="handleAdd">新增</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData" style="width: 100%" v-loading.body="loading">
            <el-table-column prop="system" label="系统" width="90"></el-table-column>
            <el-table-column prop="contact" label="联系人" width="250"></el-table-column>
            <el-table-column prop="description" label="系统介绍"></el-table-column>
            <el-table-column label="操作" inline-template :context="_self" fixed="right" width="150">
              <el-dropdown trigger="click">
                <el-button type="primary" size="small">
                  操作菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><el-button type="primary" icon="information" @click="handleView(row)" >详细</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button type="primary" icon="edit" @click="handleEdit(row)">编辑</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button type="primary" icon="delete" @click="handleDelete(row)">删除</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button type="primary" icon="more" @click="handleRedirect(row)">更多</el-button></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>           
            </el-table-column>
        </el-table>        
    </div>
</template>
<script>
export default {
  data() {
    return {
      ui: {
        // 对话框是否可见
        dialogVisible: false,
        // 对话框的内容是否允许编辑
        dialogReadonly: true,
        // 是新增记录还是编辑记录
        addRecord: false,
      },
      editForm: {},
      editFormRules: {
        code: [{required: true, message: '请输入错误码', trigger: 'blur'}],
        title: [{required: true, message: '请输入错误信息', trigger: 'blur'}],
        description: [{required: true, message: '请输入详细信息', trigger: 'blur'}],
        solution: [{required: true, message: '请输入解决办法', trigger: 'blur'}],
      },
      queryForm: { user: '', region: ''},
      tableData: [],
      loading: false
    }
  },
  mounted: function () {
    this.loadAllSystems();
  },
  methods: {
    loadAllSystems: function() {
      console.log("*************************************");
      this.loading = true;
      this.$http.get('/api/systems/all').then((response) => { // Success
        console.log(response.body);
        if (response.body.success==true) {
          this.tableData = response.body.data;
          this.loading = false;
        }
      }, (response) => { // Failure
      })
    },    
    handleAdd: function() {
    },
    handleQuery: function() {
    },
    handleView: function(row) {
    },
    handleDelete: function(row) {

    },
    handleRedirect: function(row) {

    },
    handleEdit: function(row) {

    }
  }
}
</script>