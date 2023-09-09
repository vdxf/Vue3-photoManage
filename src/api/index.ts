import request from '@/utils/request'
import { withLoading } from '@/utils/withLoading'

// 发送邮件
export const doEmailSend = withLoading((data: {}) => {
  return request({
    url: '/api/v1/common/email/send',
    method: 'POST',
    data
  })
})

// 注册
export const doRegister = withLoading((data: {}) => {
  return request({
    url: '/api/v1/auth/signup',
    method: 'POST',
    data
  })
})

// 登录
export const doLogin = withLoading((data: { email: string; password: string }) => {
  return request<{ token: string }>({
    url: '/api/v1/auth/signin',
    method: 'POST',
    data
  })
})

//文件上传
export const doFile = withLoading((data: {}) => {
  return request({
    url: '/api/v1/common/upload/image',
    method: 'POST',
    data
  })
})

// 创建图片
export const doGain = withLoading((data: {}) => {
  return request({
    url: '/api/v1/picture',
    method: 'POST',
    data
  })
})

//获取图片列表
export const doTabulation = (data: {}) => {
  return request({
    url: `/api/v1/picture`,
    method: 'GET',
    params: data
  })
}

//图片更新
export const doUpdata = withLoading((data: { id: string }) => {
  return request({
    url: `/api/v1/picture/${data.id}`,
    method: 'PATCH',
    data
  })
})

//删除
export const doDelete = withLoading((id) => {
  return request({
    url: `/api/v1/picture/${id}`,
    method: 'DELETE'
  })
})

//图片详情
export const doDetail = withLoading((id) => {
  return request({
    url: `/api/v1/picture/${id}`,
    method: 'GET'
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
export const doUpdateUserInformation = withLoading((data) => {
  return request({
    url: `/api/v1/user/profile`,
    method: 'PATCH',
    data
  })
})

//用户列表
export const doUserList = withLoading((data) => {
  return request({
    url: `/api/v1/user`,
    method: 'GET',
    params: data
  })
})
//通过id用户详情
export const doUserDetails = (id) => {
  return request({
    url: `/api/v1/user/${id}`,
    method: 'GET'
  })
}

//修改密码
export const doUpdatePassword = (data) => {
  return request({
    url: `/api/v1/user/update-password`,
    method: 'PATCH',
    data
  })
}

//重置密码
export const doResetPassword = (data) => {
  return request({
    url: `/api/v1/user/reset-password`,
    method: 'PATCH',
    data
  })
}

// 点赞
export const doLike = (pictureId) => {
  return request({
    url: `/api/v1/like`,
    method: 'POST',
    data: pictureId
  })
}

// 取消点赞
export const doCancellike = (pictureId) => {
  return request({
    url: `/api/v1/like`,
    method: 'DELETE',
    data: pictureId
  })
}

// 收藏
export const doCollect = (pictureId) => {
  return request({
    url: `/api/v1/collect`,
    method: 'POST',
    data: pictureId
  })
}
// 收藏列表
export const doCollectList = (data) => {
  return request({
    url: `/api/v1/collect`,
    method: 'GET',
    params: data
  })
}
// 取消收藏
export const doCancelCollect = (pictureId: string) => {
  return request({
    url: `/api/v1/collect`,
    method: 'DELETE',
    data: pictureId
  })
}
// 关注
export const doTrand = withLoading((followUserId: any) => {
  return request({
    url: `/api/v1/relation`,
    method: 'POST',
    data: followUserId
  })
})

// 取消关注
export const doCancelTrand = withLoading((followUserId: any) => {
  return request({
    url: `/api/v1/relation`,
    method: 'DELETE',
    data: followUserId
  })
})

//获取关注列表
export const doFollowList = withLoading((data: {}) => {
  return request({
    url: `/api/v1/relation/following`,
    method: 'GET',
    params: data
  })
})
//获取粉丝列表
export const doFansList = withLoading((data: {}) => {
  return request({
    url: `/api/v1/relation/follower`,
    method: 'GET',
    params: data
  })
})
