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
                        <el-col :span="4"><div class="text item"><icon name="comment" class="icon"></icon>详细信息：</div></el-col>
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
                        <el-col :span="4"><div class="text item"><icon name="exclamation-triangle" class="icon"></icon>警告级别：</div></el-col>
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
                                    <icon name="brands/qq" class="icon"></icon>： {{code.qq}} <br>
                                    <icon name="brands/weixin" class="icon"></icon>： {{code.weixin}}
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            <!--</el-col>
        </el-row>-->
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as Utils from '../utils';

import Icon from 'vue-awesome/components/Icon.vue';
import 'vue-awesome/icons';
// import 'vue-awesome/icons/qq'
// import 'vue-awesome/icons/mobile'
// import 'vue-awesome/icons/weixin'
Vue.component('Icon', Icon);

@Component({
    components: {
        Icon
    }
})
export default class Codes extends Vue {
    code = {
        code: '',
        system: '',
        description: '',
        solution: ''
    };

    async mounted() {
        this.getCodeDetails();
    };

    // watch: {
    //     // 如果路由有变化，会再次执行该方法
    //     '$route': 'getCodeDetails'
    // },
    async getCodeDetails() {
        console.log(this.$route.params.code);
        console.log('Hello..........................');

        let result = await Utils.doGet(this, '/api/codes/' + this.$route.params.code);
        if (result.success) {
            console.log(result.data);
            this.code = result.data;
        } else {
            var ret: any = {};
            ret.code = 'ERR';
            ret.system = 'ERR';
            ret.description = result.message;
            this.code = ret;
        }
    }
};
</script>

<style>
.icon {
    color:grey;
    width: 32px;
}
</style>
