import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

// 서버 프로젝트의 루트 폴더
export const PROJECT_ROOT_PATH = process.cwd();
// 외부에서 접근 가능한 파일들을 모아둔 폴더 이름
export const PUBLIC_FOLDER_NAME = 'public';
// 피드 이미지들을 저장할 폴더 이름
export const FEEDS_FOLDER_NAME = 'feeds';

// 실제 공개폴더의 절대경로
// /{프로젝트의 위치}/public
export const PUBLIC_FOLDER_PATH = join(PROJECT_ROOT_PATH, PUBLIC_FOLDER_NAME);

// 피드 이미지를 저장할 폴더
// /{프로젝트의 위치}/public/feeds
export const FEED_IMAGE_PATH = join(PUBLIC_FOLDER_PATH, FEEDS_FOLDER_NAME);

// 절대경로x /public/feeds/xxx.jpg
export const FEED_PUBLIC_IMAGE_PATH = join(
  PUBLIC_FOLDER_NAME,
  FEEDS_FOLDER_NAME,
);

export const FEED_PUBLIC_IMAGE_URL = join(process.env.WEATHER_URL, FEED_PUBLIC_IMAGE_PATH);
