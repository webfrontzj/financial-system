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
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="科目名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="上级科目">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="科目类别">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option key="bbk" label="流动资产" value="bbk"></el-option>
                            <el-option key="xtc" label="固定资产" value="xtc"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="余额方向">
                        <el-radio-group v-model="form.resource">
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
export default {
    name: 'baseform',
    data() {
        return {
            options: [
                {
                    value: 'guangdong',
                    label: '广东省',
                    children: [
                        {
                            value: 'guangzhou',
                            label: '广州市',
                            children: [
                                {
                                    value: 'tianhe',
                                    label: '天河区'
                                },
                                {
                                    value: 'haizhu',
                                    label: '海珠区'
                                }
                            ]
                        },
                        {
                            value: 'dongguan',
                            label: '东莞市',
                            children: [
                                {
                                    value: 'changan',
                                    label: '长安镇'
                                },
                                {
                                    value: 'humen',
                                    label: '虎门镇'
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 'hunan',
                    label: '湖南省',
                    children: [
                        {
                            value: 'changsha',
                            label: '长沙市',
                            children: [
                                {
                                    value: 'yuelu',
                                    label: '岳麓区'
                                }
                            ]
                        }
                    ]
                }
            ],
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: true,
                type: ['步步高'],
                resource: '小天才',
                desc: '',
                options: []
            }
        };
    },
    methods: {
        onSubmit() {
            this.$message.success('提交成功！');
        }
    }
};
</script>