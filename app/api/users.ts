import http from '@/utils/http'

// 创建用户字段
export interface UserDTO {
  username: string
  password: string
  email: string
  role?: string
}

// 更新用户字段
export interface UpdateUserDTO extends UserDTO {
  uid: string
}

// 创建用户
export const createUser = (data: UserDTO) => {
  const args = {
    url: '/users/create',
    method: 'POST',
    data,
    json: true
  }
  return http.request(args)
}

// 获取单个用户
export const getUserByUid = (uid: string) => {
  const args = {
    url: `/users/get/${uid}`,
    method: 'GET'
  }
  return http.request(args)
}

// 获取所有用户
export const listUsers = () => {
  const args = {
    url: '/users/list',
    method: 'GET'
  }
  return http.request(args)
}

// 更新用户
export const updateUser = (data: UpdateUserDTO) => {
  const args = {
    url: '/users/update',
    method: 'POST',
    data,
    json: true
  }
  return http.request(args)
}

// 删除用户（逻辑删除）
export const deleteUser = (uid: string) => {
  const args = {
    url: `/users/delete/${uid}`,
    method: 'GET'
  }
  return http.request(args)
}
