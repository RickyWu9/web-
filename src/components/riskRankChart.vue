<template>
    <div id="riskRankChart" >
        <el-row>风险排行</el-row>
        <span>开始日期</span>
        <el-date-picker v-model="startMonth" type="month" placeholder="选择月"   value-format="yyyy-MM">
        </el-date-picker>
        <span style="margin-left: 100px">结束日期</span>
        <el-date-picker v-model="endMonth" type="month" placeholder="选择月"   value-format="yyyy-MM">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-thumb" @click="change()" style="margin-left: 245px">确认</el-button>
        <div id="riskRankGraph" style="width: 1000px;height: 500px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        </div>
    </div>
</template>

<script>
    import * as echarts from "echarts";

    export default {
        name: "riskRankChart",
        data(){
            return {
                district:'',
                startMonth:'01',
                endMonth:'12',
                riskRankKeyList:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                riskRankValueList:['0.5', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                chart:{},
                option:{},

            }
        },
        mounted(){
            this.chart = echarts.init(document.getElementById('riskRankGraph'));
            this.option = {
                textStyle:{
                    color:'#000000',
                    fontSize:'16'
                },
                title: {
                    textStyle:{
                        color:'#050505',

                    },
                    left:'50%',
                    text: '',
                    /* subtext: '数据来自网络'*/
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {

                    textStyle:{
                        color:'#000000',
                    },
                    /* data: [titleName],*/
                },
                grid: {//设置图表位置
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    color:'#000000',
                    splitLine : {//去掉网格线
                        show : false
                    },
                    position: 'top',//X轴位置
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisLabel : {//坐标轴刻度标签的相关设置
                        rotate:'45',//坐标轴文字旋转角度
                        show : true,
                        textStyle : {
                            color : '#FFF',
                            align : 'right',
                            fontSize: 15
                        }
                    },

                    axisLine : {

                        lineStyle : {
                            color : '#FFF'
                        }
                    },
                    axisTick : {
                        lineStyle : {
                            color : '#FFF'
                        }
                    },
                },
                yAxis: {
                    type: 'category',//轴的类型分两种 1.category（类别）2.value(值)
                    data: /*da*/this.riskRankKeyList,
                    axisLabel : {
                        show : true,
                        textStyle : {
                            color : '#030303',
                            align : 'right',
                            fontSize: 15    /*文字大小*/
                        }
                    },
                    axisLine : {
                        lineStyle : {
                            color : '#2b2b2b'//轴的颜色
                        }
                    },
                    axisTick : {
                        lineStyle : {
                            color : '#ffffff'//轴上点的颜色
                        }
                    },

                },
                series: [
                    {
                        name: '处罚风险',
                        type: 'bar',
                        data: /*aa*/this.riskRankValueList,/*请求回来的数据数组*/

                        label : {
                            normal : {
                                show : true,//显示数字
                                position : 'right',
                            }
                        },

                        barWidth : 15,//柱子宽度
                        itemStyle : {
                            normal : {
                                color:'#46b4f5',//柱状的颜色
                                label : {
                                    textStyle : {
                                        fontSize : '15',//柱状上的显示的文字
                                        color:'black'
                                    }
                                }
                            }
                        },

                    }

                ]
            };
            this.chart.setOption(this.option);
        },
        methods: {
            change(){
                //选择日期范围
            }
        }
    }
</script>

<style scoped>

</style>