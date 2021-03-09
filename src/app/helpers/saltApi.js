const axios = require("axios");
const Constanst = require("../config/Constants")
class SaltAPI {
	async initToken(){
		const data = {
			username: "bkavsalt",
			password: "bkavsalt",
			eauth: "pam",
		  };
		try {
			const res = await axios.post(`${Constanst.BASE_URL}/login`, data)
			return res.data.return[0].token;
		} catch (error) {
			console.log(error);
		}
		// return res.data.return[0].token;
	}
}

module.exports = new SaltAPI;
