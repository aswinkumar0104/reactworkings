const APIRequest = async (url = "", optionsObj = null, errMesg = null) => {
  try {
    const response = await fetch(url, optionsObj);
    if (!response.ok) {
      throw Error("Please reload the app");
    }
    //response = await response.json();
  } catch (err) {
    errMesg = err.Message;
  } finally {
    return errMesg;
  }
};

export default APIRequest;
