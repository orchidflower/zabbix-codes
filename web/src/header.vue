<template>
    <el-row id="header" type="flex" justify="center" class="appheader el-menu--dark">
        <el-col :span="16"><h2 style="color:white">Zabbix Codes</h2></el-col>
        <el-col :span="8">
            <el-row justify="end">
                <el-col>
                    <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
                        <el-menu-item index="1"><router-link to="/index">错误码维护</router-link></el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">错误码</template>
                            <el-menu-item index="2-1"><router-link to="/codes/SYS-00-100">Codes SYS-00-100</router-link></el-menu-item>
                            <el-menu-item index="2-2"><router-link to="/codes/SYS-00-101">Codes SYS-00-101</router-link></el-menu-item>
                        </el-submenu>
                        <el-menu-item index="3"><router-link to="/system">系统维护</router-link></el-menu-item>
                        <el-menu-item index="4"><router-link to="/contact">联系人维护</router-link></el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<style scoped>
/*#header {
    background: rgb(32,160,255);
}*/
a {
    text-decoration: none;
    color: inherit;
}
</style>