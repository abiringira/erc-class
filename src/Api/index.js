
import request from './request'

const methods = {
  get: "GET",
  post: "POST",
  patch: "PATCH",
  delete: "DELETE"
};

export default {
    login: (data) => request(methods.post, '/auth/signin',data),
    courses : () => request(methods.get,'/courses',null,true)
};
