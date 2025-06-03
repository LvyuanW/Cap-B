import http from '@/utils/http'

// 创建新闻所需字段
export interface NewsDTO {
  title: string
  content: string
  imageUrl?: string
}

// 更新新闻所需字段
export interface UpdateNewsDTO extends NewsDTO {
  uid: string
}

// 创建新闻
export const createNews = (data: NewsDTO) => {
  const args = {
    url: '/news/create',
    method: 'POST',
    data,
    json: true
  }
  return http.request(args)
}

// 获取单条新闻
export const getNewsByUid = (uid: string) => {
  const args = {
    url: `/news/get/${uid}`,
    method: 'GET'
  }
  return http.request(args)
}

// 获取所有新闻（未删除）
export const listNews = () => {
  const args = {
    url: '/news/list',
    method: 'GET'
  }
  return http.request(args)
}

// 更新新闻
export const updateNews = (data: UpdateNewsDTO) => {
  const args = {
    url: '/news/update',
    method: 'POST',
    data,
    json: true
  }
  return http.request(args)
}

// 删除新闻（逻辑删除）
export const deleteNews = (uid: string) => {
  const args = {
    url: `/news/delete/${uid}`,
    method: 'GET'
  }
  return http.request(args)
}
