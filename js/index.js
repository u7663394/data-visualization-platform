// 校验是否登录
checkLogin();
// 渲染用户名
renderUsername();
// 退出登录功能
logout();
// 渲染顶部数据
function renderOverview(overview) {
  Object.keys(overview).forEach((key) => {
    document.querySelector(`.${key}`).innerText = overview[key];
  });
}

/* 
  首页数据渲染功能: 
    1. 调用接口
    2. 渲染数据
*/
async function getData() {
  // 1. 调用接口
  const res = await axios({
    url: "/dashboard",
  });
  // 2. 渲染数据
  const { overview } = res.data;
  renderOverview(overview);
}
getData();
