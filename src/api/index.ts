import request from '@/utils/request'
import { withLoading } from '@/utils/withLoading'

// 发送邮件
export const doEmailSend = withLoading((data: { email: string; type: string }) => {
  return request({
    url: '/api/v1/common/email/send',
    method: 'POST',
    data
  })
})

// 注册
export const doRegister = withLoading(
  (data: { nickname: string; email: string; password: string; captcha: number }) => {
    return request({
      url: '/api/v1/auth/signup',
      method: 'POST',
      data
    })
  }
)

// 登录
export const doLogin = withLoading((data: { email: string; password: string }) => {
  return request<{ token: string }>({
    url: '/api/v1/auth/signin',
    method: 'POST',
    data
  })
})

//文件上传
export const doFile = withLoading((formData: object) => {
  return request({
    url: '/api/v1/common/upload/image',
    method: 'POST',
    data: formData
  })
})

// 创建图片
export const doGain = withLoading(
  (data: { title: string; description: string; fileId: string; type: string }) => {
    return request({
      url: '/api/v1/picture',
      method: 'POST',
      data
    })
  }
)

//图片更新
export const doUpdata = withLoading(
  (data: { title: string; description: string; fileId: string; type: string; id: any }) => {
    return request({
      url: `/api/v1/picture`,
      method: 'PATCH',
      data
    })
  }
)

//获取图片列表
export const doTabulation = (data: {
  current: number
  length: number
  keyword?: string
  userId?: string
}) => {
  return request({
    url: `/api/v1/picture`,
    method: 'GET',
    params: data
  })
}

//图片详情
export const doDetail = withLoading((id: string) => {
  return request({
    url: `/api/v1/picture/${id}`,
    method: 'GET'
  })
})

//删除
export const doDelete = withLoading((id: string) => {
  return request({
    url: `/api/v1/picture/${id}`,
    method: 'DELETE'
  })
})

//通过token获取用户信息
export const doGetUserInformation = () => {
  return request({
    url: `/api/v1/user/profile`,
    method: 'GET'
  })
}

//更新用户信息
export const doUpdateUserInformation = withLoading(
  (data: { nickname?: string; signature: string; sex: string; avatarId: string }) => {
    return request({
      url: `/api/v1/user/profile`,
      method: 'PATCH',
      data
    })
  }
)

//用户列表
export const doUserList = withLoading(
  (data: { current: number; length: number; keyword?: string }) => {
    return request({
      url: `/api/v1/user`,
      method: 'GET',
      params: data
    })
  }
)

//通过id用户详情
export const doUserDetails = (id: string) => {
  return request({
    url: `/api/v1/user/${id}`,
    method: 'GET'
  })
}

//修改密码
export const doUpdatePassword = (data: { oldPassword: string; password: string }) => {
  return request({
    url: `/api/v1/user/update-password`,
    method: 'PATCH',
    data
  })
}

//重置密码
export const doResetPassword = (data: {
  email: string
  captcha: number
  resetPassword: string
}) => {
  return request({
    url: `/api/v1/user/reset-password`,
    method: 'PATCH',
    data
  })
}

// 点赞
export const doLike = (data: { pictureId: string }) => {
  return request({
    url: `/api/v1/like`,
    method: 'POST',
    data
  })
}

// 取消点赞
export const doCancellike = (data: { pictureId: string }) => {
  return request({
    url: `/api/v1/like`,
    method: 'DELETE',
    data
  })
}

// 收藏
export const doCollect = (data: { pictureId: string }) => {
  return request({
    url: `/api/v1/collect`,
    method: 'POST',
    data
  })
}
//收藏列表
export const doCollectList = (data: {
  current: number
  length: number
  keyword?: string
  userId: string
}) => {
  return request({
    url: `/api/v1/collect`,
    method: 'GET',
    params: data
  })
}
// 取消收藏
export const doCancelCollect = (data: { pictureId: string }) => {
  return request({
    url: `/api/v1/collect`,
    method: 'DELETE',
    data
  })
}
// 关注
export const doTrand = withLoading((data: { followUserId: string }) => {
  return request({
    url: `/api/v1/relation`,
    method: 'POST',
    data
  })
})

// 取消关注
export const doCancelTrand = withLoading((data: { followUserId: string }) => {
  return request({
    url: `/api/v1/relation`,
    method: 'DELETE',
    data
  })
})

//获取关注列表
export const doFollowList = withLoading(
  (data: { current: number; length: number; keyword?: string; userId: string }) => {
    return request({
      url: `/api/v1/relation/following`,
      method: 'GET',
      params: data
    })
  }
)
//获取粉丝列表
export const doFansList = withLoading(
  (data: { current: number; length: number; keyword?: string; userId: string }) => {
    return request({
      url: `/api/v1/relation/follower`,
      method: 'GET',
      params: data
    })
  }
)
