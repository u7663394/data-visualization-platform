/* 
  用户注册功能：
    1. 收集并校验数据
    2. 提交
    3. 清空输入内容
*/
document.querySelector("#btn-register").addEventListener("click", async () => {
  // 1. 收集数据
  const form = document.querySelector(".register-form");
  const data = serialize(form, { hash: true, empty: true });
  // 2. 校验 (非空 + 长度)
  const { username, password } = data;
  if (!username || !password) {
    showToast("用户名和密码不能为空！");
    return;
  }
  if (
    username.length < 8 ||
    username.length > 30 ||
    password.length < 6 ||
    password.length > 30
  ) {
    showToast("用户名长度为8-30，密码长度为6-30");
    return;
  }
  // 3. 提交
  try {
    const res = await axios.post("/register", { username, password });
    showToast(res.message);
    // 4. 清空输入内容
    form.querySelector("#input-email").value = "";
    form.querySelector("#input-password").value = "";
  } catch (error) {
    showToast(error.response.data.message);
  }
});
