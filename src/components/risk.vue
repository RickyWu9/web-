<template>
    <el-container>
        <el-main>
            <div id="rankChart">
                <risk-thermodynamic-chart />
            </div>
            <div id="thermodynamicChart" style="margin-top: 100px">
                <risk-rank-chart/>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import RiskRankChart from "@/components/riskRankChart";
    import RiskThermodynamicChart from "@/components/riskThermodynamicChart";
    export default {
        name: "risk",
        components: {RiskThermodynamicChart, RiskRankChart}
    }
</script>

<style scoped>
    .el-footer {
        background-color: bisque;
        width: 1210px;
        display: flex;
        align-content: center;
    }
</style>