# EXAMES IS  



  ___  


     ## AJUSTES NA ESTRUTURA DO FORMULÁRIO:
- **Mantenha** exatamente a mesma barra azul de cabeçalho do formulário
- **Altere** o título do formulário para: "SOLICITAÇÃO DE EXAMES DAS IS DE ACORDO COM A FINALIDADE"
- **Retire** a primeira seção 'ESPECIALIDADE' e os botões que fazem parte dela
- **Mantenha as seções exatamente como estão** (incluindo a lógica de preenchimento do campo 'NOME' através de digitação ou menu suspenso de acordo com o selecionado em OM DO MILITAR')
   - 'OM DO MILITAR'
   - 'NOME:'
   - 'GRAU HIERÁRQUICO:'
   -  'FINALIDADE DA INSP. DE SAÚDE:'
- **Retire** as seções:
    - 'INFORMAÇÕES COMPLEMENTARES:'
    - 'PERITO RESPONSÁVEL:'
- **Retire** o botão 'GERAR PDF' e todos os outros que surgem após dele de acordo com a lógica determinada.
- **Acrescente** mais um campo: 'Idade'
   - Deverá ser um campo numérico de digitação simples
   - Deverá ser posicionado no início do formulário, alinhado horizontalmente com o campo 'OM DO MILITAR' (vide segundo print anexado onde eu fiz uma marcação em vermelho no local onde esse campo deve ser posicionado)
----
## PLANILHAS DE DADOS PARA GERAR OS DOCUMENTOS EM PDF
### Serão usadas basicamente 2 planilhas distintas nesse app web. Uma para puxar os dados de identificação dos militares caso a 'OM' seja 'HNRe'. E outra para puxar os exames necessários de acordo com a 'Finalidade da Inspeção de Saúde' para gerar as solicitaçãos dos exames em um documento em PDF.
#### 1ª planilha - ID: '12_X8hKR4T_ok33Tv-M8rwpKSUeJNwIAjo9rWzfoA2Nw'
##### Caso no formulário a 'OM DO MILITAR' = 'HNRe':
- A lista de militares a povoar o campo 'NOME' está presenta na aba 'MilitaresHNRe', na coluna 'INSPECIONADO' (coluna C)
- Uma vez selecionado o campo 'NOME', os seguintes campos deverão ser preenchidos conforme:
   - 'GRAU HIERÁRQUICO:' - coluna 'P/G/Q' (coluna A) da planilha
   - 'NIP / MAT:' - coluna 'NIP' (coluna B) da planilha
#### Caso no formulário a 'OM DO MILITAR' = 'Outras OM':
- Os campos 'NOME:' e 'NIP / MAT:' deverá estar habilitado para digitação direta no campo, conforme lógica do app web anterior.
- **Porém, o campo 'GRAU HIERÁRQUICO:' deverá puxar os itens so seu menu suspenso na coluna 'P/G' (coluna C) da aba 'ListasRef'**
#### 2ª planilha - ID: '1l1UY1QPgIiy1KeLPL878Bgt8_JJ47btkPSREw91BnsE'
##### Já o campo do formulário 'FINALIDADE DA INSP. DE SAÚDE:' deverá puxar dos itens do seu menu suspenso da coluna 'FINALIDADE' (coluna A) da aba 'ExamesIS'
##### Nessa planilha:
- A primeira coluna lista todas as FINALIDADES possíveis para as Inspeções de saúde e as colunas seguintes representam os exames (representados pelos cabeçalhos de cada coluna) que são necessários de acordo com a 'FINALIDADE' da IS
- Da segunda coluna em diante, as células são do tipo caixa de seleção com a seguinte validação de dados:
   - Selecionada = X
   - Não selecionada = "   "
----
## ⚠️ MISSÃO-DESAFIO (Intuito do app web) ⚠️
### Pois bem, a função principal desse app web é justamente gerar documentos em PDF para solicitar os exames específicos de acordo com a 'FINALIDADE' da Inspeção de Saúde selecionada. Para isso, eu tenho alguns layouts no google docs que servirão para gerar os documentos em PDF (os arquivos do google docs devem ser usados apenas temporiariamente)
- Os arquivos em PDF gerados deverão ser salvos na pasta do google drive de ID '1vlOWU16IhJXt1mhr7D6v5NM-STYbc2nm'
   - Os arquivos devem ser organizados em subpastas criadas pelo script de acordo com o mês e ano de sua geração. Ex.: "DEZ2025"
   - Os arquivos devem ser nomeados de acordo com a seguinte lógica de concatenação: "ExamesIS"_'NIP'_'INSPECIONADO'_(alguma timestamp de horário para evitar arquivos com mesmo nome)
- De forma geral, os layouts dos google docs possuem placeholders que serão substituídas com as informações que foram inseridas no formulário, sobretudo os placeholders referentes à identificação pessoal do 'INSPECIONADO'
- Todos os layouts tem 5 placeholders referentes à identificação pessoal que deverão ser corretamente substituídas para gerar o documento em PDF:
   - {{INSPECIONADO}}
   - {{NIP}}
   - {{OM}}
   - {{IS}}
   - {{FINALIDADE}}
- Alguns layouts tem uma placeholders diferente: <<DATA_HOJE>> - que deverá ser substituída pela data no momento da criação do documento em PDF no formato "dd/mm/aaaa""

## ⚠️  LÓGICAS PARA ESCOLHA DOS LAYOUTS DE ACORDO COM OS EXAMES NECESSÁRIOS PARA CADA TIPO DE 'FINALIDADE' DE IS (Correlação entre os exames marcados na na caixa de seleção da 2ª planilha e os layouts do google docs representados pelas suas ID ⚠️  



  
| Exames Necessários | ID google docs layout | Observações / restrições |
| :---- | :---- | :---- |
| Oftalmologia especial (PIO, Tonometria, Fundoscopia, Biomicroscopia) | 127zXoe3Cx2\_qKFl3J-OaNlNDyqrJn11gkkAHCSRezGI |  |
| Ecocardiograma bidimensional com Doppler | 15eIIL\_qiP-EKN6c8p5qQbZZmX6sHOhbuFPPjmQ89iLU | **IDADE\>= 45 anos** |
| Teste ergométrico | 15eIIL\_qiP-EKN6c8p5qQbZZmX6sHOhbuFPPjmQ89iLU | **IDADE\>= 45 anos** |
| Radiografia panorâmica das arcadas dentárias | 1j8SIWErGB8Vt4dF\_ylX3OAvMj9qxVc4ZFlwnshyXIx4 |  |
| Radiografia de tórax | 1GNjAI3IfNOyKgKwSB6EPcXzrqG-6Wu6Ux5cFvM7huFI |  |
| Eletroencefalograma | 17PI4SRp5xp1q\_B8VopmWJkpt9jArqsH8uXkpdnMNM\_w |  |
| Nasofibroscopia | 17PI4SRp5xp1q\_B8VopmWJkpt9jArqsH8uXkpdnMNM\_w |  |
| Videolaringoestroboscopia | 17PI4SRp5xp1q\_B8VopmWJkpt9jArqsH8uXkpdnMNM\_w |  |
| Colpocitologia oncótica | 10ecyKpWrlNylWv6tPPI2ZERinrnpiDLPeXSvWsBb5Y4 | **APENAS PARA O SEXO FEMININO** |
| Laudo detalhado do exame físico ginecológico e de mamas emitido por especialista | 10ecyKpWrlNylWv6tPPI2ZERinrnpiDLPeXSvWsBb5Y4 | **APENAS PARA O SEXO FEMININO** |
| Mamografia | 1Feq2UcNoL5oVYSog6w846qNpRPP6zGRCO9fovLrxHTo | **APENAS PARA O SEXO FEMININO COM IDADE \>= 40 ANOS** |
| Ultrassonografia de mamas | 1Feq2UcNoL5oVYSog6w846qNpRPP6zGRCO9fovLrxHTo | **APENAS PARA O SEXO FEMININO** |
| Ultrassonografia transvaginal ou pélvica | 1Feq2UcNoL5oVYSog6w846qNpRPP6zGRCO9fovLrxHTo | **APENAS PARA O SEXO FEMININO** |
| Exame toxicológico | 1XmIUE0kE4pvVPoBDxZB\_Hfop-EzXq-jXOUSBgmE5m7o |  |
| Audiometria | 1Xp3n2dpDp\_pXU6zgH2bd\_vCgOKOz1AjKUPhIO2Enr8E |  |
| Exame odontológico geral | 1Xp3n2dpDp\_pXU6zgH2bd\_vCgOKOz1AjKUPhIO2Enr8E |  |
## **OBSERVE QUE EXISTEM ALGUMAS SITUAÇÕES QUE SÃO RESTRITAS PRO SEXO FEMININO, PORTANTO O SCRIPT TERÁ QUE ANALISAR NO NOME DO MILITAR - 'INSPECIONADO' E DEDUZIR QUAL O SEU SEXO.
# A LÓGICA MOSTRADA AINDA HÁ POUCO ESTÁ CORRELACIONADA BASICAMENTE AOS EXAMES DE IMAGENS E AVALIAÇÕES DE OUTROS ESPECIALISTAS, MAS NÃ CONTEMPLA OS EXAMES DE SANGUE, QUE FAZEM PARTE DA LISTA A SEGUIR:
| EXAMES DE SANGUE |
| :---- |
| Ácido úrico |
| Albumina |
| Anti-HIV |
| Atividade da protrombina |
| Beta-HCG qualitativo |
| Bilirrubinas Totais e frações |
| Creatinina |
| Ureia |
| PSA total |
| Triglicerídos |
| Colesterol total e frações |
| EAS |
| Fosfatase Alcalina |
| Gama-GT |
| Glicemia de jejum |
| Hemograma completo |
| Hepatograma |
| Parasitológico das fezes |
| Provas de atividade reumática |
| Transaminases |
| VDRL |  


  
## ⚠️ É JUSTAMENTE NO LAYOUT DESSES EXAMES DE IMAGEM, QUE EU ESTOU COM DIFICULDADE EM ESTABELECER OS PLACEHOLDERS NO GOOGLE DOCS (VIDE ÚLTIMO PRINT DE TELA) POR FAVOR SUGIRA UMA ALTERNATIVA.  ⚠️  


  
### Mas já tenho 2 layouts para os exames de sangue: um para o sexo feminino e outro para o sexo masculino:   


  
| EXAMES DE SANGUE | ID google docs layout |
| :---- | :---- |
| SEXO FEMININO | 1m5IgoEUQI2UdGUb50dVrKL76luRVBSkSXRvkf5GkNZk |
| SEXO MASCULINO | 1m4ubpnD0Drl4DINzohECxsXXDG5wYqB-RCnllKiM8p8 |
## Ainda existem algumas restrições para cada exame de sangue específico, mas vamos por partes que eu já te dei uma enxurrada de informações



  

