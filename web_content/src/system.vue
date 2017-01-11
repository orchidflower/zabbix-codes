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

        <!-- 对话框 //-->
        <el-dialog title="详细信息" v-model="ui.dialogVisible">
          <el-form :model="editForm" :rules="editFormRules" label-width="100px" ref="editForm">
            <el-form-item label="系统代码" prop="system">
    					<el-input v-model="editForm.system" auto-complete="off" v-bind:readonly="ui.dialogReadonly" ref="codeInput"></el-input>
		    		</el-form-item>
            <el-form-item label="联系人" prop="contact">
              <el-input v-model="editForm.contact" aria-autocomplete="off" v-bind:readonly="ui.dialogReadonly"></el-input>
            </el-form-item>
            <el-form-item label="详细信息" prop="description">
              <el-input type="textarea" v-model="editForm.description" aria-autocomplete="off" v-bind:readonly="ui.dialogReadonly"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="ui.dialogVisible = false">取 消</el-button>
            <el-button v-if="ui.dialogReadonly==false" type="primary" @click.native="handleSaveOrUpdate()" >确 定</el-button>
          </div>          
        </el-dialog>             
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
      this.ui.dialogVisible = true;
      this.ui.dialogReadonly = false;
      this.ui.addRecord = true;
      this.editForm.id = '';
      this.editForm.system = '';
      this.editForm.contact = '';
      this.editForm.description = '';
    },
    handleQuery: function() {
        
    },
    handleView: function(row) {
      this.ui.dialogVisible = true;
      this.ui.dialogReadonly = true;
      this.ui.addRecord = false;
      this.editForm.id = row.id;
      this.editForm.system = row.system;
      this.editForm.contact = row.contact;
      this.editForm.description = row.description;
    },
    handleDelete: function(row) {

    },
    handleRedirect: function(row) {

    },
    handleEdit: function(row) {

    },
    handleSaveOrUpdate: function() {
      // 0. 校验数据
      if (this.$refs.editForm.validate((valid)=>{
        if (!valid) // 1. 数据不符合校验规则，返回
          return;
        // 2. 新增记录
        if (this.ui.addRecord) {
          let record = this.editForm;
          console.log('Add record....', record);
          this.$http.post('/api/systems', record)
            .then(()=>{
              this.$message({type:'info', message:'保存成功！'});
              this.ui.dialogVisible = false;
              this.loadAllSystems();
            }, ()=>{
              this.$message({type:'warning', message:'保存失败!'});
            });
        }
        else {  // 3. 更新记录
          console.log('Update record...');
          let record = this.editForm;
          this.$http.post('/api/systems/'+record.system, record)
            .then(()=>{
              this.$message({type:'info', message:'保存成功！'});
              this.ui.dialogVisible = false;
              this.loadAllSystems();
            }, ()=>{
              this.$message({type:'warning', message:'保存失败!'});
            });
        }
      }));
    }    
  }
}
</script>