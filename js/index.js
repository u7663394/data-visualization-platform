// 校验是否登录
checkLogin();
// 渲染用户名
renderUsername();
// 退出登录功能
logout();
const chartPalette = ["#0f766e", "#2563eb", "#f59e0b", "#64748b"];
const chartTextColor = "#15202b";
const chartMutedColor = "#647282";
const chartLineColor = "#dfe8ee";
const chartTooltip = {
  borderWidth: 0,
  backgroundColor: "rgba(8, 23, 35, 0.92)",
  textStyle: {
    color: "#fff",
  },
  extraCssText: "box-shadow: 0 14px 34px rgba(8,23,35,.22); border-radius: 8px;",
};

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
      textStyle: {
        color: chartTextColor,
        fontSize: 16,
        fontWeight: 700,
      },
    },
    grid: {
      top: "22%",
      left: "8%",
      right: "5%",
      bottom: "12%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: chartLineColor,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: chartMutedColor,
      },
      data: year.map((ele) => ele.month),
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: chartMutedColor,
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: chartLineColor,
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
              { offset: 0, color: "rgba(15,118,110,0.22)" },
              { offset: 1, color: "rgba(255,255,255,0)" },
            ],
            global: false,
          },
        },
        symbol: "circle",
        symbolSize: 8,
        itemStyle: {
          color: "#0f766e",
          borderColor: "#ffffff",
          borderWidth: 3,
        },
        lineStyle: {
          width: 4,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: "#0f766e" },
              { offset: 1, color: "#2563eb" },
            ],
            global: false,
          },
        },
      },
    ],
    tooltip: {
      trigger: "axis",
      ...chartTooltip,
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
      textStyle: {
        color: chartTextColor,
        fontSize: 16,
        fontWeight: 700,
      },
    },
    tooltip: {
      trigger: "item",
      ...chartTooltip,
    },
    legend: {
      bottom: "5%",
      left: "center",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: chartMutedColor,
      },
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
          borderRadius: 8,
          borderColor: "#fff",
          borderWidth: 4,
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
    color: chartPalette,
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
      containLabel: true,
    },
    tooltip: chartTooltip,
    xAxis: {
      axisLine: {
        lineStyle: {
          color: chartLineColor,
        },
      },
      axisTick: {
        show: false,
      },
      type: "category",
      data: groupData[1].map((ele) => ele.name),
      axisLabel: {
        color: chartMutedColor,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: chartMutedColor,
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: chartLineColor,
        },
      },
    },
    series: [
      {
        name: "期望薪资",
        data: groupData[1].map((ele) => ele.hope_salary),
        type: "bar",
        barMaxWidth: 24,
        barGap: "36%",
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#0f766e" },
              { offset: 1, color: "rgba(15,118,110,0.22)" },
            ],
            global: false,
          },
        },
      },
      {
        name: "实际薪资",
        data: groupData[1].map((ele) => ele.salary),
        type: "bar",
        barMaxWidth: 24,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#f59e0b" },
              { offset: 1, color: "rgba(245,158,11,0.22)" },
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
    tooltip: chartTooltip,
    title: [
      {
        text: "男女薪资分布",
        left: 10,
        top: 10,
        textStyle: {
          fontSize: 16,
          color: chartTextColor,
          fontWeight: 700,
        },
      },
      {
        text: "男生",
        left: "50%",
        top: "45%",
        textStyle: {
          fontSize: 12,
          color: chartMutedColor,
          fontWeight: 700,
        },
      },
      {
        text: "女生",
        left: "50%",
        top: "85%",
        textStyle: {
          fontSize: 12,
          color: chartMutedColor,
          fontWeight: 700,
        },
      },
    ],
    color: chartPalette,
    series: [
      {
        type: "pie",
        radius: ["20%", "30%"],
        center: ["50%", "30%"],
        label: {
          show: true,
          color: chartMutedColor,
        },
        itemStyle: {
          borderRadius: 6,
          borderColor: "#fff",
          borderWidth: 3,
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
          color: chartMutedColor,
        },
        itemStyle: {
          borderRadius: 6,
          borderColor: "#fff",
          borderWidth: 3,
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
// 渲染籍贯分布
function renderProvince(provinceData) {
  // 1. 实例化echart对象
  const myEchart = echarts.init(document.querySelector("#map"));
  // 2. 筛选数据
  const dataList = [
    { name: "南海诸岛", value: 0 },
    { name: "北京", value: 0 },
    { name: "天津", value: 0 },
    { name: "上海", value: 0 },
    { name: "重庆", value: 0 },
    { name: "河北", value: 0 },
    { name: "河南", value: 0 },
    { name: "云南", value: 0 },
    { name: "辽宁", value: 0 },
    { name: "黑龙江", value: 0 },
    { name: "湖南", value: 0 },
    { name: "安徽", value: 0 },
    { name: "山东", value: 0 },
    { name: "新疆", value: 0 },
    { name: "江苏", value: 0 },
    { name: "浙江", value: 0 },
    { name: "江西", value: 0 },
    { name: "湖北", value: 0 },
    { name: "广西", value: 0 },
    { name: "甘肃", value: 0 },
    { name: "山西", value: 0 },
    { name: "内蒙古", value: 0 },
    { name: "陕西", value: 0 },
    { name: "吉林", value: 0 },
    { name: "福建", value: 0 },
    { name: "贵州", value: 0 },
    { name: "广东", value: 0 },
    { name: "青海", value: 0 },
    { name: "西藏", value: 0 },
    { name: "四川", value: 0 },
    { name: "宁夏", value: 0 },
    { name: "海南", value: 0 },
    { name: "台湾", value: 0 },
    { name: "香港", value: 0 },
    { name: "澳门", value: 0 },
  ];
  dataList.forEach((ele) => {
    const res = provinceData.find((v) => {
      return v.name.includes(ele.name);
    });
    if (res) {
      ele.value = res.value;
    }
  });
  // 3. 调整配置
  const option = {
    title: {
      text: "籍贯分布",
      top: 10,
      left: 10,
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} 位学员",
      borderColor: "transparent",
      backgroundColor: "rgba(0,0,0,0.5)",
      textStyle: {
        color: "#fff",
      },
      extraCssText: chartTooltip.extraCssText,
    },
    visualMap: {
      min: 0,
      max: 6,
      left: "left",
      bottom: "20",
      text: ["6", "0"],
      inRange: {
        color: ["#eef7f6", "#0f766e"],
      },
      show: true,
      left: 40,
    },
    geo: {
      map: "china",
      roam: false,
      zoom: 1.0,
      label: {
        normal: {
          show: true,
          fontSize: "10",
          color: "rgba(21,32,43,0.72)",
        },
      },
      itemStyle: {
        normal: {
          borderColor: "rgba(15, 35, 50, 0.16)",
          color: "#eef7f6",
        },
        emphasis: {
          areaColor: "#f59e0b",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: "rgba(8, 23, 35, 0.24)",
        },
      },
    },
    series: [
      {
        name: "籍贯分布",
        type: "map",
        geoIndex: 0,
        data: dataList,
      },
    ],
  };
  // 4. 调用setOption方法
  myEchart.setOption(option);
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
  const { overview, year, salaryData, groupData, provinceData } = res.data;
  renderOverview(overview);
  renderYearSalary(year);
  renderDistribute(salaryData);
  renderGroup(groupData);
  renderGender(salaryData);
  renderProvince(provinceData);
}
getData();
