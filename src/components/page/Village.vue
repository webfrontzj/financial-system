<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 村庄管理
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div>
                <el-button type="primary" @click="addLayer=true">添加村庄</el-button>
            </div>
        </div>
        <div class="container">
            
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="number" label="村庄编号" align="center"></el-table-column>
                <el-table-column prop="name" label="村庄名称"></el-table-column>
                <el-table-column prop="parent" label="父级"></el-table-column>
                
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <!-- 弹层式编辑 -->
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 添加村庄 -->
        <el-dialog title="添加村庄" :visible.sync="addLayer" width="30%">
            <el-form ref="addform" :model="addform" label-width="70px">
                <el-form-item label="村庄编号">
                    <el-input v-model="addform.number"></el-input>
                </el-form-item>
                <el-form-item label="村庄名称">
                    <el-input v-model="addform.name"></el-input>
                </el-form-item>
                <el-form-item label="父级单位">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addLayer = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>

<script>
import axios from '../../utils/request'
export default {
    name: 'basetable',
    data() {
        return {
            addLayer:false,
            addform:{

            },
            options: [],
            value:1,
            isEdit:false,
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            identity:0
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 用户列表
        async getData() {
            const result=await axios.get('/village/');
            if(result.code == 200){
                this.tableData=result.data;
            }
            this.options=(await axios.get('/village/?info'))['data'];
        },
        async saveAdd(){
            if(this.isEdit){
                const result=await axios.put('/village/',{
                    v_id:this.addform.id,
                    number:this.addform.number,
                    name:this.addform.name,
                    parent_id:this.value
                });
                if(result.code == 200){
                    this.$message.success('添加成功');
                    this.addLayer = false;
                    this.getData();
                }
            }else{
                const result=await axios.post('/village/',{
                    number:this.addform.number,
                    name:this.addform.name,
                    parent_id:this.value
                });
                if(result.code == 200){
                    this.$message.success('添加成功');
                    this.addLayer = false;
                    this.getData();
                }
            }
            
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(async() => {
                    await axios.request({
                        url:'/village/',
                        method:'delete',
                        data:{
                            v_id:row.id
                        }
                    })
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        
        // 编辑操作
        handleEdit(index, row) {
            this.isEdit=true;
            this.addLayer=true;
            this.addform=row;
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
