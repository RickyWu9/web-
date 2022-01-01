<template>
    <el-container>
        <el-header>处罚数量</el-header>
        <el-main>
            <div class="CM">
                <div class="title">
                    <span>处罚数量热力图</span>
                </div>
                <span>开始日期</span>
                <el-date-picker v-model="startMonthChina" type="month" placeholder="选择月"  @change="jobSearch" value-format="MM">
                </el-date-picker>
                <span style="margin-left: 100px">结束日期</span>
                <el-date-picker v-model="endMonthChina" type="month" placeholder="选择月"  @change="jobSearch" value-format="MM">
                </el-date-picker>
            </div>
            <div class="ChinaMap">
                <div id="container" style="width:1000px;height:500px"></div>
            </div>


            <div class="District">
                <div class="title">
                    <span>处罚数量折线图</span>
                </div>
                <span>开始日期</span>
                <el-date-picker v-model="startMonthDistrict" type="month" placeholder="选择月"  @change="jobSearch" value-format="MM">

                </el-date-picker>
                <span style="margin-left: 100px">结束日期</span>
                <el-date-picker v-model="endMonthDistrict" type="month" placeholder="选择月"  style="margin-left: 100px"  @change="jobSearch" value-format="MM">

                </el-date-picker>
                <div id="district">
                    <div id="line" style="width: 1000px;height: 400px;"></div>
                </div>
            </div>


            <div class="District">
                <div class="title">
                    <span>处罚数量top10</span>
                </div>
                <span>开始日期</span>
                <el-date-picker v-model="startMonthTop" type="month" placeholder="选择月"  @change="jobSearch" value-format="MM">

                </el-date-picker>
                <span style="margin-left: 100px">结束日期</span>
                <el-date-picker v-model="endMonthTop" type="month" placeholder="选择月"  style="margin-left: 100px"  @change="jobSearch" value-format="MM">

                </el-date-picker>
            </div>
            <div id="top10">
                <div id="top" style="width: 1000px;height: 400px;"></div>
            </div>
        </el-main>
    </el-container>

</template>

<script>
    import * as echarts from 'echarts'
    import 'echarts/map/js/china.js'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/chart/heatmap'
    import 'echarts/lib/component/toolbox'
    import 'echarts/lib/component/tooltip'

    export default {
        name: "Test",
        data() {
            return {
                startMonthChina: '',
                endMonthChina: '',
                startMonthDistrict: '',
                endMonthDistrict: '',
                startMonthTop: '',
                endMonthTop: '',
                top10data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                top10Numbers: ['1010', '909', '880', '770', '660', '550', '440', '330', '220', '110'],
                // 热力图
                dataMap: [{name: '北京',value: 420 },{name: '天津',value: 400 },
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
                charts: '',
                opinionData: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        },
        created(){
            this.initData({});
        },
        mounted() {
            this.$nextTick(function() {
                this.drawLine('line')
                this.drawbar()
            })
            this.creatThermodynamicChart()
        },
        methods: {
            jobSearch() {
                this.getJobListByMonth();
            },
            async initData() {
                //获取当前时间
                var now   = new Date();
                var monthn = now.getMonth()+1;
                var yearn  = now.getFullYear();
                this.selectMonth = yearn+"-"+monthn;

                this.selectUser = parseInt(sessionStorage.getItem("userid"));
                // this.getWeekJobList({
                //   userid: sessionStorage.getItem("userid"),
                //   weekid: "1"
                // });
                this.getJobListByMonth();
            },
            async getJobListByMonth() {
                console.log(this.startMonthChina)
                console.log(this.endMonthChina)
            },
            creatThermodynamicChart(){
                var dataMap = this.dataMap;
                // 需要在页面上直接标记出来的城市
                var specialMap = [];
                // 对dataMap进行处理，使其可以直接在页面上展示
                for (var i = 0; i < specialMap.length; i++) {
                    for (var j = 0; j < dataMap.length; j++) {
                        if (specialMap[i] == dataMap[j].name) {
                            dataMap[j].selected = true;
                            break;
                        }

                    }
                }
                //Echart的配置选项
                var option = {
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

                            data: dataMap
                        }
                    ]
                };
                //初始化echarts实例
                var myChart = echarts.init(document.getElementById('container'));
                //使用制定的配置项和数据显示图表
                myChart.setOption(option);
            },
            drawLine(id) {
                this.charts = echarts.init(document.getElementById(id))
                this.charts.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['全国地区处罚数量']
                    },
                    grid: {
                        left: '5%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },

                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        "axisLabel":{
                            interval: 0,
                            rotate: 40
                        },
                        data: ['北京','天津',
                            '上海','重庆',
                            '河北','河南',
                            '云南','辽宁',
                            '黑龙江','湖南',
                            '安徽','山东',
                            '新疆','江苏',
                            '浙江','江西',
                            '湖北','广西',
                            '甘肃','山西',
                            '内蒙古','陕西',
                            '吉林','福建',
                            '贵州','广东',
                            '青海','西藏',
                            '四川','宁夏',
                            '海南','台湾',
                            '香港','澳门',
                            '南海诸岛']

                    },
                    yAxis: {
                        type: 'value'
                    },

                    series: [{
                        name: '近七日收益',
                        type: 'line',
                        stack: '总量',
                        data: this.opinionData,
                        smooth: true
                    }]
                })
            },
            drawbar(){
                var myChart = echarts.init(document.getElementById('top'));
                /*指定图表的配置项和数据*/
                var option = {
                    textStyle:{
                        color:'#fff',
                        fontSize:'16'
                    },
                    title: {
                        textStyle:{
                            color:'#fff',

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
                            color:'#fff',
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
                        color:'#fff',
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
                        data: /*da*/this.top10data,
                        axisLabel : {
                            show : true,
                            textStyle : {
                                color : '#FFF',
                                align : 'right',
                                fontSize: 15    /*文字大小*/
                            }
                        },
                        axisLine : {
                            lineStyle : {
                                color : '#fff'//轴的颜色
                            }
                        },
                        axisTick : {
                            lineStyle : {
                                color : '#FFF'//轴上点的颜色
                            }
                        },

                    },
                    series: [
                        {
                            name: '处罚数量',
                            type: 'bar',
                            data: /*aa*/this.top10Numbers,/*请求回来的数据数组*/

                            label : {
                                normal : {
                                    show : true,//显示数字
                                    position : 'right',
                                }
                            },

                            barWidth : 15,//柱子宽度
                            itemStyle : {
                                normal : {
                                    color:'#ccecff',//柱状的颜色
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
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        }
    }

</script>
<style scoped>
    .eee{height: calc(100vh - 390px);width: 100%;}
    .ChinaMap{
        display: flex;
        align-items: center;
    }
    .District{
        margin-top: 100px;
    }
    #container{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }
    #line{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }
    #top{
         box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
     }
</style>

