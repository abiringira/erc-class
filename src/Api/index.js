
import request from './request'

const methods = {
  get: "GET",
  post: "POST",
  patch: "PATCH",
  delete: "DELETE"
};

export default {
    login: (data) => request(methods.post, '/auth/signin',data),
    courses : () => request(methods.get,'/courses',null,true),
    participants : () => request(methods.get,'/courses/1/participants',null,true),
    users : () => request(methods.get,'/users',null,true),
    signup : (data) => request(methods.post,'/auth/signup',data)
};
