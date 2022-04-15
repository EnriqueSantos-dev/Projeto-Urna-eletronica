let spanTextVoto = document.querySelector('.text-voto span'),
    cargo = document.querySelector('.cargo span'),
    descricao = document.querySelector('.info-canditado'),
    intrucoes = document.querySelector('.divisao-2'),
    divisaoRight = document.querySelector('.divisao-1-right'),
    numeros = document.querySelector('.numero'),
    digitobox = document.querySelector('.digito');

// variaveis de controle
let etapaAtual = 0;
var numeroCandidato = '';
let votoBranco = false;
let votos = [];

function mostrarEtapa() {
    let boxDigitoAdd = '';
    let etapa = etapas[etapaAtual];
    numeroCandidato = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            boxDigitoAdd += '<div class="digito pisca"></div>';
        } else {
            boxDigitoAdd += '<div class="digito"></div>';
        }
    }
    spanTextVoto.style.display = 'none';
    descricao.style.display = 'none';
    intrucoes.style.display = 'none';
    divisaoRight.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    numeros.innerHTML = boxDigitoAdd;
}

function clicou(n) {
    let numero = document.querySelector('.digito.pisca');
    if (numero !== null) {
        numero.innerHTML += n;
        numeroCandidato += n;
        numero.classList.remove('pisca');
        if (numero.nextElementSibling !== null) {
            numero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.cadindatos.filter(item => {
        if (item.numero === numeroCandidato) {
            return true;
        } else {
            return false;
        }
    });
    if (candidato.length > 0) {
        candidato = candidato[0];
        spanTextVoto.style.display = 'block';
        descricao.style.display = 'block';
        intrucoes.style.display = 'block';
        divisaoRight.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`;
        let num = document.createElement('span');
        num.innerHTML = '<span>Numero</span>';
        numeros.style.paddingLeft = '1px';
        numeros.prepend(num);
        let fotos = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotos += `<div class="images-cand small"><img src="${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            } else {
                fotos += `<div class="images-cand"><img src="${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
        }
        divisaoRight.innerHTML = fotos;
    } else {
        descricao.style.display = 'block';
        intrucoes.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande">Voto nulo</div>';
    }
}
function confirmar() {
    let etapa = etapas[etapaAtual];
    let votoComfirmado = false;
    numeros.style.display = 'flex';

    if (votoBranco === true) {
        votoComfirmado = true;
        votos.push({
            titulo: etapas[etapaAtual].titulo,
            voto: 'Branco',
        });
    } else if (numeroCandidato.length === etapa.numeros) {
        votoComfirmado = true;
        votos.push({
            titulo: etapas[etapaAtual].titulo,
            voto: numeroCandidato,
        });
    }

    if (votoComfirmado === true) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            mostrarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--fim pisca">Fim</div>';
        }
    }
}
function branco() {
    votoBranco = true;
    intrucoes.style.display = 'block';
    spanTextVoto.style.display = 'block';
    numeros.style.display = 'none';
    descricao.style.display = 'block';
    descricao.innerHTML = '<div class="aviso--grande">Voto em Branco</div>';
}
function corrige() {
    numeros.style.display = 'flex';
    mostrarEtapa();
}

mostrarEtapa();
