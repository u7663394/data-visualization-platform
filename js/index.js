// 校验是否登录
checkLogin();
// 渲染用户名
renderUsername();
// 退出登录功能
logout();

/* 
  首页数据统计功能: 
    1. 调用接口
    2. 渲染数据
  首页登录token过期/被篡改:
    1. 判断token失效(401)
    2. 删除缓存并提示用户
    3. 返回登录页面 
*/
async function getData() {
  try {
    // 1. 调用接口
    const token = localStorage.getItem("token");
    const res = await axios({
      url: "/dashboard",
      headers: {
        Authorization: token,
      },
    });
    // 2. 渲染数据
    const overview = res.data.data.overview;
    Object.keys(overview).forEach((key) => {
      document.querySelector(`.${key}`).innerText = overview[key];
    });
  } catch (error) {
    // 1. 判断token失效(401)
    if (error.response.status === 401) {
      // 2. 删除缓存并提示用户
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      showToast("账号已过期，请重新登录或注册！");
      // 3. 返回登录页面
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 1500);
    }
  }
}
getData();
