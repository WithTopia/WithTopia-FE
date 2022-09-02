export const createSession = (sessionId) => {
    const data = JSON.stringify({ customSessionId: sessionId });
    return new Promise(async (resolve, reject) => {
      await openviduInstance
        .post(`/openvidu/api/sessions`, data)
        .then((response) => {
          resolve(response.data.id);
        })
        .catch((response) => {
          const err = Object.assign({}, response);
          if (err?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
                process.env.REACT_APP_OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  process.env.REACT_APP_OPENVIDU_SERVER_URL +
                  '"\\n\\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  process.env.REACT_APP_OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                process.env.REACT_APP_OPENVIDU_SERVER_URL + '/accept-certificate'
              );
            }
          }
        });
    });
  };