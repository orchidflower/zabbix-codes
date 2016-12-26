<template>
    <div>
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="queryForm.code" placeholder="错误码"></el-input>
            </el-form-item><el-form-item>
                <el-select v-model="queryForm.system" placeholder="所属系统">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleQuery">查询</el-button>
            </el-form-item>
            <el-form-item align="right">
                <el-button type="primary" @click="handleAdd">新增</el-button>
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
                  <el-dropdown-item><el-button type="primary" icon="edit" @click="handleEdit(row)">编辑</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button type="primary" icon="delete" @click="handleDelete(row)">删除</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button type="primary" icon="more" @click="handleRedirect(row)">更多</el-button></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>           
            </el-table-column>
        </el-table>

        <!-- 对话框 //-->
        <el-dialog title="详细信息" v-model="ui.dialogVisible">
          <el-form :model="editForm" :rules="editFormRules" label-width="80px" ref="editForm">
            <el-form-item label="错误码" prop="code">
    					<el-input v-model="editForm.code" auto-complete="off" v-bind:readonly="ui.dialogReadonly" :autofocus=true></el-input>
		    		</el-form-item>
            <el-form-item label="错误信息" prop="title">
              <el-input v-model="editForm.title" aria-autocomplete="off" v-bind:readonly="ui.dialogReadonly"></el-input>
            </el-form-item>
            <el-form-item label="详细信息" prop="description">
              <el-input type="textarea" v-model="editForm.description" aria-autocomplete="off" v-bind:readonly="ui.dialogReadonly"></el-input>
            </el-form-item>
            <el-form-item label="解决办法" prop="solution">
              <el-input type="textarea" v-model="editForm.solution" aria-autocomplete="off" v-bind:readonly="ui.dialogReadonly"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="ui.dialogVisible = false">取 消</el-button>
            <el-button v-if="ui.dialogReadonly==false" type="primary" @click.native="handleSaveOrUpdate()" >确 定</el-button>
          </div>          
        </el-dialog>
    <div>
</template>
<script>
var co = require('co');

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
        code: [
          {required: true, message: '请输入错误码', trigger: 'blur'}
        ],
      },
      queryForm: { user: '', region: ''},
      tableData: []
    }
  },

  mounted: function () {
    this.loadAllCodes();
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
      this.ui.dialogReadonly = true;
      this.ui.addRecord = false;
      this.editForm.id = row.id;
      this.editForm.code = row.code;
      this.editForm.title = row.title;
      this.editForm.description = row.description;
      this.editForm.solution = row.solution;
    },
    handleEdit: function(row) {
      this.ui.dialogVisible = true;
      this.ui.dialogReadonly = false;
      this.ui.addRecord = false;
      this.editForm.id = row.id;
      this.editForm.code = row.code;
      this.editForm.title = row.title;
      this.editForm.description = row.description;
      this.editForm.solution = row.solution;
    },
    handleAdd: function() {
      this.ui.dialogVisible = true;
      this.ui.dialogReadonly = false;
      this.ui.addRecord = true;
      this.editForm.id = '';
      this.editForm.code = '';
      this.editForm.title = '';
      this.editForm.description = '';
      this.editForm.solution = '';
    },
    handleDelete: function() {
      this.$confirm('此操作将删除当前记录，是否继续？', '请确认', {confirmButtonText:'确定', cancelButtonText: '取消', type: 'warning'})
        .then(() => {
          console.log('trying to delete');
        }).catch(() => {
          console.log('Cancel delete...');
        });
    },
    handleRedirect: function(row) {
      let code = row.code;
      console.log('#/codes/'+code);
      this.$router.push({path: '/codes/'+code});
    },
    handleSaveOrUpdate: function() {
      if (this.ui.addRecord)
        console.log('Add record....');
      else
        console.log('Update record...');
    },
    handleQuery: function() {
      console.log('Try to query....');
    }
  }
}
</script>