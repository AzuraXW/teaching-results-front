import Mock from "mockjs";

Mock.setup({
  timeout: "1000-2000",
});
// 获取轮播图
Mock.mock("/v1/banner", "get", () => {
  const banners = [];
  for (let i = 0; i < 4; i++) {
    banners.push(
      Mock.mock({
        "id|1-100": 100,
        alt: Mock.Random.sentence(2),
        url: Mock.Random.dataImage("600x400"),
      })
    );
  }

  return {
    code: 200,
    message: "请求成功",
    data: banners,
  };
});

Mock.mock("/v1/footer", "get", () => {
  return {
    code: 200,
    message: "请求成功",
    data: Mock.mock({
      organization: "@ctitle(3, 5)",
      address: "@county(true)",
      zip: "@zip",
      contact: "@natural",
      recordnumber: "@natural",
    }),
  };
});

Mock.mock("/v1/column", "get", () => {
  return {
    code: 200,
    message: "请求成功",
    data: [
      {
        name: "申报书",
        id: 1,
      },
      {
        name: "成果报告",
        id: 2,
      },
      {
        name: "成果视频",
        id: 3,
      },
      {
        name: "成果应用",
        id: 4,
      },
      {
        name: "支撑材料",
        id: 5,
      },
    ],
  };
});

Mock.mock("/v1/column/1/content", "get", () => {
  const data = Mock.mock({
    "data|1-10": [
      {
        "name|+1": ["成果介绍", "主要解决的教学问题"],
        id: "@natural",
      },
    ],
  });
  return {
    code: 200,
    message: "请求成功",
    data: data.data,
  };
});

// 获取成果简介
Mock.mock("/v1/introduction", "get", () => {
  const introduction = Mock.mock({
    title: Mock.Random.cparagraph(2),
    content: Mock.Random.cparagraph(12),
    description: Mock.Random.cparagraph(40),
  });

  return {
    code: 200,
    message: "请求成功",
    data: introduction,
  };
});

// 获取新闻
Mock.mock("/v1/article", "get", () => {
  const articles = [];
  for (let i = 0; i < 5; i++) {
    articles.push(
      Mock.mock({
        id: "@natural",
        title: Mock.Random.cparagraph(2),
        content: Mock.Random.cparagraph(12),
        description: Mock.Random.cparagraph(40),
      })
    );
  }

  return {
    code: 200,
    message: "请求成功",
    data: articles,
  };
});

// 获奖荣誉
Mock.mock("/v1/honors", "get", () => {
  const honors = [
    {
      url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
      alt: "",
    },
    {
      url: "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
      alt: "",
    },
    {
      url: "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
      alt: "",
    },
    {
      url: "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
      alt: "",
    },
    {
      url: "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
      alt: "",
    },
    {
      url: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
      alt: "",
    },
    {
      url: "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
      alt: "",
    },
  ];

  return {
    code: 200,
    message: "请求成功",
    data: honors,
  };
});
