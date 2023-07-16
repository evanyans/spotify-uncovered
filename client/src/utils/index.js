export const getHashParams = () => {
    const hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  
  //#access_token=BQCMSdXyXd4ckaEBhhORNo6cl3E50ytJ7rUDu6dJHrXxly-GXVBH1dgDEtuaOt0ToqOUkSDoBWZm_KTO2H7BQQLXT8utKZoRTZKlC6FjXdOp8_bU5tw54_apHiVWf5oN6iZuQOQQvs0CXTQKSxazMPZ5g9YIMLT0_OGm0S20gKom2eFdxkfLqC77nwOybTBSluMSAz9T0zmb92xSQNLXgeTZOPwQ6VSLpTUFBRpNFPwruPTkPRBE&
  //refresh_token=AQBpcYfz7ikRU2Xqj5ozDUqrR2WPBHCpRhYuQJdZmOBXC6OgBcP6a5JlTEDHZJDU-U3RIa11LSREUG1WEdA-KZ5Uyc6M5Pq40YZMH77t8CrjMqgfcoLycOYN5plslCHPIn4
  