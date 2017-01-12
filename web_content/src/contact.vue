<template>
    <div>
        <el-breadcrumb separator="/" class="appnav">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>联系人维护</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="queryForm.contact" placeholder="联系人"></el-input>
            </el-form-item>
            <!--<el-form-item>
                <el-button type="primary" @click="handleQuery">查询</el-button>
            </el-form-item>-->
            <el-form-item align="right">
                <el-button type="primary" @click="handleAdd">新增</el-button>
            </el-form-item>
        </el-form>        
        <el-table :data="filteredTableData" style="width: 100%" v-loading.body="loading">
            <el-table-column prop="name" label="联系人" width="90"></el-table-column>
            <el-table-column prop="contact" label="邮箱" width="250"></el-table-column>
            <el-table-column prop="titlename" label="职位"></el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column prop="qq" label="QQ"></el-table-column>
            <el-table-column prop="weixin" label="微信"></el-table-column>
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
            <el-form-item label="邮箱" prop="contact">
                <el-input v-model="editForm.contact" auto-complete="off" v-bind:readonly="contactReadonly" ref="codeInput"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="editForm.name" aria-autocomplete="off" v-bind:readonly="ui.dialogReadonly"></el-input>
            </el-form-item>
            <el-form-item label="职位" prop="title">
                <el-select v-model="editForm.title" placeholder="请选择职位" filterable>
                    <el-option
                    v-for="item in allTitles"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>                
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="editForm.mobile" aria-autocomplete="off" v-bind:readonly="ui.dialogReadonly"></el-input>
            </el-form-item>
            <el-form-item label="QQ" prop="qq">
                <el-input v-model="editForm.qq" auto-complete="off" v-bind:readonly="ui.dialogReadonly" ref="codeInput"></el-input>
            </el-form-item>
            <el-form-item label="微信" prop="weixin">
                <el-input v-model="editForm.weixin" auto-complete="off" v-bind:readonly="ui.dialogReadonly" ref="codeInput"></el-input>
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
      allTitles: [],
      ui: {
        // 对话框是否可见
        dialogVisible: false,
        // 对话框的内容是否允许编辑
        dialogReadonly: true,
        // 是新增记录还是编辑记录
        addRecord: false,
      },
      editForm: {title:''},
      editFormRules: {
        contact: [{required: true, message: '请输入邮箱', trigger: 'blur'}],
        name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
        title: [{required: true, message: '请输入错误信息', trigger: 'blur'}],
        description: [{required: true, message: '请输入详细信息', trigger: 'blur'}],
        solution: [{required: true, message: '请输入解决办法', trigger: 'blur'}],
      },
      queryForm: { contact: ''},
      tableData: [],
      loading: false
    }
  },
  computed: {
    filteredTableData: function() {
      let self = this;
      let contact = this.queryForm.contact;
      if (contact=='') return self.tableData;
      return self.tableData.filter(function(item){
        return item.contact.indexOf(contact)!=-1;
      });
    },
    contactReadonly: function() {
      return !this.ui.addRecord;
    }
  },
  mounted: function () {
    this.loadAllContacts();
    this.loadAllTitles();
  },  
  methods: {
    loadAllContacts: function() {
      this.loading = true;
      console.log("*************************************");
      this.$http.get('/api/contacts/all').then((response) => { // Success
        console.log(response.body);
        if (response.body.success==true) {
          this.tableData = response.body.data;
        }
        this.loading = false;
      }, (response) => { // Failure

      })
    },
    loadAllTitles: function() {
      this.loading = true;
      console.log("*************************************");
      this.$http.get('/api/support/titles').then((response) => { // Success
        console.log(response.body);
        if (response.body.success==true) {
          let allTitles = response.body.data;
          let self = this;
          allTitles.forEach(function(item) {
            self.allTitles.push({label: item.name+"（"+item.title+"）", value: item.title});
          });
        }
        this.loading = false;
      }, (response) => { // Failure

      })
    },       
    handleAdd: function() {
      this.ui.dialogVisible = true;
      this.ui.dialogReadonly = false;
      this.ui.addRecord = true;
      this.editForm.id = '';
      this.editForm.contact = '';
      this.editForm.name = '';
      this.editForm.title = '';
      this.editForm.mobile = '';
      this.editForm.qq = '';
      this.editForm.weixin = '';        
    },
    // handleQuery: function() {
    // },
    handleView: function(row) {
      this.ui.dialogVisible = true;
      this.ui.dialogReadonly = true;
      this.ui.addRecord = false;
      this.editForm.id = row.id;
      this.editForm.contact = row.contact;
      this.editForm.name = row.name;
      this.editForm.title = row.title;
      this.editForm.mobile = row.mobile;
      this.editForm.qq = row.qq;
      this.editForm.weixin = row.weixin;
    },
    handleDelete: function(row) {
      this.$confirm('此操作将删除当前记录，是否继续？', '请确认', {confirmButtonText:'确定', cancelButtonText: '取消', type: 'warning'})
        .then(() => {
          console.log('trying to delete');
          this.$http.delete('/api/contacts/ids/'+row.id)
            .then(()=>{
              this.$message({type:'info', message:'删除成功！'});
              this.loadAllContacts();
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
      this.editForm.contact = row.contact;
      this.editForm.name = row.name;
      this.editForm.title = row.title;
      this.editForm.mobile = row.mobile;
      this.editForm.qq = row.qq;
      this.editForm.weixin = row.weixin;
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
          this.$http.post('/api/contacts', record)
            .then(()=>{
              this.$message({type:'info', message:'保存成功！'});
              this.ui.dialogVisible = false;
              this.loadAllContacts();
            }, ()=>{
              this.$message({type:'warning', message:'保存失败!'});
            });
        }
        else {  // 3. 更新记录
          console.log('Update record...');
          let record = this.editForm;
          this.$http.post('/api/contacts/'+record.contact, record)
            .then(()=>{
              this.$message({type:'info', message:'保存成功！'});
              this.ui.dialogVisible = false;
              this.loadAllContacts();
            }, ()=>{
              this.$message({type:'warning', message:'保存失败!'});
            });
        }
      }));
    }    
  }
}
</script>