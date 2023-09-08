export default {
	async verifyAuth () {
		const current_user = appsmith.store.current_user;
		if (!_.isEmpty(current_user)) {
			navigateTo('applications');
		}
	},
	async verifyUser () {
		const user = await get_user_from_email.run();
		
		if (user !== null & user.length > 0) {
			storeValue("current_user", user[0]);
			showAlert("Sign in success!", "success");
			navigateTo('applications');
		} else {
			clearStore();
			showAlert("Sign in failed, try again later or sign up.", "error");
		}
	}
}