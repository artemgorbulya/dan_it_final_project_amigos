const getModalOpen = state => state.modal.isModalOpen;
const getAlertOpen = state => state.modal.isAlertOpen;
const getBurgerMenuOpen = state => state.modal.isBurgerMenuOpen;

export default {
	getModalOpen,
	getAlertOpen,
	getBurgerMenuOpen
}