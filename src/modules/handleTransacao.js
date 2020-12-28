export default function initHandleTransacao() {
    const transacaoListaUl = document.querySelector('.transacaoLista')
    const saldoAtualTexto = document.getElementById('valorSaldoAtual')
    const receitasTexto = document.getElementById('valorReceita')
    const despesasTexto = document.getElementById('valorDespesa')
    const btnAddTransacao = document.getElementById('btnAddTransacaoModal')
    const nomeTransacaoInput = document.getElementById('nomeTransacaoInput')
    const valorTransacaoInput = document.getElementById('valorTransacaoInput')
    const containerModal = document.querySelector('.containerModal')

    const transacoesLocalStorage = JSON.parse(localStorage.getItem('transacoes'))
    let todasTransacoes = localStorage
        .getItem('transacoes') !== null ? transacoesLocalStorage : []

    const deletarTransacao = id => {
        todasTransacoes = todasTransacoes.filter(transacao =>
            transacao.id !== id)
        atualizaLocalStorage()
        initTransacao()
    }

    window.deletarTransacao = deletarTransacao // deixar deletarTransacao em escopo Global para permitir event onClick no button.

    const addTransacaoNaDom = transacao => {
        const li = document.createElement('li')
        const classeCss = transacao.valor > 0 ? 'valPositivo' : 'valNegativo'
        li.classList.add('transacaoContainer')

        li.innerHTML = `
            <button class="btnDelete" onClick="deletarTransacao(${transacao.id})">X</button>
            <span class="nomeTransacao">${transacao.nome}</span>
            <span class="valorTransacao ${classeCss}">R$ ${transacao.valor}</span>
        `
        transacaoListaUl.prepend(li)
    }

    const setValores = (totalSaldoAtual, totalReceitas, totalDespesas) => {
        const valorDespesaSemSinal = Math.abs(totalDespesas).toFixed(2)

        receitasTexto.innerText = `R$ ${totalReceitas.toFixed(2)}`;
        despesasTexto.innerText = `R$ ${valorDespesaSemSinal}`;
        saldoAtualTexto.innerText = `R$ ${totalSaldoAtual.toFixed(2)}`;
    }

    const atualizaValorSaldo = () => {
        const valoresTransacoes = todasTransacoes.map(transacao => transacao.valor)
        // const total = valoresTransacoes.reduce((acc, transacao) => acc + transacao, 0)
        //     .toFixed(2)
        // const receitas = valoresTransacoes.filter(valor => valor > 0)
        //     .reduce((acc, valor) => acc + valor, 0)
        //     .toFixed(2)
        // const despesas = valoresTransacoes
        //     .filter(valor => valor < 0)
        //     .reduce((acc, valor) => acc + valor, 0)
        //     .toFixed(2)

        let totalReceitas = 0
        let totalDespesas = 0
        let totalSaldoAtual = 0

        valoresTransacoes.forEach(valor => {
            valor > 0 ? totalReceitas += valor : totalDespesas += valor
        })
        totalSaldoAtual = totalReceitas + totalDespesas

        setValores(totalSaldoAtual, totalReceitas, totalDespesas)
    }

    const initTransacao = () => {
        transacaoListaUl.innerHTML = ''

        todasTransacoes.forEach(addTransacaoNaDom)
        atualizaValorSaldo()
    }

    initTransacao()

    const atualizaLocalStorage = () => {
        localStorage.setItem('transacoes', JSON.stringify(todasTransacoes))
    }

    const gerarID = () => Math.round(Math.random() * 1500)

    const validaInputs = () => {
        if ((nomeTransacaoInput.value !== '') && (valorTransacaoInput.value !== '') && (valorTransacaoInput.value != 0))
            return true
        else
            return false
    }

    const limpaInputs = () => {
        containerModal.classList.remove('ativo')
        nomeTransacaoInput.value = ''
        valorTransacaoInput.value = ''
    }

    const addTransacaoNoObjeto = () => {
        if (!validaInputs()) {
            alert("Necessário preencher todos os campos e/ou Adicionar algum valor à Transação");
            return
        }

        const nomeTransacao = nomeTransacaoInput.value
        const valorTransacao = +valorTransacaoInput.value

        const transacao = {
            id: gerarID(),
            nome: nomeTransacao,
            valor: valorTransacao
        }

        todasTransacoes.push(transacao)
        initTransacao()
        atualizaLocalStorage()
        limpaInputs()
    }

    btnAddTransacao.addEventListener('click', addTransacaoNoObjeto)
}