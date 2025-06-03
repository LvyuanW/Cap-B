import http from '@/utils/http'

// DTO 类型定义（可选用于开发时类型提示）
export interface TeamDescriptionDTO {
  content: string
}

export interface UpdateTeamDescriptionDTO extends TeamDescriptionDTO {
  uid: string
}

export interface TeamDescription {
  uid: string
  content: string
  createdAt: string
  deletedAt?: string
  isDeleted: number
}

// 创建 TeamDescription
export const createTeamDescription = (data: TeamDescriptionDTO) => {
  const args = {
    url: '/team-descriptions/create',
    method: 'POST',
    data,
    json: true
  }
  return http.request(args)
}

// 获取单条 TeamDescription
export const getTeamDescriptionByUid = (uid: string) => {
  const args = {
    url: `/team-descriptions/get/${uid}`,
    method: 'GET'
  }
  return http.request(args)
}

// 获取所有 TeamDescription（未删除）
export const listTeamDescriptions = () => {
  const args = {
    url: '/team-descriptions/list',
    method: 'GET'
  }
  return http.request(args)
}

// 更新 TeamDescription
export const updateTeamDescription = (data: UpdateTeamDescriptionDTO) => {
  const args = {
    url: '/team-descriptions/update',
    method: 'POST',
    data,
    json: true
  }
  return http.request(args)
}

// 删除 TeamDescription（逻辑删除）
export const deleteTeamDescription = (uid: string) => {
  const args = {
    url: `/team-descriptions/delete/${uid}`,
    method: 'GET'
  }
  return http.request(args)
}
