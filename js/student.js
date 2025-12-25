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

// 显示弹框
const modal = new bootstrap.Modal(document.querySelector("#modal"));
document.querySelector("#openModal").addEventListener("click", () => {
  modal.show();
});

// 省市区选择效果
const provSelect = document.querySelector("[name=province]");
const citySelect = document.querySelector("[name=city]");
const areaSelect = document.querySelector("[name=area]");
async function initSelect() {
  // 1. 省数据获取+渲染
  const provRes = await axios.get("/api/province");
  const provHtml = provRes.list
    .map((ele) => {
      return `
    <option value="${ele}">${ele}</option>`;
    })
    .join("");
  provSelect.innerHTML = `<option value="">--省份--</option>${provHtml}`;
  // 2.市数据获取+渲染
  provSelect.addEventListener("change", async () => {
    const cityRes = await axios.get("/api/city", {
      params: {
        pname: provSelect.value,
      },
    });
    const cityHtml = cityRes.list
      .map((ele) => {
        return `
      <option value="${ele}">${ele}</option>`;
      })
      .join("");
    citySelect.innerHTML = `<option value="">--城市--</option>${cityHtml}`;
    // 清空地区
    areaSelect.innerHTML = `<option value="">--地区--</option>`;
  });
  // 3. 区数据获取+渲染
  citySelect.addEventListener("change", async () => {
    const areaRes = await axios.get("/api/area", {
      params: {
        pname: provSelect.value,
        cname: citySelect.value,
      },
    });
    const areaHtml = areaRes.list
      .map((ele) => {
        return `
       <option value="${ele}">${ele}</option>`;
      })
      .join("");
    areaSelect.innerHTML = `<option value="">--地区--</option>${areaHtml}`;
  });
}
initSelect();

// 新增学生数据
async function addStudent() {
  // 1. 收集表单内容
  const form = document.querySelector("#form");
  const data = serialize(form, { hash: true, empty: true });
  // 2. 提交请求
  try {
    data.age = +data.age;
    data.gender = +data.gender;
    data.hope_salary = +data.hope_salary;
    data.salary = +data.salary;
    data.group = +data.group;
    const res = await axios.post("/students", data);
    // 3. 成功逻辑
    showToast(res.message);
    modal.hide();
    // 4. 重新渲染
    getData();
  } catch (error) {
    // 5. 失败逻辑
    showToast(error.response.data.message);
    modal.hide();
  }
}

document.querySelector("#submit").addEventListener("click", () => {
  addStudent();
});

// 删除学生数据
async function delStudent(id) {
  // 1. 调接口
  await axios.delete(`/students/${id}`);
  // 2. 重新渲染
  showToast("删除成功");
  getData();
}

document.querySelector(".list").addEventListener("click", (e) => {
  if (e.target.classList.contains("bi-trash")) {
    const id = e.target.parentNode.parentNode.dataset.id;
    delStudent(id);
  }
});
