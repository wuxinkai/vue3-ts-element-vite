import { RuleItem } from './rules'
import { CSSProperties } from 'vue'
import { ValidateFieldsError } from 'async-validator'
//可配置
export interface FormOptions {
  //表单项 显示什么 input  select ckeckbox ...
  type: 'cascader' | 'checkbox' | 'checkbox-group' | 'checkbox-button' | 'color-picker' |
  'date-picker' | 'input' | 'input-number' | 'radio' | 'radio-group' | 'radio-button' | 'rate' |
  'select' | 'option' | 'slider' | 'switch' | 'time-picker' | 'time-select' |
  'transfer' | 'upload' | 'editor',
  value?: any, // 表单项的值
  label?: string, // 表单项label
  prop?: string, // 表单项 是否要做验证
  rules?: RuleItem[], // 表单项验证规则
  placeholder?: string, // 占位符
  attrs?: { //不断的添加，这里的内容很多
    clearable?: boolean,
    showPassword?: boolean,
    disabled?: boolean,
    rows?: number | string, //文本框专用
    maxlength?: number | string, //文字数量
    showWordLimit?: boolean, //是否显示 输入多少个字
    readonly?: boolean, //只读属性
    resize?: string, //文本框不能拖拽
    type?: string,//是input还是textarea类型
    // CSS 样式属性
    style?: CSSProperties,
  },
  // 表单项的子元素    ---------有菜单才需要的，比如 checkbox select radio-----------------
  children?: FormOptions[],
  // 处理上传组件的属性和方法   -     -----------------上传所需要的类型--------------------
  uploadAttrs?: {
    action: string, //上传的地址
    header?: string, //上传头部信息
    method?: 'post' | 'put' | 'patch', //上传方法
    multiple?: boolean, //是否支持多选
    data?: any, //上传额外参数
    name?: string, //上传的字段名
    withCreadentials?: boolean, //是否允许写的token
    showFileList?: boolean, //是否显示上传后的列表
    drag?: boolean,//是否拖拽上传
    accept?: string,//接受上传文件类型
    thumbnailMode?: boolean,//是否显示缩略图
    listType?: 'text' | 'picture' | 'picture-card',//文件列表类型
    autoUpload?: boolean,//是否需要自动上传
    disabled?: boolean,//
    limit?: number,//允许上传最大数量
  }
}


//验证所有属性
export interface ValidateFieldCallback { 
  (message: string, invalidFields?: ValidateFieldsError): void
}

//回调函数
interface Callback {
  (isValid: boolean, invalidFields?: ValidateFieldsError): void
}

//按钮所有属性
export interface FormInstance {
  registerLabelWidth(width: number, oldWidth: number): void,
  deregisterLabelWidth(width: number): void,
  autoLabelWidth: string | undefined,
  emit: (evt: string, ...args: any[]) => void,
  labelSuffix: string,
  inline?: boolean,
  model?: Record<string, unknown>,
  size?: string,
  showMessage?: boolean,
  labelPosition?: string,
  labelWidth?: string,
  rules?: Record<string, unknown>,
  statusIcon?: boolean,
  hideRequiredAsterisk?: boolean,
  disabled?: boolean,
  validate: (callback?: Callback) => Promise<boolean>,
  resetFields: () => void,
  clearValidate: (props?: string | string[]) => void,
  validateField: (props: string | string[], cb: ValidateFieldCallback) => void,
}