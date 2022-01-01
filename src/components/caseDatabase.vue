<template>
    <div id="caseDatabase">
        <el-row type="flex"  >
            <el-col :span="12" style="margin-left: 50px;font-weight: bold">
                案例名称搜索：
                <el-input
                        placeholder="请输入案例名称"
                        prefix-icon="el-icon-search"
                        v-model="searchName"
                        style="width: 400px">
                </el-input>
            </el-col>
            <el-col :span="2" style="margin-left: 10px">
                <el-button type="primary" icon="el-icon-search" @click="nameSearchClick">搜索</el-button>
            </el-col>
            <el-col :span="3" style="padding-left: 10px">
                <el-button type="primary"  icon="el-icon-search" @click="isDetailSearchVisible=true">详细搜索</el-button>
            </el-col>
            <el-col :span="3" style="padding-left: 5px" >
                <el-button type="warning" icon="el-icon-folder" v-if="!isBatchProcess" @click="isBatchProcess=true">批量管理</el-button>
                <el-button type="warning" icon="el-icon-loading" v-else @click="isBatchProcess=true">正在批量管理</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" style="margin-top: 20px" justify="center">
            <el-col :span="3"  v-if="isBatchProcess">
                <el-button type="danger" icon="el-icon-folder-remove"  @click="isBatchProcess=false">删除选中文书</el-button>
            </el-col>
            <el-col :span="3"  v-if="isBatchProcess" style="padding-left: 50px">
                <el-button type="info" icon="el-icon-close"  @click="isBatchProcess=false">取消批量管理</el-button>
            </el-col>
        </el-row>
        <div style="width: 1300px;padding-left: 50px">
            <el-table
                    ref="multipleTable"
                    :data="this.docList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column
                        type="selection"
                        width="50"
                        v-if="isBatchProcess">

                </el-table-column>
                <el-table-column
                        label="日期"
                        width="150"
                >
                    <template slot-scope="scope">{{ scope.row.penaltyDate }}</template>
                </el-table-column>
                <el-table-column
                        prop="penaltyName"
                        label="行政处罚名称"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="decisionNumber"
                        label="行政处罚文号"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="punishedPartyName"
                        label="处罚当事人"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="penaltyBasis"
                        label="行政处罚依据"
                        width="300">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="300">
                    <template slot-scope="scope">
                    <el-button type="success" icon="el-icon-zoom-in" size="mini" @click="detailCheckClick(scope.row)">查看</el-button>
                    <el-button type="success" icon="el-icon-zoom-in" size="mini" v-if="!isBatchProcess" @click="docModifyClick(scope.row)">修改</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" v-if="!isBatchProcess">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
<!--        文书详细信息查看-->
        <el-dialog
                title="文书详情"
                :visible.sync="isDetailCheckVisible">
            <el-form ref="form" :model="docSelected" label-width="150px" style="font-weight: bold">
                <el-form-item label="日期:">
                    {{docSelected.penaltyDate}}
                </el-form-item>
                <el-form-item label="行政处罚名称:">
                    {{docSelected.penaltyName}}
                </el-form-item>
                <el-form-item label="行政处罚文号:">
                    {{docSelected.decisionNumber}}
                </el-form-item>
                <el-form-item label="处罚当事人:">
                    {{docSelected.punishedPartyName}}
                </el-form-item>
                <el-form-item label="行政处罚依据:">
                    {{docSelected.penaltyBasis}}
                </el-form-item>
                <el-form-item label="处罚类型:">
                    {{docSelected.penaltyType}}
                </el-form-item>
                <el-form-item label="主要负责人姓名:">
                    {{docSelected.mainInChargeName}}
                </el-form-item>
                <el-form-item label="主要违法违规事实:">
                    {{docSelected.penaltyCause}}
                </el-form-item>
                <el-form-item label="行政机关:">
                    {{docSelected.agencyName}}
                </el-form-item>
                <el-form-item label="行政处罚决定:">
                    {{docSelected.penaltyDecision}}
                </el-form-item>
                <el-form-item label="行政处罚种类:">
                    {{docSelected.penaltyCategory}}
                </el-form-item>
            </el-form>
            <el-footer>
                <el-button @click="isDetailCheckVisible=false" style="float: right">关闭</el-button>
            </el-footer>

        </el-dialog>
<!--        文书信息修改-->
        <el-dialog
                title="文书修改"
                :visible.sync="isDocModifyVisible">
            <el-form ref="form" :model="docModifyForm" label-width="150px" style="font-weight: bold">
                <el-form-item label="日期">
                    <el-date-picker type="date" v-model="docModifyForm.penaltyDate"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    style="left: 0"></el-date-picker>
                </el-form-item>
                <el-form-item label="行政处罚名称:">
                    <el-input v-model="docModifyForm.penaltyName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="行政处罚文号:">
                    <el-input v-model="docModifyForm.decisionNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="处罚当事人:">
                    <el-input v-model="docModifyForm.punishedPartyName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="行政处罚依据:">
                    <el-input v-model="docModifyForm.penaltyBasis" autocomplete="off"></el-input>
                </el-form-item>
<!--                <el-form-item label="处罚类型:">-->
<!--                    {{docSelected.penaltyType}}-->
<!--                </el-form-item>-->
<!--                <el-form-item label="主要负责人姓名:">-->
<!--                    {{docSelected.mainInChargeName}}-->
<!--                </el-form-item>-->
<!--                <el-form-item label="主要违法违规事实:">-->
<!--                    {{docSelected.penaltyCause}}-->
<!--                </el-form-item>-->
<!--                <el-form-item label="行政机关:">-->
<!--                    {{docSelected.agencyName}}-->
<!--                </el-form-item>-->
<!--                <el-form-item label="行政处罚决定:">-->
<!--                    {{docSelected.penaltyDecision}}-->
<!--                </el-form-item>-->
<!--                <el-form-item label="行政处罚种类:">-->
<!--                    {{docSelected.penaltyCategory}}-->
<!--                </el-form-item>-->
            </el-form>
            <el-footer>
                <el-button @click="isDocModifyVisible=false" style="float: right;padding-left: 20px">取消修改</el-button>
                <el-button type="primary" @click="confirmDocModifyClick" style="float: right;margin-right: 20px">确认修改</el-button>
            </el-footer>
        </el-dialog>
<!--        文书详细搜索-->
        <el-dialog
                title="文书详细搜索"
                :visible.sync="isDetailSearchVisible">
            <el-form ref="form" :model="searchForm" label-width="100px" style="left: 0">
                <el-form-item label="日期">
                    <el-col :span="5">
                        <el-date-picker type="date" placeholder="选择日期"
                                        v-model="searchForm.penaltyDate"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"
                                        style="width: 100%;">

                        </el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="行政处罚名称">
                    <el-input v-model="searchForm.penaltyName" ></el-input>
                </el-form-item>
                <el-form-item label="行政处罚文号">
                    <el-input v-model="searchForm.decisionNumber"></el-input>
                </el-form-item>
                <el-form-item label="处罚当事人">
                    <el-input v-model="searchForm.punishedPartyName"></el-input>
                </el-form-item>
                <el-form-item label="行政处罚依据">
                    <el-input v-model="searchForm.penaltyBasis"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="isDetailSearchVisible=false" style="float: right;padding-left: 20px">取消修改</el-button>
                    <el-button type="primary" @click="confirmDetailSearchClick()" style="float: right;margin-right: 20px">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "caseDatabase",
        data(){
            return{
                isDetailSearchVisible:false,
                isDetailCheckVisible:false,
                isDocModifyVisible:false,
                isSearched:false,
                isBatchProcess:false,
                docList:[{
                    penaltyDate:"1237-12-4",
                    penaltyName:123,
                    decisionNumber:123,
                    punishedPartyName:321,
                    penaltyDecision:432,
                    penaltyBasis:1414,
                    penaltyType:15151,
                    mainInChargeName:115,
                    penaltyCause:"afaf",
                    agencyName:412421,
                    penaltyCategory:124115,
                }],
                searchName:"",
                searchForm:{},
                docModifyForm:{},
                createForm:{},
                docSelected:{},
            }
        },
        methods:{
            nameSearchClick(){
                //TODO
                //searchName
            },
            handleSelectionChange(){

            },
            detailCheckClick(info){
                this.isDetailCheckVisible=true;
                this.docSelected=info;
            },
            docModifyClick(info){
                this.isDocModifyVisible=true;
                this.docSelected=info;
                this.docModifyForm=JSON.parse(JSON.stringify(info));
            },
            //TODO
            confirmDocModifyClick(){
                if(this.isObjectValueEqual(this.docModifyForm,this.docSelected)){
                    this.$message({
                        type:"warning",
                        message:"文书内容未作修改！",
                    })
                }else{
                    this.docSelected.penaltyDate=this.docModifyForm.penaltyDate
                    this.docSelected.penaltyName=this.docModifyForm.penaltyName
                    this.docSelected.decisionNumber=this.docModifyForm.decisionNumber
                    this.docSelected.punishedPartyName=this.docModifyForm.punishedPartyName
                    this.docSelected.penaltyBasis=this.docModifyForm.penaltyBasis
                    this.isDocModifyVisible=false;
                }
            },
            //TODO
            confirmDetailSearchClick(){
                this.isDetailSearchVisible=false;
            },
            isObjectValueEqual(a, b) {
                var aProps = Object.getOwnPropertyNames(a);
                var bProps = Object.getOwnPropertyNames(b);
                if (aProps.length != bProps.length) {
                    return false;
                }

                for (var i = 0; i < aProps.length-1; i++) {
                    var propName = aProps[i];
                    var propA = a[propName];
                    var propB = b[propName];

                    if ( propA !=propB) {
                        console.log(propA,propB)
                        return false;
                    }
                }
                return true;
            },

        }
    }
</script>

<style scoped>

</style>