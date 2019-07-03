// https://github.com/eslint/eslint/issues/667


console.log('Executando XYZ.js...');

/**
 * Verifica se data passada como parâmetro é anterior à data atual
 * @param day Data a ser verificada
 * @returns Verdadeiro se data anterior à data atual
 */
function seDataAnteriorAtual(day) {
    var hoje = new Date();
    hoje.setHours(0,0,0,0); // trunca a data

    if (hoje.getTime() - day.date.getTime() <= 0) {
        return true;
    }

    return false;
}

/**
 * Fun��o para processar o foco dos componentes baseado em seletores jQuery.
 *
 * Cada seletor ter� seus elementos avaliados e, caso algum elemento n�o esteja
 * desabilitado, ele ser� focado. Para utilizar as regras de foco, basta definir
 * uma fun��o de nome "regrasFoco" que retorna o array com os seletores e ela
 * ser� automaticamente utilizada para o processamento do foco.
 *
 * @param array
 *            seletores por ordem de preced�ncia
 */
function processarFoco(array , event) {
	// itera sobre os seletores passados por par�metro
	for (var i = 0; i < array.length; i++) {
		elementos = jQuery(array[i]);
		// itera sobre o resultado do seletor
		for (var j = 0; j < elementos.length; j++) {
			el = jQuery(elementos[j]);
			if (!el.attr('disabled')) {
				el.focus();
				event = event || window.event;
				event.preventDefault();
				return;
			}
		}
	}
}

/**
 * Fun��o que deve ser sobrescrita para retornar os seletores para o
 * processamento do foco
 */
function regrasFoco() {
	return [];
}

// testa se o jQuery foi importado
if(jQuery) {
	// adiciona a fun��o de processamento de foco
	jQuery(document).ready(function() {
	  reprocessarFoco();
	});
}

function reprocessarFoco() {
	processarFoco(regrasFoco());
}

function fechaDiv() {
	try {
		if (parent.window.frameElement.id === "iframeOperacao") {
            var containers = parent.document.querySelectorAll("[id^='formOperacao:tabelaOperacao:'][id$=':idModalEdicaoDescricaoAtividade_container']");
            containers.forEach(function (container) {
                var nomeComponenteJSF = container.getAttribute('id').replace(/_container$/, '');
                console.log(nomeComponenteJSF);
                parent.RichFaces.$(nomeComponenteJSF).hide();
            })
        }
    } catch (e) { /* caso aconteca um erro, eh porque o richfaces nao existe na janela atual, entao ignora! */ }
	var linkFechar = parent.document.getElementById('mesa:lnkFechar');
	if(linkFechar === undefined || linkFechar === null || linkFechar === 'undefined' || linkFechar === 'null'){
		linkFechar = parent.document.getElementById('tvp:lnkFechar');
	}
	if(linkFechar === undefined || linkFechar === null || linkFechar === 'undefined' || linkFechar === 'null'){
		linkFechar = parent.document.getElementById('sagas:lnkFechar');
	}
	if(linkFechar !== undefined && linkFechar !== null && linkFechar !== 'undefined' && linkFechar !== 'null'){
		if (window.event){
    		linkFechar.click();
    	}else{
    		linkFechar.onclick();
    	}
	}
}

function verificaSeExecutouComSucesso(form) {
	var seInseriuMensagem = inserirMensagemSucessoNoFiltro(form);
	if (seInseriuMensagem === 'S') {
		fechaDiv();
	}
}

function verificaSeExecutouComSucessoComRedirecionamento(form) {
	var seInseriuMensagem = inserirMensagemSucessoNoFiltro(form);
	if (seInseriuMensagem === 'S') {
		fechaDiv();
	}
}

function inserirMensagemSucessoNoFiltro(form) {
	var msg = document.getElementById(form + ':mensagemSucesso').value;
	if (msg !== '') {
		var txtMsgSucesso = parent.document.getElementById('txtMsgSucessoOperacao');
		if (txtMsgSucesso) {
			txtMsgSucesso.firstChild.nodeValue = msg;
			var divMsgSucesso = parent.document.getElementById('divMsgSucessoOperacao');
			if (divMsgSucesso !== null || divMsgSucesso !== undefined ) divMsgSucesso.style.display = 'block';
			return 'S';
		}
	}
	return 'N';
}

function verificaSeDeveFecharJanelaOperacao(form) {
	var seDeveFechar = document.getElementById(form + ':deveFecharJanelaOperacao').value;
	if (seDeveFechar !== '') {
		if(seDeveFechar === 'S') {
			inserirMensagemSucessoNoFiltro(form);
			fechaDiv();
		}
	}
}

function verificaSeExecutouComSucessoOptForm(form , isPrependId) {

	var msg  = '';
	if(isPrependId){
		msg = document.getElementById(form + ':mensagemSucesso').value;
	}else{
		msg = document.getElementById('mensagemSucesso').value;
	}


	if (msg !== '') {
		var txtMsgSucesso = parent.document
				.getElementById('txtMsgSucessoOperacao');
		if(txtMsgSucesso){
			txtMsgSucesso.firstChild.nodeValue = msg;
			var divMsgSucesso = parent.document
				.getElementById('divMsgSucessoOperacao');
			if(divMsgSucesso !== null || divMsgSucesso !== undefined )divMsgSucesso.style.display = 'block';
			fechaDiv();
		}
	}


}

function atualizaImagemComplementoHistorico(form, complemento) {
	atualizaImagemComplementoHistoricoPath(form, complemento, '/sagasWeb/web/imagens/');
}

function atualizaImagemComplementoHistoricoPath(form, complemento, path) {
	var imgComplemento = document
			.getElementById(form + ':giHistoricoComplementar');
	if (complemento === '') {
		imgComplemento.src = path + 'imgBotaoCriarObservacao.png';
		imgComplemento.title = 'Complementar hist�rico';
	} else {
		imgComplemento.src = path + 'imgBotaoObservacao.png';
		imgComplemento.title = 'Complemento: ' + complemento;
	}
}

function mostraOculta(elementId) {
	var tab = document.getElementById(elementId);
	if(tab === null){
		return;
	}
	if (tab.style.display === "none") {
		tab.style.display = "";
	} else {
		tab.style.display = "none";
	}
}

function atualizaImgEsperaSagas(){
	url = document.URL;
	pastas = url.split('/');
	numPastas = 0;
	aux = pastas.length-2;
	verifica = true;
	while(verifica){
		if(pastas[aux]==='web'){
			verifica=false;
		}
		else{
			numPastas++;
			aux--;
		}
	}
	endereco = '';
	for(var cont=0; cont<numPastas;cont++){
		endereco += '../';
	}
	endereco += 'imagens/imgIconeEspera.gif';
	document.getElementById('imgIndicador').src = endereco;
}

//Retorna a o array de parametros de uma URL
function getUrlParametros() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function limparDesabilitarCampos() {
	var selects = $('select');
	for(i=0;i<selects.length;i++) {
		while(selects[i].options.length>0) {
			selects[i].options[0] = null;
		}
		selects[i].disabled=true;
	}
	var listaCheckbox = $('input[type=checkbox]');
	for(i=0;i<listaCheckbox.length;i++) {
		listaCheckbox[i].checked=false;
		listaCheckbox[i].disabled=true;
	}
	var listaRadio = $('input[type=radio]');
	for(i=0;i<listaRadio.length;i++) {
		listaRadio[i].checked=false;
		listaRadio[i].disabled=true;
	}
}

function formatarMascaraNumeroProcesso(campo,mask,evt){

    var vCampo=campo.value,tCampo=vCampo.length,tMask=mask.length,vFinal="",tecla=evt.keyCode,cont=0,i;

    if((evt.ctrlKey&&tecla===67)||(evt.ctrlKey&&tecla===86)||(evt.shiftKey&&tecla===45)){
        setTimeout("completaMascara(document.getElementById(\'"+campo.id+"\'),\'"+mask+"\')",100);
    }

    if(campo.selectionStart){
        if(campo.selectionStart!==campo.selectionEnd){return;}
    }
    else if(document.selection){
        if(document.selection.createRange().text!==""){return;}
    }
    else if(document.getSelection){
        if(document.getSelection()!==""){return;}
    }

    if(tecla===8||tecla===37||tecla===38||tecla===39||tecla===40||tecla===46||tecla===36||tecla===35||tecla===33||tecla===34||tecla===45||tecla===16||tecla===17||tecla===9||tecla===13){return;}

    for(i=0;i<tCampo;i++){
        vCampo=vCampo.replace("-","");
        vCampo=vCampo.replace(".","");
        vCampo=vCampo.replace("/","");
        vCampo=vCampo.replace(":","");
        vCampo=vCampo.replace(" ","");
        vCampo=vCampo.replace(",","");
    }

    for(i=0;i<tMask;i++){
        if(mask.charAt(i)==="9"){
            cont++;
        }
    }

    tCampo=vCampo.length;

    if(tCampo>cont){
        return false;
    }
    pMask=tMask-1;
    for(i=1;i<tCampo;i++){
        pMask--;
        while(mask.charAt(pMask)!=="9"){
            pMask--;
        }
    }
    cont=0;
    for(i=pMask;i<tMask;i++){
        if(mask.charAt(i)==="9"){
            vFinal=vFinal+vCampo.charAt(cont);
            cont++;
        }
        else{
            vFinal=vFinal+mask.charAt(i);
        }
    }
    campo.value="";campo.value=vFinal;
    return true;
}

var AlturaUtil = (function() {
	console.log('Inicializando AlturaUtil...');

	var $ = jQuery;
    var windowDoIframe = window;
    var windowDaMesa = parent;

    // Quando redimensionamos uma modal no JSF pela PRIMEIRA VEZ, ela perde as dimensoes (fica toda encolhida)
    // Esse codigo simplesmente redimensiona a modal, só pra provocar o bug, de forma que os proximos
    // redimensionamentos tenham seu efeito normalmente
    function contornarBugDoJSFParaHeight(componenteModalOperacao) {
        componenteModalOperacao.doResizeOrMove({deltaHeight: -1});
        componenteModalOperacao.doResizeOrMove({deltaHeight: 1});
    }
    function contornarBugDoJSFParaWidth(componenteModalOperacao) {
        componenteModalOperacao.doResizeOrMove({deltaWidth: -1});
        componenteModalOperacao.doResizeOrMove({deltaWidth: 1});
    }
    function getComponenteModalOperacao() {
        return windowDaMesa.Richfaces.findModalPanel('modalPanelID').component;
    }
    function $iframeOperacao() {
        return $(windowDaMesa.document.getElementById('iframeOperacao'));
    }

    // essa folga (numero magico) eh importante para acomodar a barra e outros detalhes que soh ficam aparentes quando testamos
    var FOLGA = {
        ALTURA: 15,
        LARGURA: 10
    };
    function ajustarAltura(novaAltura) {
    	var alturaDesejadaMaisFolga = novaAltura - FOLGA.ALTURA;
		$iframeOperacao().height(alturaDesejadaMaisFolga - 60);

		var componenteModalOperacao = getComponenteModalOperacao();
        contornarBugDoJSFParaHeight(componenteModalOperacao);
        var alturaAtual = componenteModalOperacao.height();
        componenteModalOperacao.doResizeOrMove({deltaHeight: alturaDesejadaMaisFolga - alturaAtual});
	}
	function ajustarLargura(novaLargura) {
		var larguraDesejadaMaisFolga = novaLargura - FOLGA.LARGURA;
		$iframeOperacao().width(larguraDesejadaMaisFolga - 25);

		var componenteModalOperacao = getComponenteModalOperacao();
        contornarBugDoJSFParaWidth(componenteModalOperacao);
        var larguraAtual = componenteModalOperacao.width();
		componenteModalOperacao.doResizeOrMove({deltaWidth: larguraDesejadaMaisFolga - larguraAtual});
	}
	function garantirDimensoesMinimas(larguraPedida, alturaPedida) {
        var componenteModalOperacao = getComponenteModalOperacao();
        var alturaAtual = componenteModalOperacao.height();
        var larguraAtual = componenteModalOperacao.width();

        if (alturaAtual < alturaPedida - FOLGA.ALTURA) {
            ajustarAltura(alturaPedida);
        }
        if (larguraAtual < larguraPedida - FOLGA.LARGURA) {
            ajustarLargura(larguraPedida);
        }
    }

	return {
		ajustarAltura: ajustarAltura,
		ajustarLargura: ajustarLargura,
		ajustarDimensoes: function (largura, altura) {
			ajustarAltura(altura);
			ajustarLargura(largura);
		},
		garantirDimensoesMinimas: garantirDimensoesMinimas,
		getDimensoesViewPort: function (window) {
			return {
				altura: Math.max(window.document.documentElement.clientHeight, window.innerHeight || 0),
				largura: Math.max(window.document.documentElement.clientWidth, window.innerWidth || 0)
			};
		},
		ajustarTamanho: function () {
		    var windowDaMesa = top.window;

		    if (parent.Richfaces === undefined){
		    	//Adicionado para evitar quebra na tela do Gerenciar impedimentos
		    	return;
		    }

		    var alturaModal = parent.Richfaces.findModalPanel('modalPanelID').component.height();
		    var larguraModal = parent.Richfaces.findModalPanel('modalPanelID').component.width();
		    var areaUtilDeVisaoDoBrowser = AlturaUtil.getDimensoesViewPort(windowDaMesa);

		    var alturaVisivelEhMenorDoQueTamanhoDoIframeOperacao = areaUtilDeVisaoDoBrowser.altura < alturaModal;
		    if (alturaVisivelEhMenorDoQueTamanhoDoIframeOperacao) {
		    	AlturaUtil.ajustarAltura(areaUtilDeVisaoDoBrowser.altura);
		    }

		    var larguraVisivelEhMenorDoQueTamanhoDoIframeOperacao = areaUtilDeVisaoDoBrowser.largura < larguraModal;
		    if (larguraVisivelEhMenorDoQueTamanhoDoIframeOperacao) {
		    	AlturaUtil.ajustarLargura(areaUtilDeVisaoDoBrowser.largura);
		    }
		}
	};

})();

jQuery(AlturaUtil.ajustarTamanho);

var TelaEsperaSagas = (function () {
    "use strict";

    function exibir() {
        exibirComOcultacaoDeObjetos(true);
    }

    function exibirSemEsconderObjetos(){
        exibirComOcultacaoDeObjetos(false);
    }

    function ocultar() {
        var frame = document.getElementById('telaEspera');
        frame.style.display = "none";
        document.getElementById('imgIndicador').style.display = "none";

        jQuery(frame).data('ocultados').forEach(function (ocultado) {
            ocultado.style.visibility = "";
        });
    }

    function exibirComOcultacaoDeObjetos(deveOcultarInputs) {
        var frame = document.getElementById('telaEspera');
        frame.style.display = "";
        frame.style.zIndex = "999";
        document.getElementById('imgIndicador').style.display = '';

        ocultarInputs(frame, deveOcultarInputs);

        setTimeout(function () {
            atualizaImgEsperaSagas();
        }, 100);
    }

    function ocultarInputs(frame, deveOcultarInputs) {
        var ocultados = [];

        if (deveOcultarInputs) {
            //esconde as combos no IE (???)
            if (new Navegador().isIE) {
                jQuery("select").each(function () {
                    ocultados.push(this);
                });
            }

            // esconde os inputs do documento
            jQuery("input").each(function () {
                if (this.getAttribute("type") === "submit" || this.getAttribute("type") === "image") {
                    ocultados.push(this);
                }
            });

            ocultados.forEach(function (ocultado) {
                ocultado.style.visibility = "hidden";
            });
        }

        jQuery(frame).data('ocultados', ocultados);
    }


    return {
        exibir: exibir,
        exibirSemEsconderObjetos: exibirSemEsconderObjetos,
        ocultar: ocultar
    };

})();


function exibeTelaEsperaSagas() {
    TelaEsperaSagas.exibir();
}


function abrirPastaMinhasDistribuicoes() {
    if(window.top.document.getElementById("mesa:arvoreInstrucaoMinhasDistribuicoes:0:2::idLnkNomearvoreInstrucaoMinhasDistribuicoes") == undefined) {
        window.top.document.getElementById("mesa:arvoreInstrucaoMinhasDistribuicoes:0::treeNodearvoreInstrucaoMinhasDistribuicoes:handle").click();
    }
}

function clickaLinkEmRevisao () {
    window.top.document.getElementById("mesa:arvoreInstrucaoMinhasDistribuicoes:0:2::idLnkNomearvoreInstrucaoMinhasDistribuicoes").click();
}

function fecharJanela() {
    clickaLinkEmRevisao();
    window.top.document.getElementById("mesa:imagembotafecharmodalPanelID").click();
}
