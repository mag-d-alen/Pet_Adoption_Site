/** @format */

export function createAxiosHeaderGetReq(token, params = '') {
  console.log(params);
  return {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    params,
  };
}
