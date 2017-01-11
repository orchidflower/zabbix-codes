<template>
    <div>
        <el-breadcrumb separator="/" class="appnav">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        </el-breadcrumb>      
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="queryForm.code" placeholder="错误码"></el-input>
            </el-form-item><el-form-item>
                <el-select v-model="queryForm.system" placeholder="所属系统" :clearable="true">
                    <el-option
                    v-for="item in allSystems"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleQuery">查询</el-button>
            </el-form-item>
            <el-form-item align="right">
                <el-button type="primary" @click="handleAdd">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="filteredTableData" style="width: 100%" v-loading.body="loading">
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
          <el-form :model="editForm" :rules="editFormRules" label-width="100px" ref="editForm">
            <el-form-item label="错误码" prop="code">
    					<el-input v-model="editForm.code" auto-complete="off" v-bind:readonly="ui.dialogReadonly" ref="codeInput"></el-input>
		    		</el-form-item>
            <el-form-item label="所属系统" prop="system">
                <el-select v-model="editForm.system" placeholder="请选择系统">
                    <el-option
                    v-for="item in allSystems"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>              
            </el-form-item>
            <el-form-item label="报警级别" prop="level">
                <el-select v-model="editForm.level" placeholder="请选择报警级别">
                    <el-option
                    v-for="item in allLevels"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>              
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
            <el-form-item label="联系人" prop="contact">
                <el-select v-model="editForm.contact" placeholder="请选择联系人">
                    <el-option
                    v-for="item in allContacts"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>              
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
export default {
  data() {
    return {
      allSystems: [],
      allContacts: [],
      allLevels: [],
      ui: {
        // 对话框是否可见
        dialogVisible: false,
        // 对话框的内容是否允许编辑
        dialogReadonly: true,
        // 是新增记录还是编辑记录
        addRecord: false,
      },
      editForm: {system:'', level:'', contact:''},
      editFormRules: {
        code: [{required: true, message: '请输入错误码', trigger: 'blur'}],
        title: [{required: true, message: '请输入错误信息', trigger: 'blur'}],
        description: [{required: true, message: '请输入详细信息', trigger: 'blur'}],
        solution: [{required: true, message: '请输入解决办法', trigger: 'blur'}],
      },
      queryForm: { code: '', system:''},
      tableData: [],
      loading: false
    }
  },
  computed: {
    filteredTableData: function() {
      let self = this;
      var system = this.queryForm.system;
      var code = this.queryForm.code;
      if (code=='' && system=='') return self.tableData;
      if (code=='') {
        return self.tableData.filter(function(item){
          return item.system==system;
        });
      }
      if (system=='') {
        return self.tableData.filter(function(item){
          return item.code.indexOf(code)!=-1;
        });
      }
      return self.tableData.filter(function(item){
        return item.system==system && item.code.indexOf(code)!=-1;
      });
    }
  },

  mounted: function () {
    this.loadAllCodes();
    this.loadAllSystems();
    this.loadAllLevels();
    this.loadAllContacts();
  },

  methods: {
    loadAllSystems: function () {
      this.loading = true;
      this.$http.get('/api/systems/all').then((response) => { // Success
        if (response.body.success==true) {
          let data = response.body.data;
          let _this = this;
          this.allSystems = [];
          data.forEach(function(item){
            _this.allSystems.push({label: item.name, value: item.system})
          });
        }
        this.loading = false;
      }, (response) => { // Failure

      })
    },
    loadAllContacts: function() {
      this.$http.get('/api/contacts/all').then((response) => { // Success
        // console.log(response.body);
        if (response.body.success==true) {
          let data = response.body.data;
          this.allContacts = [];
          let _this = this;
          data.forEach(function(item){
              _this.allContacts.push({label: item.name, value: item.contact});
          });
        }
      }, (response) => { // Failure
      })
    },    
    loadAllLevels: function () {
      this.loading = true;
      this.$http.get('/api/support/levels').then((response) => { // Success
        if (response.body.success==true) {
          let data = response.body.data;
          let self = this;
          this.allLevels = [];
          data.forEach(function(item){
            self.allLevels.push({label: item.name, value: item.level})
          });
        }
        this.loading = false;
      }, (response) => { // Failure

      })
    },
        
    loadAllCodes: function() {
      this.loading = true;
      this.$http.get('/api/codes/all').then((response) => { // Success
        if (response.body.success==true) {
          this.tableData = response.body.data;
        }
        this.loading = false;
      }, (response) => { // Failure

      })
    },
    handleView: function(row) {
      this.ui.dialogVisible = true;
      this.ui.dialogReadonly = true;
      this.ui.addRecord = false;
      this.editForm.id = row.id;
      this.editForm.code = row.code;
      this.editForm.level = row.level;
      this.editForm.system = row.system;
      this.editForm.title = row.title;
      this.editForm.description = row.description;
      this.editForm.solution = row.solution;
      this.editForm.contact = row.contact;
    },
    handleEdit: function(row) {
      // console.log(vm);
      this.ui.dialogVisible = true;
      this.ui.dialogReadonly = false;
      this.ui.addRecord = false;
      this.editForm.id = row.id;
      this.editForm.code = row.code;
      this.editForm.level = row.level;
      this.editForm.system = row.system;
      this.editForm.title = row.title;
      this.editForm.description = row.description;
      this.editForm.solution = row.solution;
      this.editForm.contact = row.contact;
      let _this = this;
      this.__proto__.$nextTick(() => {
        _this.$refs.codeInput.autofocus=true;
      });
    },
    handleAdd: function() {
      this.ui.dialogVisible = true;
      this.ui.dialogReadonly = false;
      this.ui.addRecord = true;
      this.editForm.id = '';
      this.editForm.code = '';
      this.editForm.system = '';
      this.editForm.level = '';
      this.editForm.title = '';
      this.editForm.description = '';
      this.editForm.solution = '';
      this.editForm.contact = '';
    },
    handleDelete: function(row) {
      this.$confirm('此操作将删除当前记录，是否继续？', '请确认', {confirmButtonText:'确定', cancelButtonText: '取消', type: 'warning'})
        .then(() => {
          this.$http.delete('/api/codes/ids/'+row.id)
            .then(()=>{
              this.$message({type:'info', message:'删除成功！'});
              this.loadAllCodes();
            }, ()=>{
              this.$message({type:'warning', message:'删除失败！'});
            });
        }).catch(() => {
          console.log('Cancel delete...');
        });
    },
    handleRedirect: function(row) {
      let code = row.code;
      this.$router.push({path: '/codes/'+code});
    },
    handleSaveOrUpdate: function() {
      // 0. 校验数据
      if (this.$refs.editForm.validate((valid)=>{
        if (!valid) // 1. 数据不符合校验规则，返回
          return;
        // 2. 新增记录
        if (this.ui.addRecord) {
          let record = this.editForm;
          this.$http.post('/api/codes', record)
            .then(()=>{
              this.$message({type:'info', message:'保存成功！'});
              this.ui.dialogVisible = false;
              this.loadAllCodes();
            }, ()=>{
              this.$message({type:'warning', message:'保存失败!'});
            });
        }
        else {  // 3. 更新记录
          let record = this.editForm;
          this.$http.post('/api/codes/'+record.code, record)
            .then(()=>{
              this.$message({type:'info', message:'保存成功！'});
              this.ui.dialogVisible = false;
              this.loadAllCodes();
            }, ()=>{
              this.$message({type:'warning', message:'保存失败!'});
            });
        }
      }));
    },
    handleQuery: function() {
      console.log('Try to query....');
    }
  }
}
</script>