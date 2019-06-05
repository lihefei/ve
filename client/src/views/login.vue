<template>
    <div class="login">
        <section class="form-container">
          <div class="manage-tip">
              <span class="title">米修后台管理系统</span>
              <el-form ref="loginForm" :model="loginUser" :rules="rules" label-width="80px" class="login-form">
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="loginUser.email" placeholder="请输登录邮箱" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="loginUser.password" placeholder="请输入密码" clearable></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('loginForm')" class="submit-btn">登录</el-button>
                </el-form-item>
                <div class="tiparea">
                    <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
                </div>
              </el-form>
          </div>
        </section>
    </div>
</template>

<script>
import jwtCode from 'jwt-decode';
export default {
    name: 'login',
    data() {
        return {
            loginUser: {
                email: 'test@123.com',
                password: ''
            },
            rules: {
                email: [
                    {
                      type: "email",
                      required: true,
                      message: "邮箱格式不正确",
                      trigger: "change"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 20,
                        message: '密码不能少于6位或超过20位',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        /**
         * 登录
         * params {String} formName 表单ref值
         */
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    
                    this.$axios.post('/api/users/login', this.loginUser)
                    .then(res => {
                        console.log(res);
                        /* token储存到ls */
                        const { token } =  res.data;
                        localStorage.setItem('eleToken', token);

                        /* 解析token */
                        const decoded = jwtCode(token); //解析token
                        console.log(decoded);

                        /* token储存到vuex中 */
                        this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded));
                        this.$store.dispatch('setUser', decoded);

                        this.$router.push('/index');
                        
                    });
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        

        },
        isEmpty(value) {
          return (
            value === undefined || 
            value === null || 
            (typeof value === 'object' && Object.keys(value).length === 0) || 
            (typeof value === 'string' && value.trim().length === 0)
          )
        }
    }
};
</script>
<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/images/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form-container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form-container .manage-tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.login-form {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
  width: 100%;
}

.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>