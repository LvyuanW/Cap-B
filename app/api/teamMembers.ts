import http from '@/utils/http'

// 创建团队成员字段
export interface TeamMemberDTO {
  avatarUrl?: string
  title: string
  role: string
  degree: string
  university: string
  description: string
}

// 更新团队成员字段（含 uid）
export interface UpdateTeamMemberDTO extends TeamMemberDTO {
  uid: string
}

// 创建团队成员
export const createTeamMember = (data: TeamMemberDTO) => {
  const args = {
    url: '/team-members/create',
    method: 'POST',
    data,
    json: true
  }
  return http.request(args)
}

// 获取单条团队成员信息
export const getTeamMemberByUid = (uid: string) => {
  const args = {
    url: `/team-members/get/${uid}`,
    method: 'GET'
  }
  return http.request(args)
}

// 获取所有团队成员（未删除）
export const listTeamMembers = () => {
  const args = {
    url: '/team-members/list',
    method: 'GET'
  }
  return http.request(args)
}

// 更新团队成员
export const updateTeamMember = (data: UpdateTeamMemberDTO) => {
  const args = {
    url: '/team-members/update',
    method: 'POST',
    data,
    json: true
  }
  return http.request(args)
}

// 删除团队成员（逻辑删除）
export const deleteTeamMember = (uid: string) => {
  const args = {
    url: `/team-members/delete/${uid}`,
    method: 'GET'
  }
  return http.request(args)
}
