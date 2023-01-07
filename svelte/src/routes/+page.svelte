<script lang="ts" type="module">
   import axios from "axios"
   let r:any
   function deleteUser(id:string){
       axios.delete(`http://localhost:8080/delete/${id}`).then(res=>{
    r = res.data.message})
    }
    function  getAllusers(){ 
        axios.get("http://localhost:8080").then(res=>{r  = res.data.message})
    }
     function seeUser(id:string){
  axios.post(`http://localhost:8080/user/${id}`)
  .then(res=>{
    console.log(res.data.message)
  })
    }
getAllusers()
</script>
<main>
<div>
     {#if r!==undefined}
     {#if  r.length==0}
     <table class="table table-dark">
        <thead>
          <tr class="ml-5">
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Lastname</th>
            <th scope="col">Email</th>
            <th>Query</th>
          </tr>
        </thead>
        <tbody>
    </tbody>
    </table>    
     {:else if r.length!==0}
    <table class="table table-dark">
        <thead>
          <tr class="ml-5">
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Lastname</th>
            <th scope="col">Email</th>
            <th>Query</th>
          </tr>
        </thead>
        <tbody>
    {#each r as  user}
    <tr>
        <th scope="row">{user.id}</th>
        <td>{user.name}</td>
        <td>{user.lastname}</td>
        <td>{user.email}</td>
        <td class='d-flex gap-3 fs-5 hover-zoom'><i title="Delete" on:click={()=>deleteUser(user.id)} class="text-danger bi bi-person-dash"></i></td>
      </tr>    
    {/each}
    </tbody>
</table>
        {/if}
        {/if}
    <div class="d-flex justify-content-center p-5 gap-5">
    <a href="./login" class="text-decoration-none btn bg-primary">Login</a>
    <a href="./register" class="text-decoration-none btn bg-warning">Registaration</a>
    </div>
</div>
</main>