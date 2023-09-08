export default {
	async getUserIdFromEmail () {
		const user = await get_user_by_id.run({email: appsmith.store.current_user.email});
		
		if (user.length > 0) {
			return user[0].id;
		} else {
			showAlert("Current signed in user is invalid, please sign in again or contact administrator.");
		}
	},
	async createIssue () {
		try {
			const userId = await this.getUserIdFromEmail();
			await create_issue.run({createdByUserId: userId});
			
			await get_issues.run();
			
			closeModal('ModalNewIssue');
			showAlert("Create issue success!", "success");
		} catch (error) {
			showAlert("Create issue failed, please try again or contact administrator.");
			console.log("error, ", error);
		}
	},
	async getIssueById (id) {
		try {
			const issue = await get_issue_by_id.run({"id": id});			
			
			return issue[0];
		} catch (error) {
			showAlert("Get issue failed, please try again or contact administrator.");
			console.log("error, ", error);
		}
	},
	async getIssueCommentsByIssueId (issueId) {
		try {
			return await get_comment_by_issue_id.run({issue_id: issueId});
		} catch (error) {
			showAlert("Get issue's comment failed, please try again or contact administrator.");
			console.log("error, ", error);
		}
	},
	async openViewIssueModal () {
		await this.getIssueById(TableIssue.triggeredRow.id);
		await this.getIssueCommentsByIssueId(TableIssue.triggeredRow.id);
		
		showModal('ModalViewIssue');
		return;
	},
	async openEditIssueModal () {
		const issue = await this.getIssueById(TableIssue.triggeredRow.id);
		
		showModal('ModalEditIssue');
		return issue;
	},
	async updateIssue (id) {
		try {
			const userId = await this.getUserIdFromEmail();
			await update_issue_by_id.run({id: id, userId: 1});
			await get_issues.run();
			
			closeModal('ModalEditIssue');
			showAlert("Edit issue success!", "success");
			
			await this.openViewIssueModal();
		} catch (error) {
			showAlert("Edit issue failed, please try again or contact administrator.");
			console.log("error, ", error);
		}
	},
	async createIssueComment (id) {
		try {
			const userId = await this.getUserIdFromEmail();
			await create_comment.run({issue_id: 4, user_id: userId});
			
			await resetWidget("RichTextIssueComment");
			await this.getIssueCommentsByIssueId(id);
			
			showAlert("Create comment success!", "success");
		} catch (error) {
			showAlert("Create comment failed, please try again or contact administrator.");
			console.log("error, ", error);
		}
	},
	async getIssueStatusDistinct () {
		try {
			var total = 0;
			
			const data = await get_distinct_issue_status.data;
			const result = data.reduce((acc, item) => {
				total = total + item.count;
				acc[item.status] = item.count;
				return acc;
			}, {});
			return {
				...result,
				totalIssue: total
			};
		} catch (error) {
			console.log("error, ", error);
		}
	}
}