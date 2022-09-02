export const createToken = (sessionId) => {
    const data = {};
    return new Promise(async (resolve, reject) => {
      await openviduInstance
        .post(`/openvidu/api/sessions/${sessionId}/connection`, data)
        .then((response) => {
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };