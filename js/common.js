// 配置axios基地址(baseURL)
axios.defaults.baseURL = "https://hmajax.itheima.net";

// 抽取提示函数
function showToast(msg) {
  // 1. 实例化
  const toastDom = document.querySelector(".my-toast");
  const toast = new bootstrap.Toast(toastDom);
  // 2. 修改内容
  toastDom.querySelector(".toast-body").innerText = msg;
  // 3. 显示
  toast.show();
}

// 抽取登录校验函数
function checkLogin() {
  // 1. 判断token
  const token = localStorage.getItem("token");
  if (!token) {
    showToast("请先登录");
    setTimeout(() => {
      window.location.href = "./login.html";
    }, 1500);
  }
}

// 抽取渲染用户名函数
function renderUsername() {
  // 1. 读取
  const username = localStorage.getItem("username");
  // 2. 渲染
  document.querySelector(".username").innerText = username;
}

// 抽取退出登录函数
function logout() {
  document.querySelector("#logout").addEventListener("click", () => {
    // 1. 清除缓存数据
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    // 2. 跳转到登录页面
    window.location.href = "./login.html";
  });
}

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 每次发请求前，统一设置token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/* 
  添加响应拦截器，统一处理token失效
    1. 判断token失效(401)
    2. 删除缓存并提示用户
    3. 返回登录页面 
*/
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
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
    return Promise.reject(error);
  }
);
