<template>
    <div>
        <el-breadcrumb separator="/" class="appnav">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统维护</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="queryForm.system" placeholder="系统"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="queryForm.contact" placeholder="请选择联系人" :clearable="true" filterable>
                    <el-option
                    v-for="item in allContacts"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <!--<el-form-item>
                <el-button type="primary" @click="handleQuery">查询</el-button>
            </el-form-item>-->
            <el-form-item align="right">
                <el-button type="primary" @click="handleAdd">新增</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="filteredTableData" style="width: 100%" v-loading.body="loading">
            <el-table-column prop="system" label="编码" width="80"></el-table-column>
            <el-table-column prop="name" label="系统名称" width="180"></el-table-column>
            <el-table-column prop="contactname" label="联系人" width="80"></el-table-column>
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
                </el-dropdown-menu>
              </el-dropdown>           
            </el-table-column>
        </el-table>   

        <!-- 对话框 //-->
        <el-dialog title="详细信息" v-model="ui.dialogVisible">
          <el-form :model="editForm" :rules="editFormRules" label-width="100px" ref="editForm">
            <el-form-item label="系统代码" prop="system">
    			<el-input v-model="editForm.system" auto-complete="off" v-bind:readonly="systemReadonly" ref="codeInput"></el-input>
		    </el-form-item>
            <el-form-item label="系统名称" prop="name">
    			<el-input v-model="editForm.name" auto-complete="off" v-bind:readonly="ui.dialogReadonly" ref="codeInput"></el-input>
		    </el-form-item>
            <el-form-item label="联系人" prop="contact">
              <!--<el-input v-model="editForm.contact" aria-autocomplete="off" v-bind:readonly="ui.dialogReadonly"></el-input>-->
                <el-select v-model="editForm.contact" placeholder="请选择联系人" filterable>
                    <el-option
                    v-for="item in allContacts"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>                              
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
      allContacts: [],
      ui: {
        // 对话框是否可见
        dialogVisible: false,
        // 对话框的内容是否允许编辑
        dialogReadonly: true,
        // 是新增记录还是编辑记录
        addRecord: false,
      },
      editForm: {contact:''},
      editFormRules: {
        system: [{required: true, message: '请输入系统代码', trigger: 'blur'}],
        name: [{required: true, message: '请输入系统名称', trigger: 'blur'}],
        description: [{required: true, message: '请输入详细信息', trigger: 'blur'}],
        contact: [{required: true, message: '请输入联系人', trigger: 'blur'}],
      },
      queryForm: { system: '', contact: ''},
      tableData: [],
      loading: false
    }
  },
  computed: {
    filteredTableData: function() {
      let self = this;
      let system = this.queryForm.system;
      let contact = this.queryForm.contact;
      if (system=="" && contact=="") return self.tableData;
      if (system=="") {
        return self.tableData.filter(function(item){
          return item.contact == contact;
        });
      }
      if (contact=="") {
        return item.system.indexOf(system)!=-1;
      }
      return self.tableData.filter(function(item){
        return item.system.indexOf(system)!=-1 && item.contact==contact;
      });
    },
    systemReadonly: function () {
      return !this.ui.addRecord;
    }
  },
  mounted: function () {
    this.loadAllSystems();
    this.loadAllContacts();
  },
  methods: {
    loadAllContacts: function() {
      this.$http.get('/api/contacts/all').then((response) => { // Success
        // console.log(response.body);
        if (response.body.success==true) {
          let data = response.body.data;
          this.allContacts = [];
          let _this = this;
          data.forEach(function(item){
              _this.allContacts.push({label: item.name+"（"+item.contact+"）", value: item.contact});
          });
        }
      }, (response) => { // Failure
      })
    },
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
    //   this.loadAllContacts();
      this.ui.dialogVisible = true;
      this.ui.dialogReadonly = false;
      this.ui.addRecord = true;
      this.editForm.id = '';
      this.editForm.system = '';
      this.editForm.name = '';
      this.editForm.contact = '';
      this.editForm.description = '';
    },
    // handleQuery: function() {
        
    // },
    handleView: function(row) {
      this.ui.dialogVisible = true;
      this.ui.dialogReadonly = true;
      this.ui.addRecord = false;
      this.editForm.id = row.id;
      this.editForm.system = row.system;
      this.editForm.name = row.name;
      this.editForm.contact = row.contact;
      this.editForm.description = row.description;
    },
    handleDelete: function(row) {
      this.$confirm('此操作将删除当前记录，是否继续？', '请确认', {confirmButtonText:'确定', cancelButtonText: '取消', type: 'warning'})
        .then(() => {
          console.log('trying to delete');
          this.$http.delete('/api/systems/ids/'+row.id)
            .then(()=>{
              this.$message({type:'info', message:'删除成功！'});
              this.loadAllSystems();
            }, ()=>{
              this.$message({type:'warning', message:'删除失败！'});
            });
        }).catch(() => {
          console.log('Cancel delete...');
        });
    },
    handleEdit: function(row) {
      this.ui.dialogVisible = true;
      this.ui.dialogReadonly = false;
      this.ui.addRecord = false;
      this.editForm.id = row.id;
      this.editForm.system = row.system;
      this.editForm.name = row.name;
      this.editForm.contact = row.contact;
      this.editForm.description = row.description;
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