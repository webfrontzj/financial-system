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
                    <el-form-item label="余额">
                        <el-input v-model="form.money"></el-input>
                    </el-form-item>
                    <el-form-item label="余额数量">
                        <el-input v-model="form.num"></el-input>
                    </el-form-item>
                    <el-form-item label="科目类别">
                        <el-select v-model="form.subject_type" placeholder="请选择">
                            <el-option key="zc" label="资产" value=0></el-option>
                            <el-option key="fz" label="负债" value=1></el-option>
                            <el-option key="qy" label="权益" value=2></el-option>
                            <el-option key="cb" label="成本" value=3></el-option>
                            <el-option key="sy" label="损益" value=4></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="余额方向">
                        <el-radio-group v-model="form.balance_type">
                            <el-radio label=0>借</el-radio>
                            <el-radio label=1>贷</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    
                    <el-form-item label="辅助核算">
                        <el-checkbox-group v-model="form.assists">
                            <el-checkbox v-for="item in ass_list" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
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
            code:null,
            ass_list:[],
            form: {
                subject_num: '',
                subject_name: '',
                subject_father: '',
                subject_type: '',
                balance_type: '',
                balance_type:'',
                assists:'',
                soa_id:'',
                num:'',
                money:''
            }
        };
    },
    async created(){
        this.soa_id=localStorage.getItem('accountBookId');
        
        if(this.$route.params.code){
            this.code=this.$route.params.code;
            let result=await axios.get(`/subject?sub_id=${this.code}`);
            if(result.code == 200){
                this.form=result.data.sub_info;
                this.ass_list=result.data.ass_list;
            }
        }else{
            let result=await axios.get('/subject?type=info');
            if(result.code == 200){
                this.ass_list=result.data;
            }
        }
    },
    methods: {
        async onSubmit() {
            if(this.code){
                const result=await axios.put('/subject/',{
                    sub_id:this.code,
                    subject_num:this.form.success,
                    subject_name:this.form.subject_name,
                    // subject_father:this.form.subject_father,
                    subject_type:this.form.subject_type,
                    balance_type:this.form.balance_type,
                    num:this.form.num,
                    money:this.form.money,
                    assists:this.form.assists.join(','),
                    soa_id:this.soa_id
                });
                if(result.code == 200){
                    this.$message.success('提交成功！');
                    this.$router.push({path:'/subject'});
                }
            }else{
                const result=await axios.post('/subject/',{
                    subject_num:this.form.success,
                    subject_name:this.form.subject_name,
                    // subject_father:this.form.subject_father,
                    subject_type:this.form.subject_type,
                    balance_type:this.form.balance_type,
                    num:this.form.num,
                    money:this.form.money,
                    assists:this.form.assists.join(','),
                    soa_id:this.soa_id
                });
                if(result.code == 200){
                    this.$message.success('提交成功！');
                    this.$router.push({path:'/subject'});
                }
            }
            
            
        }
    }
};
</script>