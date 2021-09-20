/*
store 
state : 
 - users : [{dia punya id}]

component :
 - table user: v-for, user in users
 - tombol todo mengarah ke method this.$router.push("/users/:userId")
 - this.$router.push({
     name: 'sesuatu', 
     params: {
         userId: user.id
     }
 })

 - component users detail:
    creatednya: panggil method users detail/todo
*/

// let tag = "rani, cantik, banget";
// console.log(tag.split(", "));
