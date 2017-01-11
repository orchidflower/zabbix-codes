<template>
    <div>
        <el-breadcrumb separator="/" class="appnav">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统维护</el-breadcrumb-item>
        </el-breadcrumb>

        <el-table :data="tableData" style="width: 100%">
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