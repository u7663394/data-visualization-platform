// 校验是否登录
checkLogin();
// 渲染用户名
renderUsername();
// 退出登录功能
logout();
// 抽取获取数据函数
async function getData() {
  // 1. 获取数据
  const res = await axios.get("/students");
  // 2. 渲染数据
  const htmlStr = res.data
    .map((ele) => {
      const {
        name,
        age,
        gender,
        group,
        hope_salary,
        salary,
        province,
        city,
        area,
        id,
      } = ele;
      return `
        <tr>
          <td>${name}</td>
          <td>${age}</td>
          <td>${gender == 0 ? "男" : "女"}</td>
          <td>第${group}组</td>
          <td>${hope_salary}</td>
          <td>${salary}</td>
          <td>${province}${city}${area}</td>
          <td data-id = "${id}">
            <a href="javascript:;" class="text-success mr-3"><i class="bi bi-pen"></i></a>
            <a href="javascript:;" class="text-danger"><i class="bi bi-trash"></i></a>
          </td>
        </tr>`;
    })
    .join("");
  document.querySelector(".list").innerHTML = htmlStr;
  document.querySelector(".total").innerText = res.data.length;
}
getData();
