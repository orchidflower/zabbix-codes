<template>
    <div>
        <!-- Navigation //-->
        <el-breadcrumb separator="/" class="appnav">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        </el-breadcrumb>

        <!--Query Form  -->
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
            <el-form-item>
                <el-select v-model="queryForm.system" placeholder="所属系统" :clearable="true" filterable>
                    <el-option
                    v-for="item in allSystems"
                    :key="item.id"
                    :label="item.name"
                    :value="item.system">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="queryForm.code" placeholder="错误码"></el-input>
            </el-form-item>
            <el-form-item align="right">
                <el-button type="primary" @click="handleAdd">新增</el-button>
            </el-form-item>
            <el-form-item align="right">
                <el-button type="primary" @click="handleSearch">查询</el-button>
            </el-form-item>
        </el-form>

        <!--Table Area-->
        <el-table :data="filteredTableData" style="width: 100%" v-loading.body="loading">
            <el-table-column prop="code" label="错误码" width="120"></el-table-column>
            <el-table-column prop="systemname" label="所属系统" width="180"></el-table-column>
            <el-table-column prop="title" label="错误信息"></el-table-column>
            <!--<el-table-column prop="description" label="详细信息"></el-table-column>
            <el-table-column prop="solution" label="解决办法"></el-table-column>-->
            <el-table-column prop="contactname" label="联系人" width="100"></el-table-column>
            <el-table-column label="操作" :context="_self" fixed="right" width="150">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <el-button type="primary" size="small">
                    操作菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><el-button type="primary" icon="information" @click="handleView(scope.row)" >详细</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="primary" icon="edit" @click="handleEdit(scope.row)">编辑</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="primary" icon="delete" @click="handleDelete(scope.row)">删除</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="primary" icon="more" @click="handleRedirect(scope.row)">更多</el-button></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
        </el-table>

        <!-- 对话框 //-->
        <el-dialog title="详细信息" :visible.sync="ui.dialogVisible">
          <el-form :model="editForm" :rules="editFormRules" label-width="100px" ref="editForm">
            <el-form-item label="错误码" prop="code">
              <el-input v-model="editForm.code" auto-complete="off" v-bind:readonly="codeReadonly" ref="codeInput"></el-input>
            </el-form-item>
            <el-form-item label="所属系统" prop="system">
                <el-select v-model="editForm.system" placeholder="请选择系统" filterable>
                    <el-option
                    v-for="item in allSystems"
                    :key="item.id"
                    :label="item.name"
                    :value="item.system">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="报警级别" prop="level">
                <el-select v-model="editForm.level" placeholder="请选择报警级别" filterable>
                    <el-option
                    v-for="item in allLevels"
                    :key="item.id"
                    :label="item.name"
                    :value="item.level">
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
                <el-select v-model="editForm.contact" placeholder="请选择联系人" filterable>
                    <el-option
                    v-for="item in allContacts"
                    :key="item.id"
                    :label="item.name"
                    :value="item.contact">
                    </el-option>
                </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="ui.dialogVisible = false">取 消</el-button>
            <el-button v-if="ui.dialogReadonly==false" type="primary" @click.native="handleSaveOrUpdate()" >确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as Utils from '../utils';

@Component
export default class Index extends Vue {
  allSystems = [];
  allContacts = [];
  allLevels = [];
  ui = {
      // 对话框是否可见
      dialogVisible: false,
      // 对话框的内容是否允许编辑
      dialogReadonly: true,
      // 是新增记录还是编辑记录
      addRecord: false
  };
  editForm = { id: '', code: '', system: '', level: '', contact: '', title: '', description: '', solution: '' };
  editFormRules = {
      code: [{ required: true, message: '请输入错误码', trigger: 'blur' }],
      system: [{ required: true, message: '请选择所属系统', trigger: 'blur' }],
      level: [{ required: true, message: '请选择报警级别', trigger: 'blur' }],
      title: [{ required: true, message: '请输入错误信息', trigger: 'blur' }],
      description: [{ required: true, message: '请输入详细信息', trigger: 'blur' }],
      solution: [{ required: true, message: '请输入解决办法', trigger: 'blur' }],
      contact: [{ required: true, message: '请选择联系人', trigger: 'blur' }]
  };
  queryForm = { code: '', system: 'PSS-ADMIN' };
  tableData = [];
  loading = false;

  get filteredTableData() {
      let self = this;
      var system = this.queryForm.system;
      var code = this.queryForm.code;
      if (code === '' && system === '') return self.tableData;
      if (code === '') {
          return self.tableData.filter(function(item: any) {
              return item.system === system;
          });
      }
      if (system === '') {
          return self.tableData.filter(function(item: any) {
              return item.code.indexOf(code) !== -1;
          });
      }
      return self.tableData.filter(function(item: any) {
          return item.system === system && item.code.indexOf(code) !== -1;
      });
  }

  get codeReadonly() {
      return !this.ui.addRecord;
  }

  async mounted() {
      await this.loadAllCodes();
      await this.loadAllSystems();
      await this.loadAllLevels();
      await this.loadAllContacts();
  }

  async loadAllSystems() {
      let result = await Utils.doGet(this, '/api/systems/all');
      if (result.success) {
          this.allSystems = result.data;
          console.log(this.allSystems);
      }
  }

  async loadAllContacts() {
      let result = await Utils.doGet(this, '/api/contacts/all');
      if (result.success) {
          this.allContacts = result.data;
      }
  }

  async handleSearch() {
      await this.loadAllCodes();
  }

  async loadAllLevels() {
      let result = await Utils.doGet(this, '/api/support/levels');
      if (result.success) {
          this.allLevels = result.data;
      }
  }

  async loadAllCodes() {
      let result = await Utils.doGet(this, '/api/codes/all');
      if (result.success) {
          this.tableData = result.data;
      }
  }

  async handleView(row: any) {
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
  }

  async handleEdit(row: any) {
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
  }

  async handleAdd() {
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
  }

  async handleDelete(row: any) {
      let confirmed = await Utils.confirm(this, '此操作将删除当前记录，是否继续？', '请确认');
      if (confirmed) {
          let result = await Utils.doDelete(this, '/api/codes/ids/' + row.id);
          if (result.success) {
              await Utils.showSuccess('删除成功');
          } else {
              await Utils.showSuccess('删除失败成功');
          }
      }
  }

  async handleRedirect(row: any) {
      let code = row.code;
      this.$router.push({ path: '/codes/' + code });
  }

  async handleSaveOrUpdate() {
      // 0. 校验数据
      let validated = await Utils.validateForm(this.$refs.editForm);
      if (!validated) {
          return;
      }
      // 2. 新增记录
      if (this.ui.addRecord) {
          let record = this.editForm;
          let result = await Utils.doPost(this, '/api/codes', record);
          if (result.success) {
              await Utils.showSuccess('保存成功');
              this.ui.dialogVisible = false;
              await this.loadAllCodes();
          } else {
              Utils.showError('保存失败');
          }
      } else { // 3. 更新记录
          let record = this.editForm;
          let result = await Utils.doPost(this, '/api/codes/' + record.code, record);
          if (result.success) {
              await Utils.showSuccess('保存成功');
              this.ui.dialogVisible = false;
              await this.loadAllCodes();
          } else {
              Utils.showError('保存失败');
          }
      }
  }
};
</script>
