<template>
    <div id="riskThermodynamicChart">
        <el-row>风险热力图</el-row>
        <span>开始日期</span>
        <el-date-picker v-model="startMonth" type="month" placeholder="选择月"   value-format="MM">
        </el-date-picker>
        <span style="margin-left: 100px">结束日期</span>
        <el-date-picker v-model="endMonth" type="month" placeholder="选择月"   value-format="MM">
        </el-date-picker>
        <div id="riskThermodynamicGraph" style="width: 1000px;height: 500px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        </div>
    </div>
</template>

<script>
    import * as echarts from "echarts";

    export default {
        name: "riskThermodynamicChart",
        data(){
            return {
                startMonth:'01',
                endMonth:'12',
                thermodynamicList: [{name: '北京',value: 420 },{name: '天津',value: 400 },
                    {name: '上海',value: 500 },{name: '重庆',value: 350 },
                    {name: '河北',value: 100 },{name: '河南',value: 200 },
                    {name: '云南',value: 180 },{name: '辽宁',value: 100 },
                    {name: '黑龙江',value: 100 },{name: '湖南',value: 300 },
                    {name: '安徽',value: 330 },{name: '山东',value: 200 },
                    {name: '新疆',value: 10 },{name: '江苏',value: 340 },
                    {name: '浙江',value: 400 },{name: '江西',value: 360 },
                    {name: '湖北',value: 300 },{name: '广西',value: 400 },
                    {name: '甘肃',value: 100 },{name: '山西',value: 100 },
                    {name: '内蒙古',value: 100 },{name: '陕西',value: 100 },
                    {name: '吉林',value: 100 },{name: '福建',value: 350 },
                    {name: '贵州',value: 100 },{name: '广东',value: 500 },
                    {name: '青海',value: 100 },{name: '西藏',value: 100 },
                    {name: '四川',value: 300 },{name: '宁夏',value: 100 },
                    {name: '海南',value: 100 },{name: '台湾',value: 100 },
                    {name: '香港',value: 300 },{name: '澳门',value: 200 },
                    {name: '南海诸岛',value: 100 }],
                chart:{},
                option:{},

            }
        },
        mounted(){
            this.chart = echarts.init(document.getElementById('riskThermodynamicGraph'));
            this.option = {
                tooltip: {//悬浮时显示
                    formatter: function (params) {
                        var info = '<p style="font-size:18px">' + params.name + '</p>'
                        // var info = '<p style="font-size:18px">' + params.name + '</p><p style="font-size:14px">这里可以写一些，想展示在页面上的别的信息</p>'
                        return info;
                    },
                    backgroundColor: "#ff7f50",//提示标签背景颜色
                    textStyle: { color: "#fff" } //提示标签字体颜色
                },
                //左侧小导航图标
                visualMap: {
                    min: 0,
                    max: 500,
                    left: 'left',
                    top: 'bottom',
                    text: ['高', '低'],//取值范围的文字
                    inRange: {
                        // color: ['#e0ffff', '#006edd']//取值范围的颜色
                        color: ['#e2ebf4', '#de1f05']//取值范围的颜色
                    },
                    show: true//图注
                },
                series: [
                    {
                        name: '中国',
                        type: 'map',
                        zoom: 1.2,   //这里是关键，一定要放在 series中，地图缩放比例的配置
                        mapType: 'china',

                        label: {//地图中的文字
                            normal: {//正常显示
                                show: false,//显示省份标签
                                textStyle: {
                                    fontSize: 10,
                                    color: '#6c6a6a'
                                }
                            },
                            // emphasis: {//悬浮时显示
                            //     show: true,//对应的鼠标悬浮效果
                            // }
                        },

                        data: this.thermodynamicList,
                    }
                ]
            };
            this.chart.setOption(this.option);
        }
    }
</script>

<style scoped>

</style>