export interface Case {
  type?: string;
  id: string;
  dairy_no?: string;
  year: number;
  petitioner?: string;
  defendant?: string;
  client?: string;
  petadvocate?: string;
  defadvocate?: string;
  subject?: string;
  status?: string;
  judge?: string;
  lastupdated: string;
  hearings?: any[];
  judgement?: string;
  pdf?: string;
  court: string;
}