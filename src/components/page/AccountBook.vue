<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 帐套管理
                </el-breadcrumb-item>
            </el-breadcrumb>
            <el-button type="primary" @click="dialogFormVisible = true">新建帐套</el-button>
        </div>
        <div class="container">
            <el-card v-for="item in soa_list" :key="item.id" class="box-card" body-style="{padding:'100px'}">
                <div slot="header" class="clearfix">
                    <span>{{item.name}}</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="selectBook(item.id)">选择帐套</el-button>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="editAccount(item.id,item.name,item.date)">编辑帐套</el-button>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="forbiddenAccount(item.id)">屏蔽帐套</el-button>
                </div>
                <!-- <div v-for="o in 4" :key="o" class="text item">
                    {{'联系人' + o }}
                </div> -->
                <div class="text item">暂无联系人</div>
                <div class="card-footer text item">会计期间：{{item.date}}</div>
            </el-card>


            <!-- 新建帐套弹层 -->
            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="帐套名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="帐套日期" :label-width="formLabelWidth">
                        <el-input :disabled="isEdit" v-model="form.date" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addAccountBook">确 定</el-button>
                </div>
            </el-dialog>
            
        </div>

    </div>
</template>

<script>
import axios from '../../utils/request'
export default {
    name: 'basetable',
    data() {
        return {
            soa_list:[],
            dialogFormVisible: false,
            form: {
                name: '',
                date:''
            },
            formLabelWidth: '100px',
            currentAccountId:1,
            isEdit:false,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        selectBook(id){
            localStorage.setItem('accountBookId',id);
        },
        async getData() {
            let result=await axios.get('/subject/setofaccount?type=list');
            if(result.code == 200){
                this.soa_list=result.data;
            }
        },
        async addAccountBook(){
            this.dialogFormVisible = false;
            if(this.isEdit){
                let result=await axios.put('/subject/setofaccount',{
                        soa_id:this.currentAccountId,
                        name:this.form.name
                    });
                if(result.code == 200){
                    this.getData();
                }
                this.isEdit=false;
            }else{
                let result=await axios.post('/subject/setofaccount',{
                        name:this.form.name,
                        date:this.form.date
                    });
                if(result.code == 200){
                    this.getData();
                }
            }
            
        },
        async forbiddenAccount(id){
            let result=await axios.post('/subject/setofaccount',{
                        soa_id:id,
                        is_shield:true
                    });
            if(result.code == 200){
                this.$message.success('屏蔽成功!');
            }
        },
        async editAccount(id,name,date){
            this.dialogFormVisible=true;
            this.currentAccountId=id;
            this.form.name=name;
            this.form.date=date;
            this.isEdit=true;
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(async() => {
                    await axios.request({
                        url:'/user',
                        method:'delete',
                        data:{
                            uid:row.uid
                        }
                    })
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        //屏蔽用户
        async handleShield(index,row){
            const result=await axios.put('/user/',{
                uid:row.uid,
                is_shield:true
            });
            if(result.code == 200){
                this.$message.success('屏蔽成功');
                this.tableData[index].is_shield=true;
            }else{
                this.$message.error(result.msg);
            }
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        async saveEdit() {
            this.editVisible = false;
            await axios.put('/user/',{
                uid:this.form.uid,
                username:this.form.username,
                phone_number:this.form.phone_number
            });
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.box-card {
    width: 400px;
}
.text {
    font-size: 14px;
}

.item {
    padding: 4px 0;
}
.card-footer{
    background: lightblue;
}
.container{
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
}
.clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
