<template>
    <div>
        <!--<el-row type="flex" justify="center">
            <el-col :span=12>-->
                <el-breadcrumb separator="/" class="appnav">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>错误码信息</el-breadcrumb-item>
                </el-breadcrumb>
            <!--</el-col>
        </el-row>-->
        <!--<el-row type="flex" justify="center">
            <el-col :span=12>-->
                <el-card class="box-card">
                    <el-row>
                        <el-col :span="4"><div class="text item"><icon name="file" class="icon"></icon>错误码：</div></el-col>
                        <el-col :span="20"><div class="text item">{{code.code}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="text item"><icon name="tag" class="icon"></icon>错误信息：</div></el-col>
                        <el-col :span="20"><div class="text item">{{code.title}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="text item"><icon name="commenting" class="icon"></icon>详细信息：</div></el-col>
                        <el-col :span="20"><div class="text item">{{code.description}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="text item"><icon name="server" class="icon"></icon>所属系统：</div></el-col>
                        <el-col :span="20"><div class="text item">
                            {{code.systemname}}（<b>{{code.system}}</b>）<br>
                            <span class="description">
                                <icon name="comments" class="icon"></icon>{{code.systemdescription}}<br>
                                <icon name="user" class="icon"></icon>{{code.systemcontact}}
                            </span>
                        </div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="text item"><icon name="warning" class="icon"></icon>警告级别：</div></el-col>
                        <el-col :span="20">
                            <div class="text item">
                                {{code.levelname}} (<b>{{code.level}}</b>)<br>
                                <span class="description">
                                    <icon name="comments" class="icon"></icon>{{code.leveldescription}}<br>
                                    <icon name="user" class="icon"></icon>{{code.systemcontact}}
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="text item"><icon name="cog" class="icon"></icon>解决方案：</div></el-col>
                        <el-col :span="20"><div class="text item">{{code.solution}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="text item"><icon name="user" class="icon"></icon>联系人：</div></el-col>
                        <el-col :span="20">
                            <div class="text item">
                                {{code.contactname}}（{{code.contact}}）<br>
                                <span class="description">                                
                                    <icon name="mobile" scale="1.5" class="icon"></icon>： {{code.mobile}} <br>
                                    <icon name="qq" class="icon"></icon>： {{code.qq}} <br>
                                    <icon name="weixin" class="icon"></icon>： {{code.weixin}}
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            <!--</el-col>
        </el-row>-->
    </div>
</template>

<script>
import Vue from 'vue'
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons'
// import 'vue-awesome/icons/qq'
// import 'vue-awesome/icons/mobile'
// import 'vue-awesome/icons/weixin'
Vue.component('Icon', Icon);

    export default {
        mounted : function () {
            this.getCodeDetails();
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'getCodeDetails'
        },
        data() {
            return {
                code: {
                    code: '',
                    system: '',
                    description: '',
                    solution: ''
                }
            }
        },
        methods: {
            getCodeDetails :function() {
                console.log(this.$route.params.code);
                console.log("Hello..........................");
                
                this.$http.get('/api/codes/' + this.$route.params.code).then((response) => {
                    console.log(response.body);
                    if (response.body.success) {    // success callback
                        console.log(response.body.data);
                        return this.code = response.body.data;
                    } else {
                        var ret = {};
                        ret.code = 'ERR';
                        ret.system = 'ERR';
                        ret.description = response.body.message;
                        this.code = ret;
                    }
                }, (response) => {
                });
            }
        }
    }
</script>

<style>
.icon {
    color:grey;
    width: 32px;
}
</style>