import axios from 'axios';
import interceptorsSetup from "./interceptors";
import { handleResponseError } from "./handleResponseErrors";

export default function serviceCall() {
  interceptorsSetup();
  return {
    get: (url, data = {}, loginUrl) => {
      return new Promise(function (resolve, reject) {
        axios
          .get(url, data)
          .then(function (res) {
            resolve(res);
            return res;
          })
          .catch(function (err) {
            handleResponseError(reject, err, loginUrl);
            reject(err);
          });
      });
    },
    post: (url, data = {}, loginUrl) => {
      return new Promise(function (resolve, reject) {
        axios
          .post(url, data)
          .then(function (res) {
            resolve(res);
            return res;
          })
          .catch(function (err) {
            handleResponseError(reject, err, loginUrl);
            reject(err);
          });
      });
    },
    put: (url, data = {}, loginUrl) => {
      return new Promise(function (resolve, reject) {
        axios
          .put(url, data)
          .then(function (res) {
            resolve(res);
            return res;
          })
          .catch(function (err) {
            handleResponseError(reject, err, loginUrl);
            reject(err);
          });
      });
    },
    delete: (url, loginUrl) => {
      return new Promise(function (resolve, reject) {
        axios
          .delete(url)
          .then(function (res) {
            resolve(res);
            return res;
          })
          .catch(function (err) {
            handleResponseError(reject, err, loginUrl);
            reject(err);
          });
      });
    }
  };
};
