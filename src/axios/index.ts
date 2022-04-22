import axios from 'axios';

export default axios.create({
  baseURL: `https://${process.env.REACT_APP_BASEURL}/`,
});
