# Resultado da enquete

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **PUT** na rota **/api/surveys**
2. ✅ Valida se a requisição foi feita por um **usuário**
3. ✅ Valida o parâmetro **survey_id**
4. ✅ Valida se o campo **answer** é uma resposta válida
5. ✅ **Cria** um resultado de enquete com os dados fornecidos caso nao tenha registro
6. ✅ **Atualiza** um resultado de enquete com os dados fornecidos
7. ✅ Retorna **201** com os dados do resultado da enquete caso não tehna registro
8. ✅ Retorna **200** com os dados do resultado da enquete caso já tenha um registro

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **403** se não for um usuário
3. ✅ Retorna erro **403** se o survey_id passado na URL for inválido
4. ✅ Retorna erro **403** se a resposta enviado pelo client form uma resposta inválida
5. ✅ Retorna erro **500** se der erro ao tentar criar o resultado da enquete
6. ✅ Retorna erro **500** se der erro ao tentar atualizar o resultado da enquete

## Legendas

**_ ⛔️ = to do _**
**_ ✅ = done _**
