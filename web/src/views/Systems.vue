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
                    :key="item.id"
                    :label="item.name"
                    :value="item.contact">
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
            <el-table-column prop="system" label="编码" width="120"></el-table-column>
            <el-table-column prop="name" label="系统名称" width="180"></el-table-column>
            <el-table-column prop="contactname" label="联系人" width="120"></el-table-column>
            <el-table-column prop="description" label="系统介绍"></el-table-column>
            <el-table-column label="操作" :context="_self" fixed="right" width="210">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-info" @click="handleView(scope.row)"></el-button>
                <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
                <!-- <el-dropdown trigger="click">
                  <el-button type="primary" size="small">
                    操作菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><el-button type="primary" icon="information" @click="handleView(scope.row)" >详细</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="primary" icon="edit" @click="handleEdit(scope.row)">编辑</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="primary" icon="delete" @click="handleDelete(scope.row)">删除</el-button></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown> -->
              </template>
            </el-table-column>
        </el-table>

        <!-- 对话框 //-->
        <el-dialog title="详细信息" :visible.sync="ui.dialogVisible">
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
                    :key="item.id"
                    :label="item.name"
                    :value="item.contact">
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
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as Utils from '../utils';

@Component
export default class Systems extends Vue {
      allContacts = [];
      ui = {
          // 对话框是否可见
          dialogVisible: false,
          // 对话框的内容是否允许编辑
          dialogReadonly: true,
          // 是新增记录还是编辑记录
          addRecord: false
      };
      editForm = { id: '', contact: '', system: '', name: '', description: '' };
      editFormRules = {
          system: [{ required: true, message: '请输入系统代码', trigger: 'blur' }],
          name: [{ required: true, message: '请输入系统名称', trigger: 'blur' }],
          description: [{ required: true, message: '请输入详细介绍', trigger: 'blur' }],
          contact: [{ required: true, message: '请选择联系人', trigger: 'blur' }]
      };
      queryForm = { system: '', contact: '' };
      tableData = [];
      loading = true

      get filteredTableData() {
          let self = this;
          let system = this.queryForm.system;
          let contact = this.queryForm.contact;
          if (system === '' && contact === '') {
              return self.tableData;
          }
          if (system === '') {
              return self.tableData.filter(function(item: any) {
                  return item.contact === contact;
              });
          }
          if (contact === '') {
              return self.tableData.filter(function(item: any) {
                  return item.system.indexOf(system) !== -1;
              });
          }
          return self.tableData.filter(function(item: any) {
              return item.system.indexOf(system) !== -1 && item.contact === contact;
          });
      }

      get systemReadonly() {
          return !this.ui.addRecord;
      }

      async mounted() {
          this.loadAllSystems();
          this.loadAllContacts();
      }

      async loadAllContacts() {
          let result = await Utils.doGet(this, '/api/contacts/all');
          if (result.success) {
              this.allContacts = result.data;
          }
      }
      async loadAllSystems() {
          console.log('*************************************');
          this.loading = true;
          let result = await Utils.doGet(this, '/api/systems/all');
          if (result.success) {
              this.tableData = result.data;
              this.loading = false;
          }
      }

      async handleAdd() {
          //   this.loadAllContacts();
          this.ui.dialogVisible = true;
          this.ui.dialogReadonly = false;
          this.ui.addRecord = true;
          this.editForm.id = '';
          this.editForm.system = '';
          this.editForm.name = '';
          this.editForm.contact = '';
          this.editForm.description = '';
      }
      // handleQuery: function() {

      // },
      async handleView(row: any) {
          this.ui.dialogVisible = true;
          this.ui.dialogReadonly = true;
          this.ui.addRecord = false;
          this.editForm.id = row.id;
          this.editForm.system = row.system;
          this.editForm.name = row.name;
          this.editForm.contact = row.contact;
          this.editForm.description = row.description;
      }

      async handleDelete(row: any) {
          let confirmed = await Utils.confirm(this, '此操作将删除当前记录，是否继续？', '请确认');
          if (confirmed) {
              console.log('trying to delete');
              let result = await Utils.doDelete(this, '/api/systems/ids/' + row.id);
              if (result.success) {
                  await Utils.showSuccess('删除成功！');
                  await this.loadAllSystems();
              }
          }
      }
      async handleEdit(row: any) {
          this.ui.dialogVisible = true;
          this.ui.dialogReadonly = false;
          this.ui.addRecord = false;
          this.editForm.id = row.id;
          this.editForm.system = row.system;
          this.editForm.name = row.name;
          this.editForm.contact = row.contact;
          this.editForm.description = row.description;
      }
      async handleSaveOrUpdate() {
          // 0. 校验数据
          let validated = await Utils.validateForm(this.$refs.editForm);
          if (!validated) { // 1. 数据不符合校验规则，返回
              return;
          }
          // 2. 新增记录
          if (this.ui.addRecord) {
              let record = this.editForm;
              console.log('Add record....', record);
              let result = await Utils.doPost(this, '/api/systems', record);
              if (result.success) {
                  this.ui.dialogVisible = false;
                  await Utils.showSuccess('保存成功！');
                  await this.loadAllSystems();
              } else {
                  await Utils.showError('保存失败！');
              }
          } else { // 3. 更新记录
              console.log('Update record...');
              let record = this.editForm;
              let result = await Utils.doPost(this, '/api/systems/' + record.system, record);
              if (result.success) {
                  await Utils.showSuccess('保存成功！');
                  this.ui.dialogVisible = false;
                  this.loadAllSystems();
              } else {
                  await Utils.showError('保存失败！');
              }
          }
      }
};
</script>
