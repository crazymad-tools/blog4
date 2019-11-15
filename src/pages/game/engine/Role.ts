import Goods from './Goods';

export interface RoleInfo {
  name: string;
  birth: number;
}

export interface RoleProperty {
  blood: number;
}

/**
 * 人物基类
 */
export class Role {
  /**
   * 背包
   */
  pack: Goods[] = [];

  /**
   * 人物信息
   */
  info: RoleInfo;

  /**
   * 人物属性
   */
  property: RoleProperty;

  constructor (info: RoleInfo, property: RoleProperty) {
    this.info = info;
    this.property = property;
  }
}

export default Role;
