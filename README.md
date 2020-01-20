# Extract

1. Selecione o período desejado no site;
2. Execute o jQuery na página:
  - Itaú: `jQuery('#gridLancamentos-pessoa-fisica')`;
  - Nubank: `jQuery('.charges-list')`;
  - Santander: `jQuery('.extrato-table')`;
3. Copie o HTML do elemento selecionado: `Copy > CopyOuterHTML`;
4. Salve o conteúdo em um arquivo na pasta `<site>/_data`;

# Transform

1. Execute na pasta deste projeto o comando `node index.js <site> <nome do arquivo HTML>`. Se houver alguma nova transação, cadastre-a no arquivo `<site>/_config/places.json` e execute novamente;
2. Será criado um arquivo `.csv` cujo nome é a data de hoje. Verifique que o arquivo gerado não está terminado com uma linha em branco;

# Load

1. Copie o arquivo `.csv` resultante para o smartphone;
2. Acesse o aplicativo na aba de importações: `financisto > menu > Import/Export > CSV Import`;
3. Escolha o arquivo `.csv`;
4. Retire do início do path a parte `/file`;
5. Selecione a conta na qual a importação deve ocorrer;
6. Verifique que as configurações de importação do app são:
  - Decimals: `2`;
  - Decimal separator: `'.'`;
  - Group separator: `''`;
  - Field separator: `';'`;
  - Use header from file: `check`;
  - Date format: `dd/MM/yyyy`;
7. Dê OK, e seja feliz!