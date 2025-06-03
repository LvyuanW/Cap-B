import http from '@/utils/http'

// 创建研究方向字段
export interface ResearchAreaDTO {
  content: string
}

// 更新研究方向字段
export interface UpdateResearchAreaDTO extends ResearchAreaDTO {
  uid: string
}

// 创建研究方向
export const createResearchArea = (data: ResearchAreaDTO) => {
  const args = {
    url: '/research-areas/create',
    method: 'POST',
    data,
    json: true,
  }
  return http.request(args)
}

// 获取单个研究方向
export const getResearchAreaByUid = (uid: string) => {
  const args = {
    url: `/research-areas/get/${uid}`,
    method: 'GET',
  }
  return http.request(args)
}

// 获取所有研究方向
export const listResearchAreas = () => {
  const args = {
    url: '/research-areas/list',
    method: 'GET',
  }
  return http.request(args)
}

// 更新研究方向
export const updateResearchArea = (data: UpdateResearchAreaDTO) => {
  const args = {
    url: '/research-areas/update',
    method: 'POST',
    data,
    json: true,
  }
  return http.request(args)
}

// 删除研究方向（逻辑删除）
export const deleteResearchArea = (uid: string) => {
  const args = {
    url: `/research-areas/delete/${uid}`,
    method: 'GET',
  }
  return http.request(args)
}
