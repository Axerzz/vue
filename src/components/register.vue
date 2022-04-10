<template>
<div style="width: 100%; height: 100%;" >
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
              <div id="building" class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center">
              </div>
            </div>
            <div class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-7">
              <div class="card card-plain">
                <div class="card-header">
                  <h4 class="font-weight-bolder">Sign Up</h4>
                  <!-- <p class="mb-0">Enter your email and password to register</p> -->
                </div>
                <div class="card-body">
                  <form role="form">
                    <p class="mt-0 text-sm text-left">
                      User：
                    </p>
                    <div class="input-group input-group-outline mb-1">
                      <!-- <label class="form-label">Name</label> -->
                      <input type="email" v-model="registerForm.username" class="form-control" value="Email" 
                    onfocus='if(this.value=="Email"){this.value="";}; ' 
                    onblur='if(this.value==""){this.value="Email";};'>
                    </div>
                    <p class="mt-2 text-sm text-left">
                      Password：
                    </p>
                    <div class="input-group input-group-outline mb-1">
                      <!-- <label class="form-label">Email</label> -->
                      <input type="password" v-model="registerForm.password" class="form-control" >
                    </div>
                    <p class="mt-2 text-sm text-left">
                      Confirm Password：
                    </p>
                    <div class="input-group input-group-outline mb-3">
                      <!-- <label class="form-label">Password</label> -->
                      <input type="password" v-model="re_password" class="form-control" >
                    </div>
              
                    <div class="text-center">
                      <button type="button" @click="register_in" class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0">Sign Up</button>
                    </div>
                  </form>
                </div>
                <div class="card-footer text-center pt-0 px-lg-2 px-1">
                  <p class="mb-2 text-sm mx-auto">
                    Already have an account?
                    <router-link to='/login' class="text-primary text-gradient font-weight-bold">Sign in</router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'Register',
  data(){
      return{
        registerForm:
        {
          username:'',
          password:''
        },
        re_password:''
      }
  },
  methods:{
      register_in(){
        if(this.registerForm.username==''||this.registerForm.password==''||this.re_password=='')
        {
          const h = this.$createElement;
             this.$notify.error({
                title: 'Register Failed',
                message: h('i', { style: 'color: teal'}, 'Input can\'t be empty')
              });
        }
        else if(this.registerForm.password != this.re_password)
        {
          const h = this.$createElement;
             this.$notify.error({
                title: 'Register Failed',
                message: h('i', { style: 'color: teal'}, 'The password did not match the re-typed password')
              });
        }
        else{
          request.post("/user/register",this.registerForm).then(res =>{
           
            if(res==true) {
              this.$message('Register successful !');
              this.$router.push('/login')
           }
           else {
             const h = this.$createElement;
             this.$notify.error({
                title: 'Register Failed',
                message: h('i', { style: 'color: teal'}, 'The username you entered already exists!')
              });
           }
           console.log(res)
         })
        }
      }
  }
}
</script>

<style scoped src="../assets/css/material-dashboard.css"></style>

<style>
#building{
background:url('../assets/img/illustrations/illustration-signup.jpg');
width:100%;
height:100%;
position:fixed;
background-size:100% 100%;
}
</style>