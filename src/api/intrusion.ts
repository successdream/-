import API from '.';

const BASE_URL = '/intrusion';

export interface Point {
  x: number;
  y: number;
}

export interface Rule {
  location: Point[];
  rule_id: string;
}

export interface Params {
  notify_url: string;
  rtsp_url: string;
  region: Rule[];
  confidence: number;
  nms: number;
}

export interface originRule {
  type: string;
  id: string;
  name: string;
  data: Point[];
  color: string;
}

export interface Record {
  rtsp_url: string;
  session_id: string;
  confidence_thres: number;
  nms_thres: number;
  ts: string;
  objects: any[];
  img_base64: string;
  time?: string;
}

export default {
  
}