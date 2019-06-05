<template>
    <div class="user">
        <el-row type="flex" justify="center">
            <el-col :span="8">
                <img :src="user.avatar" alt="">
            </el-col>
            <el-col :span="16">
                <div class="userinfo">
                    <div class="useritem">
                        {{user.name}}
                    </div>
                    <div class="useritem">
                        {{user.identity == 'manager' ? '管理员' : '普通用户'}}
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: 'infoShow',
    created: {
        user() {
            return this.$store.getters.user;
        }
    }
}
</script>
<style scoped>

</style>

