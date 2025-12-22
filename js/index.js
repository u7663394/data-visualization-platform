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
*/
async function getData() {
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
}
getData();
