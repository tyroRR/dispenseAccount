import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081';

const  btn = document.querySelector('#btn');
const content = document.querySelector('.content');

btn.onclick = () =>{
    axios.get(`api/getRandomAccount`).then(res => {
         if(res.data.code === 0){
             content.innerHTML = `<p>${res.data.message}!</p>`
         }else {
             content.innerHTML = `<p><b>账号：${res.data.data[0].user_name}</b></p><p><b>密码：${res.data.data[0].password}</b></p>`
         }
    }).catch(err =>{
        console.log(err);
        content.innerHTML = `<p>请求发送失败！</p>`
    })
};
