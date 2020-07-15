<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 期初管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <template>
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                    prop="code"
                    label="科目编码"
                    align="center"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="科目名称"
                    align="center"
                    width="250">
                    </el-table-column>
                    <el-table-column
                    prop="direction"
                    label="方向"
                    align="center"
                    width="100">
                    </el-table-column>
                    <el-table-column align="center" label="期初余额">
                    <el-table-column
                        prop="numbers"
                        align="center"
                        label="数量">
                        <template slot-scope="scope">
                            <el-input v-model="scope.numbers" placeholder="请输入数量"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="values"
                        align="center"
                        label="金额">
                        <template slot-scope="scope">
                            <el-input v-model="scope.values" placeholder="请输入金额"></el-input>
                        </template>
                    </el-table-column>
                    </el-table-column>
                </el-table>
            </template>
        </div>

        
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [
                {
                    code:100,
                    name:'科目一',
                    direction:'借',
                    numbers:3000,
                    values:2888
                },
                {
                    code:101,
                    name:'科目六',
                    direction:'贷',
                    numbers:3236,
                    values:12892
                },
                {
                    code:107,
                    name:'科目九',
                    direction:'借',
                    numbers:266,
                    values:9128
                },
            ],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
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
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
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
        saveEdit() {
            this.editVisible = false;
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
