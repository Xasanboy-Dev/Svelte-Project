<script lang="ts">
import axios from "axios"
let email:any
let name:any
let password:any
export function sendUser(){
  if(name!==undefined && email!==undefined && password!==undefined){
 axios.post('http://localhost:8080/login',{email,name,password})
 .then(res=>{
 return res.data.message
})
}
}
</script>
<main>
   <div class="d-flex justify-content-center pt-5" >
    <form>
        <div class="form-outline mb-4">
            <input type="text" required bind:value={name} id="name" class="form-control" />
            <label class="form-label" for="name">Name</label>
          </div>  
        <div class="form-outline mb-4">
          <input type="email" required id="form2Example1" bind:value={email} class=" form-control" />
          <label class="form-label" for="form2Example1">Email address</label>
        </div>
        <div class="form-outline mb-4">
          <input type="password" required id="form2Example2" bind:value={password} class="form-control" />
          <label class="form-label" for="form2Example2">Password</label>
        </div>
<div class="d-flex justify-content-center">
        <button type="submit" on:click={()=>sendUser()} class="btn btn-primary btn-block mb-4">Sign in</button>
     </div> 
        <div class="text-center">
          <p>Not a member? <a class="btn btn-primary text-warning" href="/register">Register</a></p>
          <p>or sign up with:</p>
        </div>
    </form>
</div>
<div class='p-5 m-5'>
<a href='/' class="btn btn-primary text-warning">Back</a>
</div>
</main>