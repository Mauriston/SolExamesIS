// ================================================================= //
//                      CONFIGURAÇÕES GLOBAIS                        //
// ================================================================= //

// IDs dos arquivos e pasta
// IDs dos arquivos e pasta
const TEMPLATE_IDS = {
  'Psiquiatria': '1dBBPpAUigm9DFUWqyP0NkTEVGxeHWwKZF8dnoJ7xqP8', // ID do template original
  'Psicologia': '1eQiRCtmF-V1Etn7fp6AbhTGZbYkqJlLrQYGjLRfePqQ',
  'Hepatologia': '12-s0h077A6hwipVe4oARcor4cNMKeAGOl6elV-pk_HQ',
  'Cardiologia': '1woGqRVEpe7hQkqZiPrPn2bUgIgcN7MtImn0plq8fbLE',
  'Ortopedia': '1qmi93Y_kZpNZEeYcqhSA41KVsZ4gFE1MqkK6kbAsheI'
};
const SHEET_ID = "1yqZYEh2apMezknd0_0sBBEbliV3jwoDEw43FipXwsUQ";
const PDF_FOLDER_ID = "176YQTOOWXuE78Xul49XYpJsVNyu-eZFi";

// Mapeamento de Peritos para E-mails para a função de envio
const PERITO_EMAILS = {
  'CT Mauriston': 'mauriston.martins@marinha.mil.br',
  'CT Júlio César': 'julio.xaiver@marinha.mil.br',
  'CT Salyne': 'salyne.martins@marinha.mil.br',
  'CT Luz': 'lucas.luz@marinha.mil.br',
  '2T Trindade': 'marcelo.trindade@marinha.mil.br'
};

// ================================================================= //
//                FUNÇÕES ACESSÍVEIS PELO CLIENTE                    //
// ================================================================= //

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function getHnreMilitaryData() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("MILITAR");
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 4).getValues();
    const militaryList = data
      .filter(row => row[2] === "HNRE" && row[1])
      .map(row => ({ nip: row[0], name: row[1], posto: row[3] }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return militaryList;
  } catch (e) {
    Logger.log('Erro em getHnreMilitaryData: ' + e.toString());
    return { error: e.toString() };
  }
}

// Código.gs

function processForm(formData) {
  try {
    const pdfFolder = DriveApp.getFolderById(PDF_FOLDER_ID);
    // Seleciona o ID do template com base na especialidade escolhida no formulário
const templateId = TEMPLATE_IDS[formData.ESPECIALIDADE];
const templateDoc = DriveApp.getFileById(templateId);
    const newDocName = `Parecer - ${formData.NOME} - ${new Date().toLocaleDateString('pt-BR')}`;
    const newDocFile = templateDoc.makeCopy(newDocName, pdfFolder);
    const doc = DocumentApp.openById(newDocFile.getId());
    const body = doc.getBody();

    // Mapeamento de dados do perito
    let peritoFullName = '';
    let posto = '';
    let membroValue = '';
    
    // ATUALIZAÇÃO DOS VALORES DE 'posto'
    switch (formData.PERITO_SELECAO) {
      case 'CT Mauriston': 
        peritoFullName = 'Mauriston Renan Martins Silva'; 
        posto = 'Capitão-Tenente (Md)'; 
        membroValue = 'Presidente';
        break;
      case 'CT Júlio César': 
        peritoFullName = 'Júlio César Xavier Filho'; 
        posto = 'Capitão-Tenente (RM2-Md)'; // ATUALIZADO
        membroValue = 'Médico Perito Isolado';
        break;
      case '1T Salyne': 
        peritoFullName = 'Salyne Regina Martins Roberto'; 
        posto = 'Primeiro-Tenente (Md)'; // ATUALIZADO
        membroValue = 'Membro da Junta Regular de Saúde';
        break;
      case '1T Luz': 
        peritoFullName = 'Lucas Luz Nunes'; 
        posto = 'Primeiro-Tenente (Md)'; // ATUALIZADO
        membroValue = 'Membro da Junta Regular de Saúde';
        break;
      case '2T Trindade': 
        peritoFullName = 'Marcelo Fulco Trindade'; 
        posto = 'Segundo-Tenente (RM2-Md)'; // ATUALIZADO
        membroValue = 'Médico Perito Isolado';
        break;
    }
    
    // --- Início do novo código para data por extenso ---
    const hoje = new Date();
    const dia = hoje.getDate();
    const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    const nomeMes = meses[hoje.getMonth()];
    const ano = hoje.getFullYear();
    const dataAtual = `${dia} de ${nomeMes} de ${ano}`;
    // --- Fim do novo código ---

    const peritoUpper = peritoFullName.toUpperCase();

    // Substitui os placeholders no documento
    body.replaceText(`{{NOME}}`, formData.NOME || '');
    body.replaceText(`{{GRAU_HIERARQUICO}}`, formData.GRAU_HIERARQUICO || '');
    body.replaceText(`{{NIP_MAT}}`, formData.NIP_MAT || '');
    body.replaceText(`{{FINALIDADE_INSP}}`, formData.FINALIDADE_INSP || '');
    body.replaceText(`{{INFO_COMPLEMENTARES}}`, formData.INFO_COMPLEMENTARES || '');
    body.replaceText(`{{PERITO}}`, peritoUpper);
    body.replaceText(`{{POSTO}}`, posto);
    body.replaceText(`{{DATA}}`, dataAtual); // Esta linha agora usa a nova variável
    body.replaceText(`{{MEMBRO}}`, membroValue);
    
    doc.saveAndClose();
    
    const pdfBlob = newDocFile.getAs(MimeType.PDF);
    const pdfFile = pdfFolder.createFile(pdfBlob).setName(newDocName + ".pdf");
    pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    const pdfId = pdfFile.getId();
    newDocFile.setTrashed(true);
    
    return { success: true, pdfUrl: pdfFile.getUrl(), pdfId: pdfId };
  } catch (error) {
    Logger.log('Erro em processForm: ' + error.toString());
    return { success: false, message: error.toString() };
  }
}

function sendPdfByEmail(pdfId, formData, emailTarget) {
  try {
    const pdfFile = DriveApp.getFileById(pdfId);
    const peritoSelecionado = formData.PERITO_SELECAO;
    const peritoEmail = PERITO_EMAILS[peritoSelecionado] || '';
    const peritoFullName = getPeritoFullName(peritoSelecionado);
    const peritoUpper = peritoFullName.toUpperCase();
    const recipient = emailTarget === 'zimbra' ? peritoEmail : 'hnre.jrs@marinha.mil.br';
    
    const subject = `SOL PARECER PSIQ ${formData.GRAU_HIERARQUICO} ${formData.NOME}`;
    const body = `TRM em anexo SOL de parecer psiquiátrico para conclusão de IS ${formData.FINALIDADE_INSP} atinente a ${formData.NIP_MAT} ${formData.GRAU_HIERARQUICO} ${formData.NOME}.
<br><br>
Atenciosamente,
<br><br>
<b>${peritoUpper}</b>
<br>
JRS/HNRe`;

    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: body,
      name: peritoFullName,
      replyTo: peritoEmail,
      attachments: [pdfFile.getAs(MimeType.PDF)]
    });

    return { success: true, message: 'E-mail enviado para ' + recipient };
  } catch (e) {
    Logger.log('Erro em sendPdfByEmail: ' + e.toString());
    return { success: false, message: 'Erro ao enviar e-mail: ' + e.toString() };
  }
}

// ================================================================= //
//                      FUNÇÕES AUXILIARES                           //
// ================================================================= //

function getPeritoFullName(peritoSelection) {
  switch (peritoSelection) {
    case 'CT Mauriston': return 'Mauriston Renan Martins Silva';
    case 'CT Júlio César': return 'Júlio César Xavier Filho';
    case '1T Salyne': return 'Salyne Regina Martins Roberto';
    case '1T Luz': return 'Lucas Luz Nunes';
    case '2T Trindade': return 'Marcelo Fulco Trindade';
    default: return '';
  }
}

function getPeritoPosto(peritoSelection) {
  // ATUALIZAÇÃO DOS VALORES DE 'posto' NESTA FUNÇÃO TAMBÉM
  switch (peritoSelection) {
    case 'CT Mauriston': return 'Capitão-Tenente (Md)';
    case '1T Salyne':
    case '1T Luz': return 'Primeiro-Tenente (Md)';
    case 'CT Júlio César': return 'Capitão-Tenente (RM2-Md)';
    case '2T Trindade': return 'Segundo-Tenente (RM2-Md)';
    default: return '';
  }
}
