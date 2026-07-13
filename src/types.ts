export interface RiskItem {
  id: number;
  category1: '人的管理' | '供应商管理';
  category2: string;
  riskCategory: string;
  riskGroup: string;
  name: string;
  level: '高' | '中' | '低';
  isOnline: boolean;
  controlStandard: string;
  resolutionPoints: string;
  closedLoopStandard: string;
  contactPerson: string;
  contactId: string;
  exceptionMsg: string | null;
}
