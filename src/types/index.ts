//数据类型定义
export interface sgmData {
  type?: number;
  code?: string;
  msg?: string;
  stack?: string;
  filename?: string;
  level?: number;
}

export interface requestData {
  data?: any;
  code: string;
  msg: string;
  success: boolean;
}
