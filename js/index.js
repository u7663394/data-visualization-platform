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
  const { overview, year } = res.data;
  renderOverview(overview);
  renderYearSalary(year);
}
getData();
