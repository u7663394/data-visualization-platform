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
