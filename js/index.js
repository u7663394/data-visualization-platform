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
// 渲染薪资走势
function renderYearSalary(year) {
  // 1. 实例化echart对象
  const myChart = echarts.init(document.querySelector("#line"));
  // 2. 调整配置
  const option = {
    title: {
      text: "2026全学科薪资走势",
      top: "15",
      left: "12",
    },
    grid: {
      top: "20%",
    },
    xAxis: {
      type: "category",
      axisLine: {
        lineStyle: {
          color: "#ccc",
          type: "dashed",
        },
      },
      data: year.map((ele) => ele.month),
    },
    yAxis: {
      type: "value",
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },
    series: [
      {
        data: year.map((ele) => ele.salary),
        type: "line",
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#80c1fa" },
              { offset: 1, color: "rgba(255,255,255,0)" },
            ],
            global: false,
          },
        },
        symbolSize: 10,
        lineStyle: {
          width: 5,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: "#479dee" },
              { offset: 1, color: "#5c75f0" },
            ],
            global: false,
          },
        },
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  // 3. 调用setOption方法
  myChart.setOption(option);
}
// 渲染薪资分布
function renderDistribute(salaryData) {
  // 1. 实例化echart对象
  const myChart = echarts.init(document.querySelector("#salary"));
  // 2. 调整配置
  const option = {
    title: {
      text: "班级薪资分布",
      left: "10",
      top: "15",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "5%",
      left: "center",
    },
    series: [
      {
        name: "班级薪资分布",
        type: "pie",
        // 数组第一项是内半径，第二项是外半径
        radius: ["54%", "70%"],
        // 防重叠
        avoidLabelOverlap: false,
        // 图形样式
        itemStyle: {
          borderRadius: 15,
          borderColor: "#fff",
          borderWidth: 2,
        },
        // 说明文本
        label: {
          show: false,
          position: "center",
        },
        // 高亮
        emphasis: {},
        // 说明文本指引线
        labelLine: {
          show: false,
        },
        data: salaryData.map((ele) => {
          return {
            value: ele.g_count + ele.b_count,
            name: ele.label,
          };
        }),
      },
    ],
    color: ["#fda224", "#5097ff", "#3abcfa", "#34d39a"],
  };
  // 3. 调用setOption方法
  myChart.setOption(option);
}
// 渲染每组薪资
function renderGroup(groupData) {
  // 1. 实例化echart对象
  const myChart = echarts.init(document.querySelector("#lines"));
  // 2. 调整配置
  const option = {
    grid: {
      top: "30",
      left: "70",
      bottom: "50",
      right: "30",
    },
    tooltip: {},
    xAxis: {
      axisLine: {
        lineStyle: {
          color: "#ccc",
          type: "dashed",
        },
      },
      type: "category",
      data: groupData[1].map((ele) => ele.name),
      axisLabel: {
        color: "#999",
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },
    series: [
      {
        name: "期望薪资",
        data: groupData[1].map((ele) => ele.hope_salary),
        type: "bar",
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#34d39a" },
              { offset: 1, color: "rgba(52,211,154,0.2)" },
            ],
            global: false,
          },
        },
      },
      {
        name: "实际薪资",
        data: groupData[1].map((ele) => ele.salary),
        type: "bar",
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#499fee" },
              { offset: 1, color: "rgba(73,159,238,0.2)" },
            ],
            global: false,
          },
        },
      },
    ],
  };
  // 3. 调用setOption方法
  myChart.setOption(option);
  // 4. 高亮切换
  const btns = document.querySelector("#btns");
  btns.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
      btns.querySelector(".btn-blue").classList.remove("btn-blue");
      e.target.classList.add("btn-blue");
    }
    // 5. 数据切换
    const index = e.target.innerText;
    option.xAxis.data = groupData[index].map((ele) => ele.name);
    option.series[0].data = groupData[index].map((ele) => ele.hope_salary);
    option.series[1].data = groupData[index].map((ele) => ele.salary);
    // 6. 重新渲染
    myChart.setOption(option);
  });
}
// 渲染性别薪资
function renderGender(salaryData) {
  // 1. 实例化echart对象
  const myChart = echarts.init(document.querySelector("#gender"));
  // 2. 调整配置
  const option = {
    tooltip: {},
    title: [
      {
        text: "男女薪资分布",
        left: 10,
        top: 10,
        textStyle: {
          fontSize: 16,
        },
      },
      {
        text: "男生",
        left: "50%",
        top: "45%",
        textStyle: {
          fontSize: 12,
        },
      },
      {
        text: "女生",
        left: "50%",
        top: "85%",
        textStyle: {
          fontSize: 12,
        },
      },
    ],
    color: ["#fda224", "#5097ff", "#3abcfa", "#34d39a"],
    series: [
      {
        type: "pie",
        radius: ["20%", "30%"],
        center: ["50%", "30%"],
        label: {
          show: true,
        },
        data: salaryData.map((ele) => {
          return {
            value: ele.b_count,
            name: ele.label,
          };
        }),
      },
      {
        type: "pie",
        radius: ["20%", "30%"],
        center: ["50%", "70%"],
        label: {
          show: true,
        },
        data: salaryData.map((ele) => {
          return {
            value: ele.g_count,
            name: ele.label,
          };
        }),
      },
    ],
  };
  // 3. 调用setOption方法
  myChart.setOption(option);
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
  const { overview, year, salaryData, groupData } = res.data;
  renderOverview(overview);
  renderYearSalary(year);
  renderDistribute(salaryData);
  renderGroup(groupData);
  renderGender(salaryData);
}
getData();
