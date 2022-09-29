import Mock from "mockjs"

// 获取轮播图
Mock.mock("/v1/banner", "get", () => {
  const banners = []
  for (let i = 0; i < 3; i++) {
    banners.push(Mock.mock({
      "id|1-100": 100,
      alt: Mock.Random.sentence(2),
      url: Mock.Random.dataImage('1920x450')
    }))
  }

  return {
    code: 200,
    message: "请求成功",
    data: banners
  }
})


Mock.mock("/v1/footer", "get", () => {
  return {
    code: 200,
    message: "请求成功",
    data: Mock.mock({
      organization: '@ctitle(3, 5)',
      address: '@county(true)',
      zip: '@zip',
      contact: '@natural',
      recordnumber: '@natural'
    })
  }
})