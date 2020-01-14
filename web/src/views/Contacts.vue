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
            <el-table-column prop="name" label="联系人" width="150"></el-table-column>
            <el-table-column prop="contact" label="邮箱" width="250"></el-table-column>
            <el-table-column prop="titlename" label="职位"></el-table-column>
            <el-table-column prop="mobile" label="手机号" width="120"></el-table-column>
            <el-table-column prop="qq" label="QQ" width="120"></el-table-column>
            <el-table-column prop="weixin" label="微信" width="120"></el-table-column>
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
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
        </el-table>
        <!-- 对话框 //-->
        <el-dialog title="详细信息" :visible.sync="ui.dialogVisible">
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
                    :key="item.id"
                    :label="item.name"
                    :value="item.title">
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
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as Utils from '../utils';

@Component
export default class Contacts extends Vue {
    allTitles = [];
    ui = {
        // 对话框是否可见
        dialogVisible: false,
        // 对话框的内容是否允许编辑
        dialogReadonly: true,
        // 是新增记录还是编辑记录
        addRecord: false
    };
    editForm = { id: '', title: '', contact: '', name: '', mobile: '', qq: '', weixin: '' };
    editFormRules = {
        contact: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        title: [{ required: true, message: '请选择职位', trigger: 'blur' }]
    };
    queryForm = { contact: '' };
    tableData = [];
    loading = false;
    get filteredTableData() {
        let self = this;
        let contact = this.queryForm.contact;
        if (contact === '') return self.tableData;
        return self.tableData.filter(function(item: any) {
            return item.contact.indexOf(contact) !== -1;
        });
    }

    get contactReadonly() {
        return !this.ui.addRecord;
    }

    async mounted() {
        this.loadAllContacts();
        this.loadAllTitles();
    }

    async loadAllContacts() {
        this.loading = true;
        console.log('*************************************');
        let result = await Utils.doGet(this, '/api/contacts/all');
        if (result.success) {
            this.tableData = result.data;
            this.loading = false;
        }
    }

    async loadAllTitles() {
        console.log('*************************************');
        let result = await Utils.doGet(this, '/api/support/titles');
        if (result.success) {
            this.allTitles = result.data;
        }
    }

    async handleAdd() {
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
    }

    async handleView(row: any) {
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
    }

    async handleDelete(row: any) {
        let confirmed = await Utils.confirm(this, '此操作将删除当前记录，是否继续？', '请确认');
        if (confirmed) {
            let result = await Utils.doDelete(this, '/api/contacts/ids/' + row.id);
            if (result.success) {
                await Utils.showSuccess('删除成功！');
                await this.loadAllContacts();
            } else {
                await Utils.showError('删除失败');
            }
        }
    }

    async handleEdit(row: any) {
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
            let result = await Utils.doPost(this, '/api/contacts', record);
            if (result.success) {
                await Utils.showSuccess('保存成功！');
                this.ui.dialogVisible = false;
                this.loadAllContacts();
            } else {
                await Utils.showError('保存失败！');
            }
        } else { // 3. 更新记录
            console.log('Update record...');
            let record = this.editForm;
            let result = await Utils.doPost(this, '/api/contacts/' + record.contact, record);
            if (result.success) {
                await Utils.showSuccess('保存成功！');
                this.ui.dialogVisible = false;
                this.loadAllContacts();
            } else {
                await Utils.showError('保存失败！');
            }
        }
    }
}
</script>
