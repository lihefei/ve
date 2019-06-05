<template>
    <div class="register">
        <section class="form-container ">
          <div class="manage-tip">
              <span class="title">米修后台管理系统</span>
              <el-form ref="registerForm" :model="registerUser" :rules="rules" label-width="100px" class="register-form">
                <el-form-item label="用户名" prop="name">
                  <el-input v-model="registerUser.name" placeholder="请输入用户名" clearable></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="registerUser.email" placeholder="请输入邮箱" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="registerUser.password" placeholder="请输入密码" clearable></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                  <el-input type="password" v-model="registerUser.password2" placeholder="请输入确认密码" clearable></el-input>
                </el-form-item>
                <el-form-item label="选择身份" prop="identity">
                  <el-select v-model="registerUser.identity" placeholder="请选择身份">
                    <el-option label="管理员" value="manager"></el-option>
                    <el-option label="员工" value="employee"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('registerForm')" class="submit-btn">注册</el-button>
                </el-form-item>
                
              </el-form>
          </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'register',
    components: {
        
    },
    data() {
      let password2 = (rule, value, callback) => {
          if (value !== this.registerUser.password) {
              callback(new Error('两次密码不一致'));
          } else {
              callback();
          }
      };

      return {
        registerUser: {
          name: 'hgfhgfd',
          email: 'gdfgfdg@bf.com',
          password: '123456',
          password2: '123456',
          identity: 'manager'

        },
        rules: {
          name: [
            {
              required: true,
              message: '用户名不能为空',
              trigger: 'blur',
            },
            {
              min: 2,
              max: 10,
              message: '长度不能少于2位或者大于10位',
              trigger: 'blur'
            }
          ],
          email:[
              {
                  required: true,
                  message: '邮箱不能为空',
                  trigger: 'blur'
              },
              {
                  type: 'email',
                  message: '请输入正确的邮箱地址',
                  trigger: ['blur', 'change']
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
          ],
          password2: [
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
              },
              {
                  validator: password2,
                  trigger: 'blur'
              }
          ]

        }
      }
    },
    methods: {
        /**
         * 提交注册
         * params {String} formName 表单ref值
         */
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    
                    this.$axios.post('/api/users/register', this.registerUser)
                    .then(res => {
                        
                        /**zhuce */

                        this.$message({
                            message: '账号注册成功',
                            type: 'success'
                        });

                        this.$router.push('/login');
                    });
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        

        }
    }
}
</script>

<style scoped>
.register {
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
.register-form {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
  width: 100%;
}
</style>


