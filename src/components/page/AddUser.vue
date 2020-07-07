<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 添加用户
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="form.phone_number"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="角色">
                        <el-select v-model="form.identity" placeholder="请选择用户角色">
                            <el-option key="bbk" label="管理员" value=0></el-option>
                            <el-option key="xtc" label="财务管理人员" value=1></el-option>
                            <el-option key="imoo" label="财务主管" value=2></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../utils/request'
export default {
    name: 'baseform',
    data() {
        return {
            form: {
                username: '',
                phone_number: '',
                password:'',
                identity:'0'
            }
        };
    },
    methods: {
        async onSubmit() {
            await axios.post('/user/',{
                username:this.form.username,
                password:this.form.password,
                phone_number:this.form.phone_number,
                identity:this.form.identity
            })
            this.$message.success('提交成功！');
        }
    }
};
</script>