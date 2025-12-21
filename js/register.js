// 测试基地址配置是否成功
document.querySelector("#btn-register").addEventListener("click", () => {
  axios({
    url: "/register",
    method: "POST",
    data: {
      username: "xiaowang",
      password: "123456",
    },
  });
});
