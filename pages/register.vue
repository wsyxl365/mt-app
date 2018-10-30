<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a
          href="/"
          class="site-logo"/>
        <span class="login">
          <em class="bold">已有美团账号?</em>
          <a href="/login">
            <el-button
              type="primary"
              size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
          label="昵称"
          prop="name">
          <el-input v-model="ruleForm.name"/>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email">
          <el-input v-model="ruleForm.email"/>
          <el-button
            size="mini"
            round
            @click="sendMsg">发送验证码
          </el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="code">
          <el-input
            v-model="ruleForm.code"
            maxlength="4"/>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pwd">
          <el-input
            v-model="ruleForm.pwd"
            type="password"/>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="cpwd">
          <el-input
            v-model="ruleForm.cpwd"
            type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="register">同意以下协议并注册
          </el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a
            class="f1"
            href="http://www.meituan.com/about/terms"
            target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
  export default {
  	data(){
  		return {
        statusMsg: "",
        error: "",
        ruleForm:{
        	name:"",
          code:"",
          pwd:"",
          cpwd:"",
          email:""
        },
        rules: {
        	name:[{
        		required: true,
            type: "string",
            message: "请输入昵称",
            trigger: "blur"
          }],
          email:[{
            required: true,
            type:"email",
            message: "请输入邮箱",
            trigger: "blur"
          }],
          pwd: [{
            required: true,
            message: "创建密码",
            trigger: "blur"
          }],
          cpwd: [{
            required: true,
            message: "确认密码",
            trigger: "blur"
          }, {
        		validator:(rule, value, callback)=>{
        			if(value==="") {
        			  callback(new Error("请再次输入密码"));
        			} else if(value !== this.ruleForm.pwd) {
                callback(new Error("两次输入密码不一致"));
              } else {
        			  callback();
        			}
            },
            trigger: "blur"
          }]
        }
      }
    },
    layout: "blank",
    methods: {
      sendMsg(){
        let namePass,emailPass;
        if(this.timerid) {
          return false;
        }
        this.$refs['ruleForm'].validateField("name", (valid)=>{
          namePass = valid
        })
        this.statusMsg = ''
        if(namePass) {
          return false
        }
        this.$refs['ruleForm'].validateField("email", (valid)=>{
          emailPass = valid
        })
        if(!namePass && !emailPass) {
          this.$axios.post('/users/verify', {
            username:encodeURIComponent(this.ruleForm.name),
            email:this.ruleForm.email,
          }).then(({status, data})=>{
            if(status === 200 && data && data.code === 0) {
              let count=60;
              this.statusMsg = `验证码已发送，剩余${count--}秒`
              this.timerid = setInterval(()=>{
                this.statusMsg = `验证码已发送，剩余${count--}秒`
                if(count === 0) {
                  clearInterval(this.timerid)
                  this.statusMsg = ""
                }
              }, 1000)
            } else {
              this.statusMsg = data.msg;
            }
          })
        }
      },
      register(){

      }
    }
  }
</script>
<style lang="scss">
  @import "@/assets/css/register/index.scss";
</style>
