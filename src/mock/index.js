import Mock from "mockjs";

// 获取轮播图
Mock.mock("/v1/banner", "get", () => {
  const banners = []
  for (let i = 0; i < 20; i++) {
    banners.push(Mock.mock({
      alt: Mock.Random.sentence(2),
      url: Mock.Random.dataImage('200x100')
    }))
  }

  return {
    code: 200,
    message: "请求成功",
    data: banners
  };
});
