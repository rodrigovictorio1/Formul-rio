document.addEventListener('DOMContentLoaded', function () {
    const btnGerar = document.getElementById('btnGerar');
    const btnCopiar = document.getElementById('btnCopiar');
    const resultado = document.getElementById('resultado');
    const alertCopiado = document.getElementById('alertCopiado');

    // Definir data e hora atual
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR') + ' ' +
        agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('dataHorario').value = dataFormatada;

    const numeroDocumentoInput = document.getElementById('numeroDocumento');

    numeroDocumentoInput.addEventListener('input', function () {
        let value = numeroDocumentoInput.value.replace(/\D/g, '');

        if (value.length <= 11) {
            // CPF
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else {
            // CNPJ
            value = value.replace(/(\d{2})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1/$2');
            value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
        }

        numeroDocumentoInput.value = value;
    });

    // Predefinir valores
    if (document.getElementById('protocoloChat').value === '') {
        document.getElementById('protocoloChat').value = '--';
    }
    if (document.getElementById('telefone2').value === '') {
        document.getElementById('telefone2').value = '--';
    }
    if (document.getElementById('melhorHorario').value === '') {
        document.getElementById('melhorHorario').value = 'Mais breve possível';
    }

    btnGerar.addEventListener('click', function () {
        // Pegar valores dos campos
        const empresa = document.getElementById('empresa').value.trim();
        const numeroDocumento = document.getElementById('numeroDocumento').value.trim();
        const nomeAssinante = document.getElementById('nomeAssinante').value.trim();
        const tipoAtendimento = document.getElementById('tipoAtendimento').value;
        const nomeSolicitante = document.getElementById('nomeSolicitante').value.trim();
        const endereco = document.getElementById('endereco').value.trim();
        const problemaAlegado = document.getElementById('problemaAlegado').value.trim();
        const procedimentos = document.getElementById('procedimentos').value.trim();
        const dataHorario = document.getElementById('dataHorario').value;
        const melhorHorario = document.getElementById('melhorHorario').value;
        const telefone1 = document.getElementById('telefone1').value.trim();
        const telefone2 = document.getElementById('telefone2').value;
        const protocolo = document.getElementById('protocolo').value.trim();
        const protocoloChat = document.getElementById('protocoloChat').value;
        const nomeAtendente = document.getElementById('nomeAtendente').value.trim();

        // Validar campos obrigatórios
        const camposObrigatorios = [
            { id: 'empresa', nome: 'Empresa' },
            { id: 'numeroDocumento', nome: 'Número do Documento' },
            { id: 'nomeAssinante', nome: 'Nome de Assinante' },
            { id: 'nomeSolicitante', nome: 'Nome do Solicitante' },
            { id: 'problemaAlegado', nome: 'Problema Alegado' },
            { id: 'procedimentos', nome: 'Procedimentos realizados' },
            { id: 'telefone1', nome: 'Telefone 1' },
            { id: 'protocolo', nome: 'Protocolo' },
            { id: 'nomeAtendente', nome: 'Nome do Atendente' }
        ];

        for (const campo of camposObrigatorios) {
            if (!document.getElementById(campo.id).value.trim()) {
                alert(`Por favor, preencha o campo ${campo.nome}.`);
                document.getElementById(campo.id).focus();
                return;
            }
        }

        // Gerar o conteúdo formatado
        const conteudoGerado = `Empresa: ${empresa}
Nome de Assinante: ${nomeAssinante}
Tipo de Atendimento: ${tipoAtendimento}
Nome do Solicitante: ${nomeSolicitante}
Endereço: ${endereco}
Problema Alegado: ${problemaAlegado}
Procedimentos realizados: ${procedimentos}
Data/Horário: ${dataHorario}
Melhor Horário para retorno: ${melhorHorario}
Telefone 1: ${telefone1}
Telefone 2: ${telefone2}
Protocolo: ${protocolo}
Protocolo do chat: ${protocoloChat}
Nome do Atendente: ${nomeAtendente}`;

        // Exibir o resultado
        resultado.textContent = conteudoGerado;
        resultado.classList.add('visible');

        // Mostrar o botão de copiar
        btnCopiar.classList.add('visible');
    });

    btnCopiar.addEventListener('click', function () {
        // Usar a API Clipboard para copiar texto - método mais moderno
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(resultado.textContent).then(() => {
                // Mostrar alerta de sucesso
                alertCopiado.style.display = 'block';

                // Esconder o alerta após 2 segundos
                setTimeout(function () {
                    alertCopiado.style.display = 'none';
                }, 2000);
            });
        } else {
            // Fallback para o método antigo para navegadores que não suportam a API Clipboard
            const tempElement = document.createElement('textarea');
            tempElement.value = resultado.textContent;
            document.body.appendChild(tempElement);

            // Selecionar e copiar o texto
            tempElement.select();
            document.execCommand('copy');

            // Remover o elemento temporário
            document.body.removeChild(tempElement);

            // Mostrar alerta de sucesso
            alertCopiado.style.display = 'block';

            // Esconder o alerta após 2 segundos
            setTimeout(function () {
                alertCopiado.style.display = 'none';
            }, 2000);
        }
    });
});