<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 编辑科目
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="科目编码">
                        <el-input v-model="form.subject_num"></el-input>
                    </el-form-item>
                    <el-form-item label="科目名称">
                        <el-input v-model="form.subject_name"></el-input>
                    </el-form-item>
                    <el-form-item label="上级科目">
                        <el-input v-model="form.subject_father"></el-input>
                    </el-form-item>
                    <el-form-item label="科目类别">
                        <el-select v-model="form.subject_type" placeholder="请选择">
                            <el-option key="bbk" label="流动资产" value="bbk"></el-option>
                            <el-option key="xtc" label="固定资产" value="xtc"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="余额方向">
                        <el-radio-group v-model="form.balance_type">
                            <el-radio label="借"></el-radio>
                            <el-radio label="贷"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    
                    <el-form-item label="辅助核算">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="客户" name="type"></el-checkbox>
                            <el-checkbox label="供应商" name="type"></el-checkbox>
                            <el-checkbox label="职员" name="type"></el-checkbox>
                            <el-checkbox label="部门" name="type"></el-checkbox>
                            <el-checkbox label="存货" name="type"></el-checkbox>
                        </el-checkbox-group>
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
            soa_id:'',
            form: {
                subject_num: '',
                subject_name: '',
                subject_father: '',
                subject_type: '',
                balance_type: '',
                balance_type:'',
                soa_id:'',
                num:'',
                money:''
            }
        };
    },
    created(){
        this.soa_id=localStorage.getItem('accountBookId');
        const soa_id=axios.get('/subject/setofaccount');
            console.log(soa_id);
    },
    methods: {
        onSubmit() {
            
            const result=axios.post('/subject',{
                subject_num:this.form.success,
                subject_name:this.form.subject_name,
                subject_father:this.form.subject_father,
                subject_type:this.form.subject_type,
                balance_type:this.form.balance_type,
                num:this.form.num,
                money:this.form.money,
                soa_id:this.soa_id
            });
            if(result.code == 200){
                this.$message.success('提交成功！');
                this.$router.push('/subject');
            }
            
        }
    }
};
</script>