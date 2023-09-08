export default {
	async getVersionById () {
		const version = await get_version_by_id.run();
		return version.length > 0 ? version[0] : {};
	},
	async openEditVersionModal () {
		const version = await this.getVersionById();
		showModal('ModalEditVersion');
		return version;
	},
	async updateVersion () {
		try {
			await update_version_by_id.run();
			await get_versions.run();
			
			closeModal('ModalEditVersion');
			showAlert("Edit version success!", "success");
		} catch (error) {
			showAlert("Edit version failed, please try again or contact administrator.");
			console.log("error, ", error);
		}
	},
	async createVersion () {
		try {
			await create_version.run();
			await get_versions.run();
			
			closeModal('ModalNewVersion');
			showAlert("Create version success!", "success");
		} catch (error) {
			showAlert("Create version failed, please try again or contact administrator.");
			console.log("error, ", error);
		}
	},
	async checkLatestVersion (id) {
		return true;
	}
}