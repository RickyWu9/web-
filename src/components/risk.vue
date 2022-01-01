<template>
    <div id="risk">
        <div id="thermodynamicChart">
            <risk-rank-chart/>
        </div>
        <div id="rankChart">
            <risk-thermodynamic-chart />
        </div>
    </div>
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

</style>