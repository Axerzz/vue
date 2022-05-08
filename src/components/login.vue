<template>
<div style="width: 100%; height: 100%;" id="sign-in" >
    <div class="page-header align-items-start min-vh-100">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                  <h5 class="text-white font-weight-bolder text-center mt-2 mb-0">City Charging simulation</h5>
                
                </div>
              </div>
              <div class="card-body">
                <form role="form" class="text-start">
                  <p class="mt-2 text-sm text-left">
                    User：
                  </p>
                  <div class="input-group input-group-outline my-3">
                    <!-- <label class="form-label">Email</label> -->
                    <input type="email" v-model="loginForm.username" class="form-control">
                  </div>
                  <p class="mt-2 text-sm text-left">
                    Password：
                  </p>
                  <div class="input-group input-group-outline mb-3">
                    <!-- <label class="form-label">Password</label> -->
                    <input type="password" v-model="loginForm.password" class="form-control" >
                  </div>
                  <div class="text-center">
                    <button type="button" @click="login_in" class="btn bg-gradient-primary w-100 my-4 mb-2">Sign in</button>
                  </div>
                  <p class="mt-4 text-sm text-center">
                    Don't have an account?
                    <router-link to="/register" class="text-primary text-gradient font-weight-bold">Sign up</router-link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>


<script>
export default {
  name: 'Login',
  data(){
      return{
        loginForm:
        {
          username:'',
          password:''
        }
      }
  },
  methods:{
      login_in(){
        if(this.loginForm.username==''||this.loginForm.password=='')
        {
          const h = this.$createElement;
             this.$notify.error({
                title: 'Login Failed',
                message: h('i', { style: 'color: teal'}, 'Username or password cannot be empty')
              });
        }
        else{
          this.$axios.get('http://127.0.0.1:5000/login',{
              params:{
               username:this.loginForm.username,
               password:this.loginForm.password
              }
            }).then(res=>{ 
              if(res.data.msg=='success') {
                  localStorage.s="true";
                  localStorage.removeItem('username');
                  localStorage.username=this.loginForm.username;
                  localStorage.role = res.data.role;
                  this.$message('Login successful !');
                  this.$router.push('/home')
              }
              else {
                const h = this.$createElement;
                this.$notify.error({
                    title: 'Login Failed',
                    message: h('i', { style: 'color: teal'}, 'Incorrect username or password')
                  });
              }
              console.log(res)
            });
        }
        
      }
      // login_in(){
      //   if(this.loginForm.username==''||this.loginForm.password=='')
      //   {
      //     const h = this.$createElement;
      //        this.$notify.error({
      //           title: 'Login Failed',
      //           message: h('i', { style: 'color: teal'}, 'Username or password cannot be empty')
      //         });
      //   }
      //   else{
      //     request.get("/user",{
      //       params:{
      //          username:this.loginForm.username,
      //          password:this.loginForm.password
      //       }
      //     }).then(res =>{
      //      if(res==0||res==1) {
      //         localStorage.s="true";
      //         localStorage.removeItem('username');
      //         localStorage.username=this.loginForm.username;
      //         localStorage.role = res;
      //         this.$message('Login successful !');
      //         this.$router.push('/home')
      //      }
      //      else {
      //        const h = this.$createElement;
      //        this.$notify.error({
      //           title: 'Login Failed',
      //           message: h('i', { style: 'color: teal'}, 'Incorrect username or password')
      //         });
      //      }
      //      console.log(res)
      //    })
      //   }
        
      //   //   console.log(this.loginForm)
      //   //  this.$router.push('/home')
      // }
  }
}
</script>

<style scoped src="../assets/css/material-dashboard.css"></style>

<style>
#sign-in{
background:url('../../public/background.png');
width:100%;
height:100%;
position:fixed;
background-size:100% 100%;
}
</style>
