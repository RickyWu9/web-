<template>
    <div id="Home">
        <div id="sideBar" style="width: 20%;height: 100%;float: left">
                <el-menu
                        :default-active="$router.path"
                        class="el-menu-vertical-demo"
                        router
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#4e6379"
                style="width: 100%; height: 1800px">
                    <el-menu-item index="/numbers">
                        <i class="el-icon-location"></i>
                        <span>处罚数量</span>
                    </el-menu-item>
                    <el-menu-item index="/money">
                        <i class="el-icon-menu"></i>
                        <span slot="title">处罚金额</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>

        </div>
        <div id="chart" style="width: 70%;height: 100%;float: left">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>

    export default {
        name: "Home",
        methods: {
            goTo(path) {
                this.$router.push({path: path})
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>

</style>