export default function initModal() {
    const btnAddTransacao = document.getElementById('btnAddTransacao');
    const btnFecharModal = document.getElementById('btnFecharModal');
    const addTransacaoModal = document.querySelector('.containerModal');

    if (btnAddTransacao && btnFecharModal && addTransacaoModal) {
        function toggleModal(event) {
            event.preventDefault();
            addTransacaoModal.classList.toggle('ativo');
        }
        btnAddTransacao.addEventListener('click', toggleModal);
        btnFecharModal.addEventListener('click', toggleModal)
    }
}