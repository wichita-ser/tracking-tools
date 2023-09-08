export default {
	async getServerById () {
		const server = await get_server_by_id.run();
		return server.length > 0 ? server[0] : {};
	},
	async openEditServerModal () {
		const server = await this.getServerById();
		showModal('ModalEditServer');
		return server;
	},
	async updateServer () {
		try {
			await update_server_by_id.run();
			await get_servers.run();
			
			closeModal('ModalEditServer');
			showAlert("Edit server success!", "success");
		} catch (error) {
			showAlert("Edit server failed, please try again or contact administrator.");
			console.log("error, ", error);
		}
	},
	async createServer () {
		try {
			await create_server.run();
			await get_servers.run();
			
			closeModal('ModalNewServer');
			showAlert("Create server success!", "success");
		} catch (error) {
			showAlert("Create server failed, please try again or contact administrator.");
			console.log("error, ", error);
		}
	}
}