/// <reference path="../../typings/tsd.d.ts"/>

export class HttpService {

  constructor() {

  }

  get(url: string, successCb, exceptionCb) {
    fetch(url)
      .then((response) => {
      return response.json();
    })
      .then((jsonData) => {
      successCb(jsonData);
    }).catch(function(ex) {
      exceptionCb(ex);
    });
  }

  post(url: string, data: any, successCb, exceptionCb) {
    fetch(url, {
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)

    }).then((response) => {
      let jsonData = response.json();

      return jsonData;

    }).then((jsonData) => {
      successCb(jsonData);
    }).catch(function(ex) {
      exceptionCb(ex);
    });
  }
}
