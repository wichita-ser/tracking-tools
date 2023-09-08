export default {
	async getApplicationById () {
		const app = await get_application_by_id.run();		
		return app.length > 0 ? app[0] : {};
	},
	async openEditAppModal () {
		const app = await this.getApplicationById();
		showModal('ModalEditApp');
		return app;
	},
	async updateApp () {
		try {
			await update_application_by_id.run();
			await get_applications.run();
			
			closeModal('ModalEditApp');
			showAlert("Edit application success!", "success");
		} catch (error) {
			showAlert("Edit applicaiton failed, please try again or contact administrator.");
			console.log("error, ", error);
		}
	},
	async createApp () {
		try {
			await create_applications.run();
			await get_applications.run();
			
			closeModal('ModalNewApp');
			showAlert("Create application success!", "success");
		} catch (error) {
			showAlert("Create applicaiton failed, please try again or contact administrator.");
			console.log("error, ", error);
		}
	}
}