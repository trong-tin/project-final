import { del, get, post, push } from "../Utils/request";

export const login = async (email, password) => {
  const result = await get(`company?email=${email}&password=${password}`);
  return result;
};
export const getListCity = async () => {
  const result = await get("city");
  return result;
};
export const getAllJob = async () => {
  const result = await get("jobs");
  return result;
};
export const getCompany = async () => {
  const result = await get("company");
  return result;
};
export const getJob = async (id) => {
  const result = await get(`jobs?id=${id}`);
  return result;
};
export const getDetailCompany = async (idCompany) => {
  const result = await get(`company?id=${idCompany}`);
  return result;
};
export const getTags = async () => {
  const result = await get("tags");
  return result;
};
export const postCompany = async (option) => {
  const result = await post(option, "company");
  return result;
};

export const getListJob = async (id) => {
  const result = await get(`jobs?idCompany=${id}`);
  return result;
};

export const getListCV = async (id) => {
  const result = await get(`cv?idCompany=${id}`);
  return result;
};

export const changeCompany = async (id, option) => {
  const result = await push("company", id, option);
  return result;
};
export const delJobCompany = async (id) => {
  const result = await del("jobs", id);
  return result;
};
export const editJob = async (id, option) => {
  const result = await push("jobs", id, option);
  return result;
};

export const createJob = async (option) => {
  const result = post(option, "jobs");
  return result;
};
export const deleteCV = async (id) => {
  const result = await del("cv", id);
  return result;
};
export const getCV = async (id) => {
  const result = await get(`cv?id=${id}`);
  return result;
};
export const patchCV = async (id, option) => {
  const result = await push("cv", id, option);
  return result;
};
export const postCV = async (option) => {
  const result = await post(option, "cv");
  return result;
};
