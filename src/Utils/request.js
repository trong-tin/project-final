const API_DOMAIN = "https://db-final.onrender.com/";
export const get = async (path) => {
  const response = await fetch(API_DOMAIN + path);
  const result = await response.json();
  return result;
};

export const post = async (option, path) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(option),
  });
  const result = await response.json();
  return result;
};

export const del = async (path, id) => {
  const stringId = String(id);
  const response = await fetch(API_DOMAIN + path + "/" + stringId, {
    method: "DELETE",
  });
  const result = await response.json();
  return result;
};

export const push = async (path, id, option) => {
  const response = await fetch(API_DOMAIN + path + "/" + id, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(option),
  });
  const result = response.json();
  return result;
};
