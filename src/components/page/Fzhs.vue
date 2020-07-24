<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 辅助核算
                </el-breadcrumb-item>
            </el-breadcrumb>
            <el-button type="primary" @click="dialogFormVisible = true">新增分类</el-button>
        </div>
        <div class="container">
            <el-card v-for="item in soa_list" :key="item.id" class="box-card" body-style="{padding:'100px'}">
                <div slot="header" class="clearfix">
                    <span>{{item.name}}</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="editAccount(item.id,item.name)">编辑</el-button>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="handleDelete(item.id)">删除</el-button>
                </div>
                <!-- <div v-for="o in 4" :key="o" class="text item">
                    {{'联系人' + o }}
                </div> -->
                
            </el-card>


            <!-- 新建帐套弹层 -->
            <el-dialog title="新增分类" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
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
        async getData() {
            let result=await axios.get('/subject/assist');
            if(result.code == 200){
                this.soa_list=result.data;
            }
        },
        async addAccountBook(){
            this.dialogFormVisible = false;
            if(this.isEdit){
                let result=await axios.put('/subject/assist',{
                        ass_id:this.currentAccountId,
                        ass_name:this.form.name
                    });
                if(result.code == 200){
                    this.getData();
                }
                this.isEdit=false;
            }else{
                let result=await axios.post('/subject/assist',{
                        name:this.form.name,
                    });
                if(result.code == 200){
                    this.getData();
                }
            }
            
        },
        async editAccount(id,name,date){
            this.dialogFormVisible=true;
            this.currentAccountId=id;
            this.form.name=name;
            this.isEdit=true;
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(id) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(async() => {
                    await axios.request({
                        url:'/subject/assist',
                        method:'delete',
                        data:{
                            ass_id:id
                        }
                    })
                    this.$message.success('删除成功');
                    this.getData();
                })
                .catch(() => {});
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
