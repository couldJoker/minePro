<template>
  <div class="warp">
    <el-card class="loginPanel" shadow="always">
      <div class="title">
        测试系统 0.1v
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="40px">
        <el-form-item label="账户">
          <el-input v-model.trim="form.fLoginName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model.trim="form.fPassword"></el-input>
        </el-form-item>
        <el-form-item class="operate-panel" label-width="0">
          <a href="javascript:void(0)">账号注册</a>
          <el-button type="primary" @click="login('form')"> 登 陆 </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>


<script>
import { loginPage } from '../../service/service';
import { formCheck } from '../../lib/utils';
export default {
  data() {
    return {
      form: {
        fLoginName: '',
        fPassword: ''
      },
      rules: {
          fLoginName: [
            { required: true, message: '请输入...', trigger: 'blur' }
          ],
          fPassword: [
            { required: true, message: '请输入...', trigger: 'blur' },
            { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
          ],
      }
    }
  },
  methods: {
    async login(name) {
      let flag = formCheck(this, name);
      if(!flag) {
        return;
      }
      let res = await loginPage.login(this.form);
      if(res.success) {
        sessionStorage.setItem('webtoken', res.data.token);
        this.$router.push({path: '/index'});
      }
    }
  }
}
</script>

<style scoped>
.loginPanel {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -200px;
  width: 400px;
  height: 400px;
}
.title {
  width: inherit;
  padding: 10px 0;
  box-sizing: border-box;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
}
</style>

