import { apiClient } from "../lib/apiClient";
import { ApiResponse } from "../types/api-response";
import { Category, CreateCategoryData } from "../types/category";

async function createCategory(payload: CreateCategoryData): Promise<ApiResponse<Category>> {
  const res: ApiResponse<Category> = await apiClient.post('/category/', payload)

  return res;
}

async function getAllCategory(): Promise<ApiResponse<Category[]>> {
  const res: ApiResponse<Category[]> = await apiClient.get('/category/')

  return res;
}

async function getAllBusinessCategory(): Promise<ApiResponse<Category[]>> {
  const res: ApiResponse<Category[]> = await apiClient.get('/category/business/')

  return res;
}

async function getCategoryById(id: string): Promise<ApiResponse<Category>> {
  const res: ApiResponse<Category> = await apiClient.get(`/category/${id}`)

  return res;
}



const CategoryService = {
  createCategory,
  getAllCategory,
  getAllBusinessCategory,
  getCategoryById,
};

export default CategoryService;
