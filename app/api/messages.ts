import http from '@/utils/http'

// 创建消息所需的字段
export interface MessageDTO {
  name: string
  email: string
  subject: string
  message: string
}

// 更新消息时用到的字段（目前仅支持修改 isRead）
export interface UpdateMessageDTO {
  uid: string
  isRead: number
}

// 创建消息
export const createMessage = (data: MessageDTO) => {
  const args = {
    url: '/messages/create',
    method: 'POST',
    data,
    json: true,
  }
  return http.request(args)
}

// 获取单条消息
export const getMessageByUid = (uid: string) => {
  const args = {
    url: `/messages/get/${uid}`,
    method: 'GET',
  }
  return http.request(args)
}

// 获取所有消息（未删除）
export const listMessages = () => {
  const args = {
    url: '/messages/list',
    method: 'GET',
  }
  return http.request(args)
}

// 更新消息（如标记已读）
export const updateMessage = (data: UpdateMessageDTO) => {
  const args = {
    url: '/messages/update',
    method: 'POST',
    data,
    json: true,
  }
  return http.request(args)
}

// 删除消息（逻辑删除）
export const deleteMessage = (uid: string) => {
  const args = {
    url: `/messages/delete/${uid}`,
    method: 'GET',
  }
  return http.request(args)
}
