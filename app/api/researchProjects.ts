import http from '@/utils/http'

// 创建研究项目所需字段
export interface ResearchProjectDTO {
  title: string
  description: string
  imageUrl?: string
}

// 更新研究项目所需字段
export interface UpdateResearchProjectDTO extends ResearchProjectDTO {
  uid: string
}

// 创建研究项目
export const createResearchProject = (data: ResearchProjectDTO) => {
  const args = {
    url: '/research-projects/create',
    method: 'POST',
    data,
    json: true
  }
  return http.request(args)
}

// 获取单条研究项目
export const getResearchProjectByUid = (uid: string) => {
  const args = {
    url: `/research-projects/get/${uid}`,
    method: 'GET'
  }
  return http.request(args)
}

// 获取所有研究项目（未删除）
export const listResearchProjects = () => {
  const args = {
    url: '/research-projects/list',
    method: 'GET'
  }
  return http.request(args)
}

// 更新研究项目
export const updateResearchProject = (data: UpdateResearchProjectDTO) => {
  const args = {
    url: '/research-projects/update',
    method: 'POST',
    data,
    json: true
  }
  return http.request(args)
}

// 删除研究项目（逻辑删除）
export const deleteResearchProject = (uid: string) => {
  const args = {
    url: `/research-projects/delete/${uid}`,
    method: 'GET'
  }
  return http.request(args)
}
